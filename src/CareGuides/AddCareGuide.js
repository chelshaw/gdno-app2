import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  ActivityIndicator,
  Picker,
  Alert,
} from 'react-native';

import handleError from '../shared/data/handleError';
import { useAuth } from '../shared/use-auth';
import {
  PROPSHAPES, COLORS, space, centered
} from '../shared/constants';
import {
  Button, ErrorState, Media, ThumbnailWithFallback, Type
} from '../shared/components';

import {
  getPlantList, downloadPlant
} from './data';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'space-between',
  },
  centered,
  centeredWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
  },
  bottomButton: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGray,
    padding: space[2],
  },
  thumbnailWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
  },
  defaultThumbnail: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: COLORS.lightGray,
  },

});

const defaultSelection = { label: 'Pick yer plant', id: null };

const AddCareGuideScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [speciesList, setSpeciesList] = useState([]);
  const [selection, setSelection] = useState(defaultSelection);
  const auth = useAuth();

  const fetchAllPlants = () => {
    setLoading(true);
    setError(false);
    getPlantList()
      .then((plants) => {
        setSpeciesList(plants);
        setLoading(false);
      })
      .catch((err) => {
        handleError(err);
        setError(true);
        setLoading(false);
      });
  };

  const handlePlantSelect = (speciesId) => {
    setSelection(
      [...speciesList, defaultSelection].find(s => s.id === speciesId)
    );
  };

  const triggerErrorMessage = (message = 'Something went wrong. Please try again later.') => (
    Alert.alert(
      'Well, darn.',
      message,
      [
        {
          text: 'Log Out',
          onPress: () => {
            auth.signout();
            navigation.navigate('Welcome');
          }
        },
      ]
    )
  );

  const handleDownloadPress = () => {
    if (!auth.user || !auth.user.uid || !selection || !selection.id) {
      triggerErrorMessage('Something went wrong. Try logging in again and contact us if it persists.');
      return;
    }
    setError(false);
    setLoading(true);
    downloadPlant(auth.user.uid, selection)
      .then(() => {
        setLoading(false);
        navigation.goBack();
        navigation.state.params.onGoBack();
      })
      .catch((err) => {
        handleError(err);
        setError(true);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchAllPlants();
  }, []);

  if (error) return <ErrorState details="We're having issues gathering the plant data. Please try again later." />;

  return (
    <Media style={styles.container}>
      <Media.Body>
        {loading || !speciesList || speciesList.length === 0
          ? (
            <View style={styles.centered}>
              <ActivityIndicator size="large" color={COLORS.magenta} />
            </View>
          ) : (
            <View style={styles.centeredWrapper}>
              <View style={styles.thumbnailWrapper}>
                {selection.id
                  ? (
                    <ThumbnailWithFallback
                      size={100}
                      imageUrl={selection.thumbnail}
                      name={selection.name}
                    />
                  )
                  : (<View style={styles.defaultThumbnail}><Type color="medGray" size={80} align="center">?</Type></View>)
              }
              </View>
              <Picker
                style={styles.plantPicker}
                selectedValue={selection.id}
                onValueChange={
                  value => handlePlantSelect(value)
                }
              >
                <Picker.Item label={defaultSelection.label} value={defaultSelection.id} />
                {speciesList.map(species => (
                  <Picker.Item key={species.id} label={species.name} value={species.id} />
                ))}
              </Picker>
            </View>
          )
        }
      </Media.Body>
      <Media.Item style={styles.bottomButton}>
        <Button
          disabled={loading || selection.id === null}
          onPress={handleDownloadPress}
        >
          Download
        </Button>
      </Media.Item>
    </Media>
  );
};

AddCareGuideScreen.propTypes = {
  navigation: PROPSHAPES.navigation,
};

export default AddCareGuideScreen;
