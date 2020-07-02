import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';

import {
  Header,
  SectionTitle,
  DetailHeader,
  Touchable,
  Markdown,
  StandardModal,
} from '../../shared/components';
import {
  COLORS, PROPSHAPES, space, padded
} from '../../shared/constants';
import FeatureBox from '../components/FeatureBox';
import { styles, allFeatures } from '../careGuideConstants';

const ss = StyleSheet.create({
  ...styles,
  padded,
  featuresContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
  },
  timeToHarvest: {
    paddingVertical: space[3],
    borderWidth: 1,
    borderColor: COLORS.lightGray,
  }
});

class Essentials extends Component {
  state = {
    isFeatureDetailsModalOpen: false,
    featureDetails: {
      content: '',
      title: '',
      category: '',
    }
  }

  onClickFeature = (category) => {
    const { info } = this.props;
    const { text, detailKey, content } = allFeatures[category][info[category]];
    const modalContent = detailKey && info[detailKey] ? info[detailKey] : content;

    this.setState({
      isFeatureDetailsModalOpen: true,
      featureDetails: {
        title: text,
        category: `${info.name} • ${category}`,
        content: modalContent || 'More coming soon'
      }
    });
  }

  renderFeatures = info => (
    <View style={ss.featuresContainer}>
      {info.pet && (
        <Touchable onPress={() => this.onClickFeature('pet')}>
          <View><FeatureBox category="pet" feature={info.pet} /></View>
        </Touchable>
      )}
      {info.frost && (
        <Touchable onPress={() => this.onClickFeature('frost')}>
          <View><FeatureBox category="frost" feature={info.frost} /></View>
        </Touchable>
      )}
      {info.lifespan && (
        <Touchable onPress={() => this.onClickFeature('lifespan')}>
          <View><FeatureBox category="lifespan" feature={info.lifespan} /></View>
        </Touchable>
      )}
      {info.sun && (
        <Touchable onPress={() => this.onClickFeature('sun')}>
          <View><FeatureBox category="sun" feature={info.sun} /></View>
        </Touchable>
      )}
      {info.thirstiness && (
        <Touchable onPress={() => this.onClickFeature('thirstiness')}>
          <View><FeatureBox category="thirstiness" feature={info.thirstiness} /></View>
        </Touchable>
      )}
      {info.soil && (
        <Touchable onPress={() => this.onClickFeature('soil')}>
          <View><FeatureBox category="soil" feature={info.soil} /></View>
        </Touchable>
      )}
    </View>
  );

  render() {
    const { info } = this.props;
    const {
      isFeatureDetailsModalOpen,
      featureDetails,
    } = this.state;
    if (!info) return <ActivityIndicator size="large" />;

    return (
      <View style={ss.main}>
        {info.overview
          && (
          <View style={ss.topSection}>
            <Header>Essentials</Header>
            <Markdown>
              {info.overview}
            </Markdown>
          </View>
          )
        }
        {info.timeToHarvest
          && (
          <View style={ss.section}>
            <View style={ss.titleSpacing}>
              <SectionTitle uppercase color="medGray">How long till the harvest?</SectionTitle>
            </View>
            <View style={ss.timeToHarvest}>
              <DetailHeader align="center" color="grass" weight="light">{info.timeToHarvest}</DetailHeader>
            </View>
          </View>
          )
        }
        <View style={ss.section}>
          <View style={ss.titleSpacing}>
            <SectionTitle uppercase color="medGray">Features</SectionTitle>
          </View>
          {this.renderFeatures(info)}
        </View>
        <StandardModal
          visible={isFeatureDetailsModalOpen}
          onClose={() => this.setState({ isFeatureDetailsModalOpen: false })}
          title={featureDetails.category}
        >
          <View style={ss.padded}>
            <Header>{featureDetails.title}</Header>
            <Markdown>
              {featureDetails.content}
            </Markdown>
          </View>
        </StandardModal>
      </View>
    );
  }
}

Essentials.propTypes = {
  info: PROPSHAPES.plant.isRequired,
};

export default Essentials;
