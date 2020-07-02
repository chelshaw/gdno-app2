import React from 'react';
import {
  View,
  StyleSheet,
  Linking,
  Clipboard,
  Alert,
} from 'react-native';
import {
  Body,
  Header,
  Button,
} from '../../shared/components';
import { styles } from '../careGuideConstants';
import { LINKS } from '../../shared/constants';

const ss = StyleSheet.create({
  ...styles
});

const handleHelpError = () => {
  Alert.alert(
    'It\'s not you, it\'s us.',
    `That link didn't work how we thought it would. Just shoot us an email at ${LINKS.helpEmail} and we'll help ya out.`,
    [
      { text: 'Copy email', onPress: () => Clipboard.setString(LINKS.helpEmail) },
    ],
  );
};

const handleHelpPress = () => {
  Linking
    .openURL(LINKS.help)
    .catch(() => {
      handleHelpError();
    });
};

const CareGuideIssues = () => (
  <View style={ss.main}>
    <View style={ss.topSection}>
      <Header>Issues</Header>
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

export default CareGuideIssues;
