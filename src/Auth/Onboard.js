import React from 'react';
import {
  StyleSheet, Image, Text, View, Button
} from 'react-native';
import Onboarding from 'react-native-onboarding-swiper';
import logo from '../shared/assets/icon-transparent.png';
import {PROPSHAPES} from '../shared/constants';
import {
  Body, Header, Media, Touchable, StyledInput
} from '../shared/components';

const styles = StyleSheet.create({
  logo: {
    width: 100,
    height: 100,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover', // or 'stretch'
  },
  logoTitle: {
    fontSize: 40
  },
})

const CircleDot = ({ isLight, selected }) => {
  let backgroundColor;
  if (isLight) {
    backgroundColor = selected ? '#00B9AC' : 'rgba(0, 0, 0, 0.4)';
  } else {
    backgroundColor = selected ? '#00B9AC' : 'rgba(0, 0, 0, 0.4)';
  }
  return (
    <View
      style={{
        width: 10,
        height: 10,
        marginHorizontal: 3,
        borderRadius: 150 / 2,
        backgroundColor,
      }}
    />
  );
};

const Skip = ({skipLabel, ...props }) => (
  <Button
    title={'LOGIN'}
    containerViewStyle={{
      marginVertical: 30,
    }}
    color={'rgb(0, 185, 172)'}
    {...props}
  >
    {skipLabel}
  </Button>
);

const Next = ({ ...props }) => (
  <Button
    title={'NEXT'}
    containerViewStyle={{
      marginVertical: 40,
    }}
    color={'rgb(0, 185, 172)'}
    {...props}
  />
);

const Onboard = ({ navigation }) => (
   <Onboarding
      DotComponent={CircleDot}
      bottomBarColor = {'#fff'}
      bottomBarHeight = {80}
      controlStatusBar = {false}
      SkipButtonComponent={Skip}
      NextButtonComponent={Next}
      containerStyles={
        {
          flex: 1,
          flexDirection: "column"
        }
      }
      imageContainerStyles={
        { flex: 1,
          justifyContent: "center"
        }
      }

      onDone={() => 
        navigation.navigate('Welcome')
      }
      pages={[
        {
          backgroundColor: '#fff',
          image: <Image source={require('../shared/assets/onboard0.png')} style={styles.backgroundImage} />,
          title:<Text style={styles.logoTitle}>gardenio</Text>,
          subtitle:'A new kind of garden club membership for new food growers',
        },
        {
          backgroundColor: '#fff',
          image: <Image source={require('../shared/assets/onboard1.png')} style={styles.backgroundImage} />,
          title: 'Onboarding',
          subtitle: '',
        },
        {
          backgroundColor: '#fff',
          image: <Image source={require('../shared/assets/onboard2.png')} style={styles.backgroundImage}/>,
          title: 'Onboarding',
          subtitle: '',
        },
        {
          backgroundColor: '#999',
          image: <Image source={require('../shared/assets/onboard3.png')} style={styles.backgroundImage}/>,
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
