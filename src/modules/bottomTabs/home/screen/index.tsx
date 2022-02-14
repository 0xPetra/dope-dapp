import React, {useCallback, useRef, useMemo, useEffect} from 'react';
import {View, Alert} from 'react-native';
import {Paragraph, Button} from 'react-native-paper';
import BottomSheet, {
  BottomSheetModal,
  BottomSheetBackdrop,
} from '@gorhom/bottom-sheet';
import {useWalletConnect} from '@walletconnect/react-native-dapp';
import {useRecoilValue} from 'recoil';

// -- Hooks --------------------------------------------------------------- //
import {addressAtom} from '../../../../recoil/walletData';

// -- Constants --------------------------------------------------------------- //
import theme from '../../../../lib/constants/theme';
// TODO: Replace with descentralized whitelist

// Styled-components
// -- Typings --------------------------------------------------------------- //

const HomeScreen = () => {
  // hooks
  const address = useRecoilValue(addressAtom);
  const connector = useWalletConnect();

  // effects
  useEffect(() => {
    // if (!address) {
    //   Alert.alert('Connect wallet!', 'Connect web3 wallet to access.', [
    //     {text: 'ok'},
    //   ]);
    //   return;
    // }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ref
  const bottomSheetRef = useRef<BottomSheet>(null);

  // variables
  const snapPoints = useMemo(() => ['25%', '60%'], []);
  // const snapPoints = useMemo(() => ['60%'], []);

  // callbacks
  const handlePresentModalPress = useCallback(() => {
    bottomSheetRef.current?.present();
  }, []);

  const handleSheetChanges = useCallback((index: number) => {
    if (index === -1) {
      // TODO: Change modal data
    }
  }, []);

  const openSheet = () => {
    handlePresentModalPress();
  };

  const _onSelected = () => {
    openSheet();
  };

  // React.useEffect(() => {
  // void (async () => {
  //   const {address} = await web3.eth.accounts.privateKeyToAccount(
  //     HARDHAT_PRIVATE_KEY,
  //   );
  //   const contract = await shouldDeployContract(
  //     web3,
  //     Hello.abi,
  //     Hello.bytecode,
  //     address,
  //   );
  //   setMessage(await contract.methods.sayHello('React Native').call());
  // })();
  // }, [web3, shouldDeployContract, setMessage, HARDHAT_PRIVATE_KEY]);

  const signTransaction = React.useCallback(async () => {
    if (connector.connected) {
      try {
        await connector.signTransaction({
          data: '0x',
          from: '0xbc28Ea04101F03aA7a94C1379bc3AB32E65e62d3',
          gas: '0x9c40',
          gasPrice: '0x02540be400',
          nonce: '0x0114',
          to: '0x89D24A7b4cCB1b6fAA2625Fe562bDd9A23260359',
          value: '0x00',
        });
      } catch (e) {
        console.error(e);
      }
    } else {
      Alert.alert(
        'No address connected',
        'You need to connect your web3 address on your profile.',
        [{text: 'Ok'}],
      );
    }
  }, [connector]);

  // -- renders --------------------------------------------------------------- //
  // FIXME: See why tapping on backgrop doesn't dismiss modal
  const renderBackdrop = useCallback(
    props => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={1}
        appearsOnIndex={2}
      />
    ),
    [],
  );

  return (
    <View
      style={{
        justifyContent: 'center',
        flex: 1,
        backgroundColor: theme.colors.backgroundColor,
      }}>
      <Button
        mode="outlined"
        onPress={_onSelected}
        style={{alignSelf: 'center', backgroundColor: theme.colors.mediumIri}}>
        Push me!
      </Button>

      <BottomSheetModal
        ref={bottomSheetRef}
        index={1}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
        enablePanDownToClose
        handleStyle={{
          // backgroundColor: theme.colors.bkgHighContrast,
          borderTopEndRadius: 20,
          borderTopStartRadius: 20,
          borderWidth: 1,
        }}
        backdropComponent={renderBackdrop}
        enableTouchThrough={'close'}
        handleIndicatorStyle={{backgroundColor: theme.colors.mediumIri}}
        backgroundStyle={{backgroundColor: theme.colors.backgroundColor}}>
        <View style={{margin: 15}}>
          <Paragraph>Confirm tx</Paragraph>
          <Button
            mode="outlined"
            onPress={signTransaction}
            style={{
              alignSelf: 'center',
              backgroundColor: theme.colors.mediumIri,
            }}>
            Sign message
          </Button>
        </View>
      </BottomSheetModal>
    </View>
  );
};

export default HomeScreen;
