import {
  StyleSheet, Image, Text, View, Button, SafeAreaView
} from 'react-native';
import React from 'react';
import { DetailHeader, Type } from '../shared/components';
import {PROPSHAPES, space} from '../shared/constants';
import logo from '../shared/assets/icon-transparent.png';
import Onboarding from 'react-native-onboarding-swiper';

const styles = StyleSheet.create({
  logo: {
    width: 100,
    height: 100,
  },

  backgroundImage: {
    resizeMode: 'cover', 
    
  },/*
  logoText: {
    position:"absolute",
    //justifyContent: 'flex-end',
    marginBottom: 36,
    fontSize: 40,
    fontWeight: "bold",
    color: "black",
  }, */
  subtitleText: {
    paddingHorizontal: space[4],
    paddingTop: 300,
    textAlign: 'center',
   // flexDirection: "column-reverse",
    flex: 1,
    //justifyContent: "flex-end",
    fontSize: 18,
    color: "black",
  }, 
})

const CircleDot = ({ selected }) => {
  let backgroundColor;
  backgroundColor = selected ? '#00B9AC' : 'rgba(0, 0, 0, 0.3)';
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

const Skip = ({...props}) => {
  return (
    <Button
      title={'    LOGIN'} 
      color={'rgb(0, 185, 172)'}
      {...props}
    >
    </Button>
  );
};

const Next = ({ ...props }) => (
  <Button
    title={'NEXT     '}
    color={'rgb(0, 185, 172)'}
    {...props}
  />
);

const Onboard = ({ navigation }) => (
    <>
      <Onboarding
        bottomBarColor = {'#fff'}
        bottomBarHeight = {80}
        DotComponent={CircleDot}
        SkipButtonComponent={Skip}
        NextButtonComponent={Next}
       // showDone = {false}
        onSkip={() => 
          navigation.navigate('Welcome')
        }
        onDone={() =>  
          navigation.navigate('Welcome')
        }
        imageContainerStyles={
          { flex: 1,
          }
        }
        pages={[
          {
            backgroundColor: 'white',
            image: <Image style={styles.backgroundImage} source={require('../shared/assets/sampleOnboard.png')}/>,
            title: "",
            subtitle:<Type style={styles.subtitleText}>A new kind of garden club membership for new food growers</Type>,
          },
          {
            backgroundColor: 'white',
            image: <Image style={styles.backgroundImage} source={require('../shared/assets/onboardGradient.png')}/>,
            title: <Text style={styles.logoText}></Text>,
            subtitle:'A new kind of garden club membership for new food growers',
          },
          {
            backgroundColor: 'white',
            image: <Image style={styles.backgroundImage} source={require('../shared/assets/onboardGradient.png')}/>,
            title: <Text style={styles.logoText}>gardenio</Text>,
            subtitle:'A new kind of garden club membership for new food growers',
          },
        ]}
      />
    <SafeAreaView style={{opacity: 0}} />
  </>
);
Onboard.propTypes = {
  navigation: PROPSHAPES.navigation,
};

export default Onboard;