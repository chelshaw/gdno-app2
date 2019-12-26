import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
} from 'react-native';
import PropTypes from 'prop-types';

import {
  Touchable, Type, DetailHeader, Media, Button,
} from '../shared/components';
import {
  space, COLORS, hitSlop,
} from '../shared/constants';
import { useAuth } from '../shared/use-auth';
import handleError from '../shared/data/handleError';
import Weather from './components/Weather';
import MySavedPlants from './components/MySavedPlants';
import { getZipcodeForUserId } from './data';

const styles = StyleSheet.create({
  container: {
    padding: space[2],
  },
  weatherSection: {
    marginBottom: space[3],
  },
  plants: {
    marginTop: space[2],
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap'
  },
  spaced: {
    marginRight: space[2],
    marginBottom: space[2],
  },
  plantTitles: {
    alignItems: 'baseline'
  },
  infoBox: {
    backgroundColor: COLORS.blueTint,
    padding: space[3],
    marginVertical: space[2],
  },
  infoBoxText: {
    marginBottom: space[2],
  }
});

const PersonalHome = (props) => {
  const [zipcode, setZipcode] = useState(null);
  const [loadingZipcode, setLoadingZipcode] = useState(false);
  const auth = useAuth();

  const getZipForUser = (uid) => {
    setLoadingZipcode(true);
    getZipcodeForUserId(uid)
      .then((result) => {
        const settings = result.data();
        setZipcode(settings.zipcode);
        setLoadingZipcode(false);
      })
      .catch((err) => {
        handleError(err);
        setLoadingZipcode(false);
      });
  };

  useEffect(() => {
    if (auth.user) {
      getZipForUser(auth.user.uid);
    }
  }, [auth]);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.weatherSection}>
        <DetailHeader weight="bold">What&apos;s it like outside?</DetailHeader>
        {zipcode ? (
          <Weather zipcode={zipcode} loadingZipcode={loadingZipcode} />
        ) : (
          <View style={styles.infoBox}>
            <View style={styles.infoBoxText}>
              <Type>
                We can&apos;t show you the kind of weather your plants will
                 experience because you don&apos;t have your zipcode set.
              </Type>
            </View>
            <Button onPress="EditSettings">Add your Zipcode</Button>
          </View>
        )}

      </View>
      <View style={styles.plantsSection}>
        <Media direction="row" style={styles.plantTitles}>
          <Media.Body>
            <DetailHeader weight="bold">My plants</DetailHeader>
          </Media.Body>
          <Media.Item>
            <Touchable onPress="NewPlant" hitSlop={hitSlop}>
              <Type color="grass" weight="bold">Add a plant</Type>
            </Touchable>
          </Media.Item>
        </Media>
        <MySavedPlants navigate={props.navigation.navigate} signout={auth.signout} />
      </View>
    </ScrollView>
  );
};

PersonalHome.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default PersonalHome;
