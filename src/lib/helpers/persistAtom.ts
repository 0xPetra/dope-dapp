import {AtomEffect, DefaultValue} from 'recoil';
import AsyncStorage from '@react-native-community/async-storage';

function persistAtom<T>(key: string): AtomEffect<T> {
  return ({setSelf, onSet}) => {
    setSelf(
      AsyncStorage.getItem(key).then(
        savedValue =>
          savedValue != null ? JSON.parse(savedValue) : new DefaultValue(), // Abort initialization if no value was stored
      ),
    );

    // Subscribe to state changes and persist them to localForage
    onSet((newValue, _, isReset) => {
      isReset
        ? AsyncStorage.removeItem(key)
        : AsyncStorage.setItem(key, JSON.stringify(newValue));
    });
  };
}

export default persistAtom;
