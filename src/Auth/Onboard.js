import React from 'react';
import {
  StyleSheet,
  Image
} from 'react-native';
import Onboarding from 'react-native-onboarding-swiper';
import logo from '../shared/assets/icon-transparent.png';
import {
  PROPSHAPES
} from '../shared/constants';

const styles = StyleSheet.create({
  logo: {
    width: 100,
    height: 100,
  },
})

const Onboard = ({ navigation }) => (
      <Onboarding
      onDone={() => 
        navigation.navigate('Welcome')
      }
      pages={[
        {
          backgroundColor: '#fff',
          image: <Image source={logo} style={styles.logo}/>,
          title: 'A new kind of garden club',
          subtitle: '',
        },
        {
          backgroundColor: '#fff',
          image: <Image source={require('../shared/assets/onboard1.png')} />,
          title: 'Onboarding',
          subtitle: '',
        },
        {
          backgroundColor: '#fff',
          image: <Image source={require('../shared/assets/onboard2.png')} />,
          title: 'Onboarding',
          subtitle: '',
        },
        {
          backgroundColor: '#999',
          image: <Image source={require('../shared/assets/onboard3.png')} />,
          title: 'Onboarding',
          subtitle: '',
        },
      ]}
    />
);
Onboard.propTypes = {
  navigation: PROPSHAPES.navigation,
};

export default Onboard;
