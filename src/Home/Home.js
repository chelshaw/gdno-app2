import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Alert,
  Linking,
  Clipboard,
} from 'react-native';
import PropTypes from 'prop-types';

import handleError from '../shared/data/handleError';
import {
  Header, Button, Media, FormLabel, Touchable, Chevron, ButtonText
} from '../shared/components';
import {
  LINKS, verticallyCentered, space, COLORS,
} from '../shared/constants';

const styles = StyleSheet.create({
  container: {
    ...verticallyCentered,
    padding: space[2],
  },
  title: {
    paddingBottom: space[2],
  },
  ctaBox: {
    backgroundColor: COLORS.cyan,
    paddingVertical: space[5],
    paddingHorizontal: space[7],
  },
  resources: {
    marginVertical: space[3],
  },
  buttonSpace: {
    marginVertical: space[0],
  },
  bottomLinks: {
    padding: space[2],
  },

  iconButtonWrapper: {
    backgroundColor: COLORS.grass,
    borderRadius: 2,
    paddingVertical: space[2],
    paddingHorizontal: space[2],
    flexDirection: 'row',
    alignItems: 'center',
  },

  buttonText: {
    paddingRight: space[1],
  },
});

export default class HomeScreen extends Component {
  handleIosMailto = (link) => {
    const cleanedLink = link.replace('mailto:', '');
    Alert.alert(
      'Email us!',
      cleanedLink,
      [
        {
          text: 'Got it',
          onPress: () => {},
          style: 'cancel',
        },
      ],
    );
  }

  handleLinkError = () => {
    Alert.alert(
      'Whoops',
      `That link didn't work how we thought it would. Reach out to ${LINKS.helpEmail} for help.`,
      [
        { text: 'Copy email', onPress: () => Clipboard.setString(LINKS.helpEmail) },
      ]
    );
  }

  handleOpenLink = (path) => {
    const url = LINKS[path] || LINKS.shop;
    Linking
      .openURL(url)
      .catch((e) => {
        handleError(e);
        this.handleLinkError(url);
      });
  }

  render() {
    return (
      <Media style={styles.container}>
        <Media.Item>
          <View style={styles.ctaBox}>
            <View style={styles.title}>
              <Header color="white" align="center" style={styles.title}>
                Let&apos;s Grow
              </Header>
            </View>
            <Button color="cyan" inverted onPress="CareGuides">Add Care Guides</Button>
          </View>
        </Media.Item>
        <Media.Body style={styles.resources}>
          <FormLabel>Resources</FormLabel>
          <View style={styles.buttonSpace}>
            <Touchable onPress="GettingStarted">
              <View style={styles.iconButtonWrapper}>
                <ButtonText align="left" style={styles.buttonText}>Get Started</ButtonText>
                <Chevron color="white" height={12} />
              </View>
            </Touchable>
          </View>
          <View style={styles.buttonSpace}>
            <Touchable onPress={() => this.handleOpenLink('shop')}>
              <View style={styles.iconButtonWrapper}>
                <ButtonText align="left" style={styles.buttonText}>Shop Plants</ButtonText>
                <Chevron color="white" height={12} />
              </View>
            </Touchable>
          </View>
          <View style={styles.buttonSpace}>
            <Touchable onPress={() => this.handleOpenLink('help')}>
              <View style={styles.iconButtonWrapper}>
                <ButtonText align="left" style={styles.buttonText}>Get Help</ButtonText>
                <Chevron color="white" height={12} />
              </View>
            </Touchable>
          </View>
        </Media.Body>
        <Media.Item style={styles.bottomLinks}>
          <Button align="left" style={{ paddingVertical: space[1] }} transparent color="grass" onPress={() => this.handleOpenLink('instagram')}>Follow us on social</Button>
          <Button align="left" style={{ paddingVertical: space[1] }} transparent color="grass" onPress={() => this.handleOpenLink('feedback')}>Feedback</Button>
        </Media.Item>
      </Media>
    );
  }
}

HomeScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};
