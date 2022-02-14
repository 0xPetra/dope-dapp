import {atom} from 'recoil';
import persistAtom from '../lib/helpers/persistAtom';

// Atoms
const generalAccessAtom_key = 'generalAccess';
export const generalAccessAtom = atom({
  key: generalAccessAtom_key,
  default: false,
  effects_UNSTABLE: [persistAtom(generalAccessAtom_key)],
});

const layerAtom_key = 'layerAtom';
export const layerAtom = atom({
  key: layerAtom_key,
  default: [],
  effects_UNSTABLE: [persistAtom(layerAtom_key)],
});

// Selectors
