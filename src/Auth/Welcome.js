import React from 'react';
import {
  StyleSheet,
  View,
  Image,
  SafeAreaView,
} from 'react-native';
import {
  Media, FormInput, Button, Touchable, ButtonText,
} from '../shared/components';
import logo from '../shared/assets/icon-transparent.png';
import bg from '../shared/assets/splash.png';


import {
  centered, space, safeArea, hitSlop
} from '../shared/constants';

const styles = StyleSheet.create({
  safeArea,
  LogInWrapper: {
    flex: 1,
    backgroundColor: '#fff',
  },
  bgWrapper: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
  bgImage: {
    flex: 1,
    resizeMode: 'cover',
    opacity: 0.1,
  },
  logInButton: {
    paddingVertical: space[1],
    paddingHorizontal: space[2],
  },
  contentWrapper: {
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'center',
  },
  logoWrapper: {
    ...centered,
    padding: space[2],
  },
  logo: {
    width: 100,
    height: 100,
    marginVertical: space[2],
  },
  title: {
    maxWidth: 200,
  },
  buttonBlock: {
    padding: space[2],
  }
});

const Welcome = () => (
  <View
    style={styles.LogInWrapper}
  >
    <View
      style={styles.bgWrapper}
    >
      <Image
        style={styles.bgImage}
        source={bg}
      />
    </View>
    <SafeAreaView
      style={styles.safeArea}
    >
      <Media>
        <Media.Item>
          <Touchable onPress="LogIn">
            <View style={styles.logInButton} hitSlop={hitSlop}>
              <ButtonText color="green" weight="bold" align="right">Log In</ButtonText>
            </View>
          </Touchable>
        </Media.Item>
        <Media.Body style={styles.logoWrapper}>
          <Image
            source={logo}
            style={styles.logo}
          />
          <View style={styles.title}>
            <FormInput align="center">You don&apos;t gotta grow it alone</FormInput>
          </View>
        </Media.Body>
        <Media.Item style={styles.buttonBlock}>
          <Button onPress="SignUp" color="grass">Create Account</Button>
        </Media.Item>
      </Media>
    </SafeAreaView>
  </View>
);

export default Welcome;
