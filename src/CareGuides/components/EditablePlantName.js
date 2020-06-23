import React, { useEffect, useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

import { Touchable, Type } from '../../shared/components';
import { space, COLORS } from '../../shared/constants';

const styles = StyleSheet.create({
  title: {
    paddingLeft: space[1],
  },
  placeholder: {
    color: COLORS.medGray,
    fontStyle: 'italic',
  }
});

const EditablePlantName = ({ species, nickname, onSave }) => {
  const [workingName, setWorkingName] = useState(nickname || 'Name me!');
  const [editing, setEditing] = useState(false);
  const titleText = nickname || species;

  useEffect(() => () => setEditing(false), []);

  const toggleEditing = () => {
    setEditing(!editing);
  };

  const handleBlur = () => {
    onSave(workingName);
    setEditing(false);
  };

  const inputStyle = nickname ? styles.input : styles.placeholder;

  return (
    <Touchable style={styles.title} onPress={toggleEditing}>
      {editing
        ? (
          <View>
            <TextInput
              autoFocus
              style={inputStyle}
              onChangeText={text => setWorkingName(text)}
              onBlur={handleBlur}
              value={(workingName || '').toString()}
            />
          </View>
        )
        : (
          <View>
            {!!titleText && <Type weight="bold" color="gray" size={14} lineHeight={1}>{titleText}</Type>}
            {!!nickname && !!species && <Type italic color="medGray" size={12}>{species}</Type>}
          </View>
        )
      }
    </Touchable>
  );
};

export default EditablePlantName;
