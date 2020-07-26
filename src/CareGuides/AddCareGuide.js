import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  ActivityIndicator,
  Alert,
} from 'react-native';

import { useAuth } from '../shared/use-auth';
import {
  PROPSHAPES, COLORS, space, centered
} from '../shared/constants';
import {
  Type, ErrorState, Media, PlantBlock, Touchable
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
  bottomButton: {
    padding: space[4],
  },
  plantBlocksWrapper: {
    flex: 1,
    flexWrap: 'wrap',
    flexDirection: 'row'
  },
  plantBlock: {
    borderColor: COLORS.white,
  }
});

const AddCareGuideScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [speciesList, setSpeciesList] = useState([]);
  const auth = useAuth();

  const fetchAllPlants = () => {
    setLoading(true);
    setError(false);
    getPlantList()
      .then((plants) => {
        setSpeciesList(plants);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
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

  const handlePlantSelect = (speciesId) => {
    if (!auth.user || !auth.user.uid) {
      triggerErrorMessage('Something went wrong. Try logging in again and contact us if it persists.');
      return;
    }
    const selected = speciesList.find(s => s.id === speciesId);
    setError(false);
    setLoading(true);
    downloadPlant(auth.user.uid, selected)
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
            <View style={styles.plantBlocksWrapper}>
              {speciesList.map(species => (
                <Touchable key={species.id} onPress={() => handlePlantSelect(species.id)}>
                  <PlantBlock
                    style={styles.plantBlock}
                    species={species.name}
                    imageUrl={species.thumbnail}
                  />
                </Touchable>
              ))}
            </View>
          )
        }
      </Media.Body>
      <Media.Item style={styles.bottomButton}>
        <Type align="center">More coming soon.</Type>
      </Media.Item>
    </Media>
  );
};

AddCareGuideScreen.propTypes = {
  navigation: PROPSHAPES.navigation,
};

export default AddCareGuideScreen;
