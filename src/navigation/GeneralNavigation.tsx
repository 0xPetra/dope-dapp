import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useRecoilValue} from 'recoil';

// -- Hooks --------------------------------------------------------------- //
import {SCREENS} from '../lib/constants/globals';
import {addressAtom} from '../recoil/walletData';

// General Screens
import TabsNavigation from './TabsNavigation';

// -- Constants --------------------------------------------------------------- //
import theme from '../lib/constants/theme';

// -- Typings --------------------------------------------------------------- //
import {Routes} from './typings';

// -- General --------------------------------------------------------------- //
const generalScreens: Routes = [
  {
    component: TabsNavigation,
    options: {headerShown: false},
    path: SCREENS.TABS.TABS,
  },
];

// -- INTRO --------------------------------------------------------------- //
// TODO: If you want to create a login screen, you should modify the line below.
const introScreens: Routes = [...generalScreens];

// Logged Screens
const loggedInScreens: Routes = [...generalScreens];

const Stack = createStackNavigator();

const GeneralNavigation = () => {
  // -- Hooks --------------------------------------------------------------- //
  const address = useRecoilValue(addressAtom);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: theme.colors.backgroundColor,
        justifyContent: 'space-between',
      }}>
      <Stack.Navigator initialRouteName={SCREENS.INTRO}>
        {address
          ? loggedInScreens.map(({component, path, options}) => {
              return (
                <Stack.Screen
                  key={path}
                  name={path}
                  component={component}
                  options={options}
                />
              );
            })
          : introScreens.map(({component, path, options}) => {
              return (
                <Stack.Screen
                  key={path}
                  name={path}
                  component={component}
                  options={options}
                />
              );
            })}
      </Stack.Navigator>
    </SafeAreaView>
  );
};

export default GeneralNavigation;
