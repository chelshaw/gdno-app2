import React from 'react';
import { FlatList } from 'react-native';
import PropTypes from 'prop-types';
import ListItemWithImage from './ListItemWithImage';

const PlantList = ({
  plants,
  onPress = () => {},
  onRemove,
  selectable = false,
  selectedList = [],
  addedList = [],
  header = null,
  footer = null,
  style = {},
}) => {
  const handleOnPress = (item) => {
    onPress(item);
  };

  return (
    <FlatList
      data={plants}
      style={style}
      renderItem={({ item }) => (
        <ListItemWithImage
          item={item}
          selectable={selectable}
          onPress={handleOnPress}
          onRemove={typeof onRemove === 'function' ? onRemove : undefined}
          added={addedList.indexOf(item.id) >= 0}
          selected={selectable && selectedList.indexOf(item.id) >= 0}
        />
      )}
      keyExtractor={item => item.id}
      ListHeaderComponent={header}
      ListFooterComponent={footer}
    />
  );
};

PlantList.propTypes = {
  plants: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    imageUrl: PropTypes.string,
  })).isRequired,
  onPress: PropTypes.func,
  onRemove: PropTypes.func,
  selectable: PropTypes.bool,
  selectedList: PropTypes.arrayOf(PropTypes.string),
  addedList: PropTypes.arrayOf(PropTypes.string),
  header: PropTypes.node,
  footer: PropTypes.node,
  style: PropTypes.object,
};

export default PlantList;
