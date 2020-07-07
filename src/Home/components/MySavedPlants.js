import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
} from 'react-native';
import PropTypes from 'prop-types';

import handleError from '../../shared/data/handleError';
import {
  Touchable, PageLoader, ErrorState, Type, Button
} from '../../shared/components';
import { space, centered } from '../../shared/constants';
import PlantBlock from './PlantBlock';
import { loadStoredPlants } from '../data';

const styles = StyleSheet.create({
  container: {
    padding: space[2],
  },
  plants: {
    marginVertical: space[2],
  },
  spaced: {
    marginRight: space[2],
    marginBottom: space[2],
  },
  emptyState: {
    flex: 1,
    ...centered,
    padding: space[2],
    textAlign: 'center'
  },
  topMargin: {
    marginTop: space[2],
  }
});

const ERROR_THRESHOLD = 2;

const MySavedPlants = ({
  style,
  navigate,
  signout,
  reloadToggle,
  onAddPlant,
  ...passedProps,
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorCount, setErrorCount] = useState(0);
  const [plants, setPlants] = useState([]);
  // TODO: check against db for updates

  useEffect(() => {
    setLoading(true);
    loadStoredPlants()
      .then((downloadedPlants) => {
        setPlants(downloadedPlants);
        setLoading(false);
      })
      .catch((e) => {
        handleError(e);
        setLoading(false);
        setError(true);
      });
    return () => { setError(false); setErrorCount(0); setLoading(false); };
  }, [reloadToggle]);

  const loadPlants = async () => {
    setLoading(true);
    setError(false);
    try {
      const downloadedPlants = await loadStoredPlants();
      setPlants(downloadedPlants);
      setLoading(false);
    } catch (e) {
      handleError(e);
      setError(true);
      setLoading(false);
    }
  };

  const handleErrorAction = () => {
    if (errorCount < ERROR_THRESHOLD) {
      loadPlants();
    } else {
      signout();
      navigate('Welcome');
    }
    setErrorCount(errorCount + 1);
  };

  if (loading) {
    return (<PageLoader />);
  }

  if (error) {
    const actionText = errorCount < ERROR_THRESHOLD ? 'Try Again' : 'Log out';
    return (<ErrorState callToAction={actionText} action={handleErrorAction} />);
  }

  const handlePlantPress = ({ nickname, name, id }) => () => {
    navigate('CareGuide', {
      nickname,
      name,
      id,
    });
  };

  return (
    <>
      {plants && plants.length > 0
        ? (
          <ScrollView horizontal style={[styles.plants, style]} {...passedProps}>
            {plants.map(plant => (
              <Touchable onPress={handlePlantPress(plant)} key={plant.id}>
                <PlantBlock
                  style={styles.spaced}
                  species={plant.species}
                  nickname={plant.nickname || ''}
                  imageUrl={plant.thumbnail}
                />
              </Touchable>
            ))
        }
          </ScrollView>
        )
        : (
          <View style={styles.emptyState}>
            <Type size={18} align="center" italic weight="light">Your garden is looking a bit empty!</Type>
            <View style={styles.topMargin}>
              <Button onPress={onAddPlant}>Let&apos;s get growing</Button>
            </View>
          </View>
        )
      }
    </>
  );
};

MySavedPlants.propTypes = {
  navigate: PropTypes.func.isRequired,
  style: PropTypes.object,
  signout: PropTypes.func,
  reloadToggle: PropTypes.number,
  onAddPlant: PropTypes.func,
};

export default MySavedPlants;
