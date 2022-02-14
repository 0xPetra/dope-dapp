import axios from 'axios';
import cleanDeep from 'clean-deep';
import {OPENSEA_API_KEY} from '@env';

// Libs
const limit = 10;
const baseURL = 'https://api.opensea.io/api/v1/assets?';

interface NFTData {
  queryKey: string;
  address?: string | null;
  collection?: string | null;
  contract?: string | null;
  tokenId?: string | null;
}

const getNfts = async ({
  address = null,
  collection = null,
  contract = null,
  tokenId = null,
}: NFTData) => {
  console.log(
    cleanDeep({
      limit,
      offset: 0,
      owner: address,
      asset_contract_address: contract,
      collection,
      token_ids: tokenId,
    }),
  );
  const {data} = await axios({
    method: 'get',
    url: baseURL,
    withCredentials: true,
    headers: {
      'X-API-KEY': OPENSEA_API_KEY,
    },
    // responseType: 'stream'
    params: cleanDeep({
      limit,
      offset: 0,
      // owner: '0x9FC3B33884e1D056a8CA979833d686abD267f9f8',
      owner: address,
      asset_contract_address: contract,
      collection,
      token_ids: tokenId,
    }),
  });
  console.log('🚀 ~ =======>>', data);
  return data;
};

export default getNfts;
