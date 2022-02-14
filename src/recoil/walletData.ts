import {atom, selector} from 'recoil';
// FIXME: See if we can import something specific and shake the shims library down
import '@ethersproject/shims';
import {getDefaultProvider} from '@ethersproject/providers';

import persistAtom from '../lib/helpers/persistAtom';

// Atoms
// export const accountsAtom = atom({
//   key: 'accountsAtom',
//   default: [],
// });

// export const chainIdAtom = atom({
//   key: 'chainIdAtom',
//   default: 1,
// });

const addressAtom_key = 'addressAtom';
export const addressAtom = atom({
  key: addressAtom_key,
  default: '',
  effects_UNSTABLE: [persistAtom(addressAtom_key)],
});

// export const providerAtom = atom({
//   key: 'providerAtom',
//   default: null,
//   dangerouslyAllowMutability: true,
//   // effects_UNSTABLE: [persistAtom],
// });

// export const injectedProviderAtom = atom({
//   key: 'injectedProviderAtom',
//   default: undefined,
//   dangerouslyAllowMutability: true,
//   // effects_UNSTABLE: [persistAtom],
// });

// Selectors
export const ensAddrSelector = selector({
  key: 'ensAddr', // unique ID (with respect to other atoms/selectors)
  get: async ({get}) => {
    let provider = getDefaultProvider();
    const address = get(addressAtom);
    if (address) {
      const ens = await provider.lookupAddress(address);
      return ens;
    }
    return null;
  },
});
