import React from 'react';
import {
  View, StyleSheet, Linking, Clipboard, Alert
} from 'react-native';

import { Header, Body, Button } from '../shared/components';
import { COLORS, LINKS, space } from '../shared/constants';

const ss = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: COLORS.offWhite,
  },
  section: {
    paddingHorizontal: space[2],
    paddingVertical: space[2],
  },
  topSection: {
    paddingHorizontal: space[2],
    paddingVertical: space[4],
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGray,
  },
});

const handleHelpError = () => {
  Alert.alert(
    'It\'s not you, it\'s us.',
    `That link didn't work how we thought it would. Just shoot us an email at ${LINKS.helpEmail} and we'll help ya out.`,
    [
      { text: 'Copy email', onPress: () => Clipboard.setString(LINKS.helpEmail) },
    ]
  );
};

const handleHelpPress = () => {
  Linking
    .openURL(LINKS.help)
    .catch(() => {
      handleHelpError();
    });
};

const HelpScreen = () => (
  <View style={ss.main}>
    <View style={ss.topSection}>
      <Header>Help!</Header>
      <Body>
        If you&apos;re having plant problems I feel bad for you son... but we may know how
         to help! Go ahead and drop us a line -- this is a no judgement grow zone.
      </Body>
    </View>

    <View style={ss.section}>
      <Button onPress={handleHelpPress}>Help me</Button>
    </View>
  </View>
);

export default HelpScreen;
