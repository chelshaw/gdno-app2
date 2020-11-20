import React from 'react';
import {
  View,
  StyleSheet,
  Image,
  Linking,
} from 'react-native';
import PropTypes from 'prop-types';

import { COLORS, space, LINKS } from '../constants';
import handleError from '../data/handleError';
import gdnoIcon from '../assets/nav_home_active.png';
import gdnoInactive from '../assets/nav_home_inactive.png';
import Touchable from './Touchable';
import ShoppingCart from './ShoppingCart';

const ss = StyleSheet.create({
  wrapper: {
    backgroundColor: COLORS.white,
    borderTopColor: COLORS.lightGray,
    display: 'flex',
    alignItems: 'stretch',
    justifyContent: 'space-around',
    flexDirection: 'row',
    borderTopWidth: 3,
  },
  button: {
    flex: 1,
    borderBottomWidth: 3,
    borderBottomColor: 'transparent',
  },
  activeButton: {
    borderBottomColor: COLORS.grass,
  },
  buttonImage: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: space[2],
  },
  image: {
    width: 30,
    height: 30,
  },
});

const BottomNav = ({
  style = {}, current, ...props
}) => {
  const logo = current === 'home' ? gdnoIcon : gdnoInactive;
  const openShop = () => {
    Linking
      .openURL(LINKS.shop)
      .catch((e) => {
        handleError(e);
      });
  };

  return (
    <View style={[ss.wrapper, style]} {...props}>
      <Touchable onPress="Home" style={[ss.button, current === 'home' && ss.activeButton]}>
        <View style={ss.buttonImage}>
          <Image
            source={logo}
            style={ss.image}
          />
        </View>
      </Touchable>
      <Touchable onPress={openShop} style={ss.button}>
        <View style={ss.buttonImage}>
          <ShoppingCart height={30} />
        </View>
      </Touchable>
    </View>
  );
};

BottomNav.propTypes = {
  style: PropTypes.object,
  current: PropTypes.string,
};

export default BottomNav;
