import React from 'react';
import { View } from 'react-native';
import { withNavigation } from 'react-navigation';

import Touchable from './Touchable';
import { Body } from './Type';
import { useAuth } from '../use-auth';
import { PROPSHAPES } from '../constants';

const LogOutButton = ({ navigation }) => {
  const auth = useAuth();
  const handleLogout = () => {
    auth.signout();
    navigation.navigate('Welcome');
  };

  return (
    <Touchable onPress={handleLogout}>
      <View style={{ padding: 10, backgroundColor: '#ffffff' }}>
        <Body weight="bold" color="grass">Log Out</Body>
      </View>
    </Touchable>
  );
};

LogOutButton.propTypes = {
  navigation: PROPSHAPES.navigation.isRequired,
};

export default withNavigation(LogOutButton);
