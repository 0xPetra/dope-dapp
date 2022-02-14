import React, {useState} from 'react';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import Icons from 'react-native-vector-icons/Feather';

// -- Hooks --------------------------------------------------------------- //
// import {useUserContext} from '../hooks/useGeneralContext';

// -- Utils --------------------------------------------------------------- //
// TODO: Add hatics
// import {haptics} from '../utils';

// -- Constants --------------------------------------------------------------- //
import theme from '../lib/constants/theme';
import {SCREENS} from '../lib/constants/globals';

// -- Screens --------------------------------------------------------------- //
import HomeTab from '../modules/bottomTabs/home/screen';
import ProfileTab from '../modules/bottomTabs/profile/screen';

// -- Typings --------------------------------------------------------------- //
import {Routes} from './typings';

const initialRouteName = SCREENS.TABS.HOME;
const Tab = createMaterialBottomTabNavigator();
const generalRoutes: Routes = [
  {
    component: HomeTab,
    path: SCREENS.TABS.HOME,
    name: initialRouteName,
    icon: 'home',
  },
  {
    component: ProfileTab,
    path: SCREENS.TABS.PROFILE,
    name: 'Profile',
    icon: 'user',
  },
];

const TabsNavigation = () => {
  const [currentTab, setTab] = useState(initialRouteName);

  return (
    <Tab.Navigator
      initialRouteName={initialRouteName}
      activeColor={theme.colors.mediumIri}
      inactiveColor={theme.colors.primary}
      shifting={true}
      barStyle={
        currentTab === SCREENS.TABS.HOME
          ? {
              position: 'absolute',
              backgroundColor: 'transparent',
            }
          : {
              position: 'relative',
              backgroundColor: theme.colors.backgroundColor,
            }
      }>
      {generalRoutes.map(({component, path, icon, name}) => {
        const isSelected = currentTab === path;
        return (
          <Tab.Screen
            key={path}
            name={name}
            component={component}
            options={{
              tabBarLabel: '',
              tabBarIcon: ({color}) => (
                <Icons
                  name={icon}
                  color={color}
                  size={isSelected ? 30 : 20}
                  style={{width: 30, height: 30, alignSelf: 'center'}}
                />
              ),
            }}
            listeners={{
              tabPress: () => {
                // Prevent default action
                // haptics.selection();
                setTab(path);
              },
            }}
          />
        );
      })}
    </Tab.Navigator>
  );
};

export default TabsNavigation;
