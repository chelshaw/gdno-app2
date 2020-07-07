import React from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';
import PropTypes from 'prop-types';

import { space, hitSlop } from '../../shared/constants';
import {
  Media, Touchable, Chevron, ThumbnailWithFallback, Trash
} from '../../shared/components';
import EditablePlantName from './EditablePlantName';

const ss = StyleSheet.create({
  container: {
    paddingVertical: space[0],
    alignItems: 'center',
  },
  button: {
    paddingHorizontal: space[2],
  },
  titleWrapper: {
    paddingLeft: space[1],
  },
  deleteBlock: {
    width: 30,
    height: 30,
    padding: 5,
  }
});

const TitleBar = ({
  showBackButton = true,
  onClickBack = () => {},
  imageUrl,
  showImage = true,
  nickname = '',
  species = '',
  updatePlant = () => {},
  deletePlant = () => {},
}) => {
  const titleText = nickname || species;
  const handleSaveNickname = (newName) => {
    updatePlant({ nickname: newName });
  };

  return (
    <Media direction="row" style={ss.container}>
      {showBackButton && (
        <Media.Item>
          <Touchable onPress={onClickBack}>
            <View style={ss.button}>
              <Chevron pointing="left" strokeColor="gray" />
            </View>
          </Touchable>
        </Media.Item>
      )}
      {showImage && (
        <Media.Item>
          <ThumbnailWithFallback imageUrl={imageUrl} name={titleText} />
        </Media.Item>
      )}
      <Media.Body style={ss.titleWrapper}>
        <EditablePlantName
          species={species}
          nickname={nickname}
          onSave={handleSaveNickname}
        />
      </Media.Body>
      <Media.Item>
        <View style={ss.deleteBlock}>
          <Touchable onPress={deletePlant}>
            <Trash width={20} height={20} hitSlop={hitSlop} />
          </Touchable>
        </View>
      </Media.Item>
    </Media>
  );
};
TitleBar.propTypes = {
  showBackButton: PropTypes.bool,
  onClickBack: PropTypes.func,
  species: PropTypes.string,
  nickname: PropTypes.string,
  imageUrl: PropTypes.string,
  showImage: PropTypes.bool,
  updatePlant: PropTypes.func,
  deletePlant: PropTypes.func,
};

export default TitleBar;
