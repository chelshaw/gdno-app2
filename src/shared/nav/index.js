import React from 'react';
import { createStackNavigator } from 'react-navigation';
import { View, Image } from 'react-native';

import logo from '../assets/icon-transparent.png';
import PersonIcon from '../components/PersonIcon';
import PersonalHome from '../../Home/PersonalHome';
import AddCareGuides from '../../CareGuides/AddCareGuides';
import CareGuide from '../../CareGuides/CareGuide';
import Settings from '../../Auth/Settings';
import EditSettings from '../../Auth/EditSettings';
import Help from '../../Help/Help';
import GettingStarted from '../../GettingStarted/GettingStarted';
import { Touchable } from '../components';
import { centeredHeader, hitSlop } from '../constants';

const MainNavigation = createStackNavigator(
  {
    Home: {
      screen: PersonalHome,
      navigationOptions: () => ({
        headerTitle: (
          <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center' }}>
            <Image
              source={logo}
              style={{ width: 24, height: 24 }}
            />
          </View>
        ),
        ...centeredHeader,
        headerLeft: (<View />),
        headerRight: (
          <Touchable onPress="Settings" hitSlop={hitSlop}>
            <View style={{ paddingHorizontal: 16, backgroundColor: '#ffffff' }}>
              <PersonIcon height={20} color="medGray" />
            </View>
          </Touchable>
        ),
      }),
    },
    AddCareGuides: {
      screen: AddCareGuides,
      navigationOptions: () => ({
        headerTitle: 'Add Care Guides',
        ...centeredHeader,
      }),
    },
    CareGuide,
    Help,
    Settings: {
      screen: Settings,
      path: 'settings',
      navigationOptions: () => ({
        headerTitle: 'Profile',
        ...centeredHeader,
      }),
    },
    EditSettings: {
      screen: EditSettings,
      navigationOptions: () => ({
        headerTitle: 'Edit Profile',
        ...centeredHeader,
      }),
    },
    GettingStarted: {
      screen: GettingStarted,
      navigationOptions: () => ({
        headerTitle: 'Get Started',
        ...centeredHeader,
      }),
    },
  },
  {
    initialRouteName: 'Home'
  }
);

export default MainNavigation;
