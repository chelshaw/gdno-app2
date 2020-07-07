import React from 'react';
import {
  View,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import {
  Body,
  Header,
  SectionTitle,
  Markdown,
} from '../../shared/components';
import { styles } from '../careGuideConstants';
import { PROPSHAPES } from '../../shared/constants';

const ss = StyleSheet.create({
  ...styles,
});

const Enjoy = ({
  info
}) => {
  if (!info) return <ActivityIndicator size="large" />;

  return (
    <View style={ss.main}>
      <View style={ss.topSection}>
        <Header>Enjoy</Header>
        <Body>
        It is time. Congratulations. You and all the living things around you
         have enabled this plant to flourish, and now it&apos;s time for harvest.
          Oh the possibilities! Here&apos;s what to do now.
        </Body>
      </View>

      <View style={ss.section}>
        <View style={ss.titleSpacing}>
          <SectionTitle uppercase color="medGray">Harvest It</SectionTitle>
        </View>

        <Markdown>{info.howToHarvest || 'Info coming soon!'}</Markdown>
      </View>

      <View style={ss.section}>
        <View style={ss.titleSpacing}>
          <SectionTitle uppercase color="medGray">Store It</SectionTitle>
        </View>

        <Markdown>{info.howToStore || 'Info coming soon!'}</Markdown>
      </View>
    </View>
  );
};

Enjoy.propTypes = {
  info: PROPSHAPES.plant.isRequired,
};

export default Enjoy;
