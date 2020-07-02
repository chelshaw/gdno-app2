import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import {
  Body,
  Header,
  SectionTitle,
  Touchable,
  Paper,
  Markdown,
  StandardModal,
} from '../../shared/components';

import {
  PROPSHAPES, space, verticallyCentered, padded
} from '../../shared/constants';
import { styles, allFeatures } from '../careGuideConstants';

const ss = StyleSheet.create({
  ...styles,
  verticallyCentered,
  padded,
});

const Grow = ({ info }) => {
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [modalContent, setModalContent] = useState({});

  const getModalContent = (feature) => {
    const { text, detailKey } = allFeatures[feature][info[feature]];
    const content = (detailKey && info[detailKey]) || 'More coming soon.';
    // TODO: handle mulch info
    return {
      title: text,
      category: `${info.name} • ${feature}`,
      content,
    };
  };

  const handleDetailClick = (feature) => {
    const content = getModalContent(feature);
    setModalContent(content);
    setDetailsOpen(true);
  };

  if (!info) {
    return (
      <View style={ss.verticallyCentered}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={ss.main}>
      {info.overview
        && (
        <View style={ss.topSection}>
          <Header>Grow</Header>
          <Body>
            Whether you already have a green thumb or this is your first growing
             endeavor, we&apos;re here to guide you!
          </Body>
        </View>
        )
      }
      <View style={ss.section}>
        <View style={ss.titleSpacing}>
          <SectionTitle uppercase color="medGray">Get Started</SectionTitle>
        </View>

        <Paper>
          <Touchable
            onPress="GettingStarted"
            accessibilityLabel="Read our getting started guide"
          >
            <View style={{ paddingVertical: space[3] }}>
              <SectionTitle align="center" color="grass" weight="bold">Read our getting started guide.</SectionTitle>
            </View>
          </Touchable>
        </Paper>
      </View>
      <View style={ss.section}>
        <View style={ss.titleSpacing}>
          <SectionTitle uppercase color="medGray">Standards</SectionTitle>
        </View>

        <View style={ss.titleSpacing}>
          <Touchable onPress={() => handleDetailClick('thirstiness')}>
            <Paper style={{ paddingVertical: space[3] }}>
              <SectionTitle uppercase align="center" color="medGray" weight="light">Watering</SectionTitle>
            </Paper>
          </Touchable>
        </View>

        <View style={ss.titleSpacing}>
          <Touchable onPress={() => handleDetailClick('soil')}>
            <Paper style={{ paddingVertical: space[3] }}>
              <SectionTitle uppercase align="center" color="medGray" weight="light">Feeding my plant</SectionTitle>
            </Paper>
          </Touchable>
        </View>
        <View style={ss.titleSpacing}>
          <Touchable onPress={() => handleDetailClick('sun')}>
            <Paper style={{ paddingVertical: space[3] }}>
              <SectionTitle uppercase align="center" color="medGray" weight="light">Sun requirements</SectionTitle>
            </Paper>
          </Touchable>
        </View>
      </View>
      <StandardModal
        visible={detailsOpen}
        onClose={() => setDetailsOpen(false)}
        title={modalContent.category}
      >
        <View style={ss.padded}>
          <Header>{modalContent.title}</Header>
          <Markdown>{modalContent.content}</Markdown>
        </View>
      </StandardModal>
    </View>
  );
};

Grow.propTypes = {
  info: PROPSHAPES.plant.isRequired,
};

export default Grow;
