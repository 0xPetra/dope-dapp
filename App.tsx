import React from 'react';
import {StatusBar, View, Image} from 'react-native';
import {ApolloClient, InMemoryCache, ApolloProvider} from '@apollo/client';
import {ActionSheetProvider} from '@expo/react-native-action-sheet';
import {NavigationContainer} from '@react-navigation/native';
import {
  Provider as PaperProvider,
  ActivityIndicator,
  TextInput,
  Button,
} from 'react-native-paper';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import WalletConnectProvider from '@walletconnect/react-native-dapp';
import {ThemeProvider} from 'styled-components/native';
import AsyncStorage from '@react-native-community/async-storage';
// import DeviceInfo from 'react-native-device-info';
// import {getUniqueId, getManufacturer} from 'react-native-device-info';
import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import {RecoilRoot, useRecoilState} from 'recoil';

// or ES6+ destructured imports

// -- Constants --------------------------------------------------------------- //
import palette from './src/lib/constants/palette';
import theme, {paperTheme, isDarkTheme} from './src/lib/constants/theme';
import {generalAccessAtom} from './src/recoil/appData';

// -- Navigation --------------------------------------------------------------- //
import GeneralNavigation from './src/navigation/GeneralNavigation';

// Initialize Apollo Client
const client = new ApolloClient({
  uri: 'localhost:4000/graphql',
  cache: new InMemoryCache(),
});

export default function App() {
  return (
    <React.Suspense
      fallback={
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator color={theme.colors.text} />
        </View>
      }>
      <RecoilRoot>
        <ApolloProvider client={client}>
          <WalletConnectProvider
            bridge="https://bridge.walletconnect.org"
            clientMeta={{
              description: 'Connect with Dope Dapp',
              url: 'https://dopedapp.xyz',
              icons: [
                'https://instagram.frcu1-1.fna.fbcdn.net/v/t51.2885-19/s320x320/89118590_590462148350883_8994632463900737536_n.jpg?_nc_ht=instagram.frcu1-1.fna.fbcdn.net&_nc_cat=103&_nc_ohc=nBvOuq_YZnUAX_x7sSd&edm=ABfd0MgBAAAA&ccb=7-4&oh=0164381661686067906e8ec7c1ecd35b&oe=619AAB5D&_nc_sid=7bff83',
              ],
              name: 'Dope Dapp',
            }}
            // redirectUrl={
            //   Platform.OS === 'web' ? window.location.origin : 'yourappscheme://'
            // }
            storageOptions={{
              asyncStorage: AsyncStorage,
            }}>
            <ActionSheetProvider>
              <SafeAreaProvider>
                <ThemeProvider theme={{...theme, ...palette}}>
                  <PaperProvider
                    // settings={{icon: (props) => <BreadIcon {...props} />}}
                    theme={paperTheme}>
                    <BottomSheetModalProvider>
                      <ValidationView />
                    </BottomSheetModalProvider>
                  </PaperProvider>
                </ThemeProvider>
              </SafeAreaProvider>
            </ActionSheetProvider>
          </WalletConnectProvider>
        </ApolloProvider>
      </RecoilRoot>
    </React.Suspense>
  );
}

const ValidationView = () => {
  const [code, setCode] = React.useState('');
  const [hasAccess, setHasAccess] = useRecoilState(generalAccessAtom);

  const submitCode = () => {
    if (code === 'eth77') {
      setHasAccess(true);
    }
  };

  return hasAccess ? (
    <NavigationContainer>
      <StatusBar
        barStyle={isDarkTheme ? 'light-content' : 'dark-content'}
        backgroundColor={theme.colors.backgroundColor}
      />
      <GeneralNavigation />
    </NavigationContainer>
  ) : (
    <View
      style={{
        justifyContent: 'center',
        backgroundColor: theme.colors.backgroundColor,
        flex: 1,
      }}>
      <Image
        source={require('./src/assets/images/logo.png')}
        style={{alignSelf: 'center'}}
      />
      <TextInput
        // label="Enter whitelist code"
        placeholder="0000"
        onChangeText={text => setCode(text)}
        value={code}
        secureTextEntry
        style={{backgroundColor: theme.colors.backgroundContrast, margin: 20}}
        dense
        mode="outlined"
        theme={{
          colors: {
            placeholder: theme.colors.text,
          },
        }}
      />
      <Button
        mode="outlined"
        onPress={submitCode}
        style={{alignSelf: 'center', backgroundColor: theme.colors.mediumIri}}>
        Submit
      </Button>
    </View>
  );
};
