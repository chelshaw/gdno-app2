import React from 'react';
import { StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';
import { COLORS, space } from '../constants';
import Type from './Type';
import ThumbnailWithFallback from './ThumbnailWithFallback';

const styles = StyleSheet.create({
  plantBlock: {
    width: 120,
    height: 150,
    paddingHorizontal: space[2],
    paddingVertical: space[2],
    backgroundColor: COLORS.white,
    borderWidth: 2,
    borderColor: COLORS.lightGray,
    flexDirection: 'column',
    alignItems: 'center',
  },
  thumbnail: {
    marginBottom: space[2],
  }
});

const PlantBlock = ({
  style,
  nickname,
  species,
  imageUrl,
  ...passedProps,
}) => (
  <View style={[styles.plantBlock, style]} {...passedProps}>
    <View style={styles.thumbnail}>
      <ThumbnailWithFallback
        size={72}
        imageUrl={imageUrl}
        name={nickname || species}
      />
    </View>
    <Type weight="bold" color="gray" align="center" size={14} lineHeight={1}>
      {nickname || species}
    </Type>
    {!!nickname && <Type italic align="center" color="medGray" size={12}>{species}</Type>}
  </View>
);

PlantBlock.propTypes = {
  style: PropTypes.object,
  nickname: PropTypes.string,
  species: PropTypes.string,
  imageUrl: PropTypes.string,
};

export default PlantBlock;
