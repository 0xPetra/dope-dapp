/* dapp-begin */
import {AppRegistry, Platform, LogBox} from 'react-native';
import {name as appName} from './app.json';
// import AsyncStorage from '@react-native-community/async-storage';
// import {withWalletConnect} from '@walletconnect/react-native-dapp';

import App from './App';

if (Platform.OS !== 'web') {
  require('react-native-get-random-values');
  LogBox.ignoreLogs([
    "Warning: The provided value 'ms-stream' is not a valid 'responseType'.",
    "Warning: The provided value 'moz-chunked-arraybuffer' is not a valid 'responseType'.",
  ]);
}

if (typeof Buffer === 'undefined') {
  global.Buffer = require('buffer').Buffer;
}

global.btoa = global.btoa || require('base-64').encode;
global.atob = global.atob || require('base-64').decode;

process.version = 'v9.40';

AppRegistry.registerComponent(appName, () => App);

// Trying to apply HOC for wallet connect
// AppRegistry.registerComponent(
//   appName,
//   withWalletConnect(App, {
//     redirectUrl:
//       Platform.OS === 'web' ? window.location.origin : `${appName}://`,
//     storageOptions: {
//       asyncStorage: AsyncStorage,
//     },
//   }),
// );

// If we decide to work with web
// if (Platform.OS === 'web') {
//   const rootTag =
//     document.getElementById('root') ?? document.getElementById('main');
//   AppRegistry.runApplication(appName, {rootTag});
// }

/* dapp-end */
