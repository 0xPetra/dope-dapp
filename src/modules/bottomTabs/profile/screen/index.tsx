import React, {useState} from 'react';
import {Text, View} from 'react-native';
import {Appbar, Button, Paragraph} from 'react-native-paper';
import {useWalletConnect} from '@walletconnect/react-native-dapp';
import {useRecoilValue, useRecoilState} from 'recoil';

import {HARDHAT_PORT, HARDHAT_PRIVATE_KEY} from '@env';
// import Hello from '../artifacts/contracts/Hello.sol/Hello.json';

// -- Hooks --------------------------------------------------------------- //
import {addressAtom, ensAddrSelector} from '../../../../recoil/walletData';

// Styled-components

// -- Constants --------------------------------------------------------------- //
import theme from '../../../../lib/constants/theme';

// -- Typings --------------------------------------------------------------- //

const ProfileScreen = () => {
  // -- Hooks --------------------------------------------------------------- //
  //   const {setUserInfo, setProfileInfo} = useUserContext();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState<string>(null);

  // Custom hooks
  const [address, setAddress]: any = useRecoilState(addressAtom);
  const ensAddr = useRecoilValue(ensAddrSelector);
  const connector = useWalletConnect();
  const connectAddress = connector?.accounts[0];

  // const shouldDeployContract = async (web3, abi, data, from: string) => {
  //   const deployment = new web3.eth.Contract(abi).deploy({data});
  //   const gas = await deployment.estimateGas();
  //   const {
  //     options: {address: contractAddress},
  //   } = await deployment.send({from, gas});
  //   return new web3.eth.Contract(abi, contractAddress);
  // };

  // const web3 = React.useMemo(
  //   () =>
  //     new Web3(
  //       new Web3.providers.HttpProvider(`http://${localhost}:${HARDHAT_PORT}`),
  //     ),
  //   [],
  // );

  React.useEffect(() => {
    try {
      if (connector.connected) {
        setAddress(connectAddress);
        setIsLoading(true);
      }
    } catch (error) {
      console.error(error);
      setIsLoading(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [connector.connected]);

  const connectWallet = React.useCallback(async () => {
    try {
      setIsLoading(true);
      // we can add {chainId: 1}
      const connected = await connector.connect();
      setError(null);
      return connected;
    } catch (e) {
      if (e.message === 'User close QRCode Modal') {
        // TODO: Set error message
        setIsLoading(false);
        setError(e.message);
        return;
      }
      console.error(e);
    }
  }, [connector]);

  const killSession = React.useCallback(() => {
    return connector.killSession();
  }, [connector]);

  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 4)}...${addr.slice(-4)}`;
  };

  // -- renders --------------------------------------------------------------- //
  return (
    <>
      <Appbar.Header style={{backgroundColor: theme.colors.backgroundColor}}>
        {/* <Appbar.BackAction onPress={_goBack} /> */}
        <Appbar.Content title="Profile Screen" />
      </Appbar.Header>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          flex: 1,
          backgroundColor: theme.colors.backgroundColor,
        }}>
        <Paragraph testID="tid-message">{message}</Paragraph>
        {/* TODO: Add currently connected chain */}
        {connector.connected ? (
          <>
            {/* TODO: Add blockie here */}
            <Paragraph>{ensAddr ? ensAddr : formatAddress(address)}</Paragraph>
          </>
        ) : (
          <Button onPress={connectWallet} mode="outlined" loading={isLoading}>
            Connect{isLoading && 'ing'} Wallet
          </Button>
        )}
        {connector.connected && (
          <>
            {/* <Button onPress={signTransaction} mode="outlined">
              Sign a Transaction
            </Button> */}
            <Button onPress={killSession} mode="outlined">
              Disconnect
            </Button>
          </>
        )}
        {error && (
          <Text style={{color: 'red'}} testID="tid-message">
            {error}
          </Text>
        )}
      </View>
    </>
  );
};

export default ProfileScreen;
