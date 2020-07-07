import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  RefreshControl,
  Linking,
} from 'react-native';
import PropTypes from 'prop-types';

import {
  Touchable, Type, DetailHeader, Media, Button, ScreenWithBottomNav,
} from '../shared/components';
import {
  space, COLORS, hitSlop, LINKS,
} from '../shared/constants';
import { useAuth } from '../shared/use-auth';
import handleError from '../shared/data/handleError';
import Weather from './components/Weather';
import MySavedPlants from './components/MySavedPlants';
import { getSavedZipcode } from './data';

const styles = StyleSheet.create({
  container: {
    paddingVertical: space[2],
  },
  sidePadding: {
    paddingHorizontal: space[2],
  },
  weatherSection: {
    marginBottom: space[4],
  },
  plants: {
    marginTop: space[8],
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
    alignItems: 'baseline',
    paddingHorizontal: space[2],
  },
  infoBox: {
    backgroundColor: COLORS.blueTint,
    padding: space[4],
    marginVertical: space[2],
  },
  infoBoxText: {
    marginBottom: space[2],
  },
  feedbackSection: {
    paddingHorizontal: space[2],
    paddingVertical: space[3],
  },
  feedbackBodyWrapper: {
    paddingTop: space[1],
    paddingBottom: space[2],
  },
  bottomNavWrapper: {
    backgroundColor: COLORS.magenta,
    padding: space[1],
  }
});

const PersonalHome = ({ navigation }) => {
  const [zipcode, setZipcode] = useState(null);
  const [loadingZipcode, setLoadingZipcode] = useState(false);
  const [reloadPlantsToggle, setReloadPlantsToggle] = useState(1);
  const auth = useAuth();

  const loadZipcode = () => {
    setLoadingZipcode(true);
    getSavedZipcode()
      .then((zip) => {
        setZipcode(zip);
        setLoadingZipcode(false);
      })
      .catch((err) => {
        handleError(err);
        setLoadingZipcode(false);
      });
  };

  const refreshPlants = () => {
    setReloadPlantsToggle(reloadPlantsToggle * -1);
  };

  const handleRefresh = () => {
    loadZipcode();
    refreshPlants();
  };

  const handleAddPlantPress = () => {
    navigation.navigate('AddCareGuide', {
      onGoBack: () => handleRefresh(),
    });
  };

  const handleFeedbackPress = () => {
    Linking
      .openURL(LINKS.feedbackForm)
      .catch(() => {});
  };

  useEffect(() => {
    if (
      navigation.getParam('refresh', false) === true
    ) {
      refreshPlants();
    }
  }, [navigation]);

  useEffect(() => {
    loadZipcode();
  }, []);

  return (
    <ScreenWithBottomNav current="home">
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={loadingZipcode} onRefresh={handleRefresh} />
        }
      >
        <View style={styles.container}>
          <View style={styles.weatherSection}>
            <View style={styles.sidePadding}>
              <DetailHeader weight="bold">What&apos;s it like outside?</DetailHeader>
            </View>
            {zipcode || loadingZipcode ? (
              <View style={{ paddingVertical: space[2] }}>
                <Weather zipcode={zipcode} loadingZipcode={loadingZipcode} />
              </View>
            ) : (
              <View style={styles.infoBox}>
                <View style={styles.infoBoxText}>
                  <Type>
                We can&apos;t show you the kind of weather your plants will
                 experience because you don&apos;t have your zipcode set.
                  </Type>
                </View>
                <Button onPress="Settings">Add your Zipcode</Button>
              </View>
            )}

          </View>
          <View style={styles.plantsSection}>
            <Media direction="row" style={styles.plantTitles}>
              <Media.Body>
                <DetailHeader weight="bold">My plants</DetailHeader>
              </Media.Body>
              <Media.Item>
                <Touchable onPress={handleAddPlantPress} hitSlop={hitSlop}>
                  <Type color="grass" weight="bold">Add a plant</Type>
                </Touchable>
              </Media.Item>
            </Media>
            <MySavedPlants
              onAddPlant={handleAddPlantPress}
              reloadToggle={reloadPlantsToggle}
              navigate={navigation.navigate}
              signout={auth.signout}
              style={{ paddingLeft: space[2] }}
            />
          </View>
          <View style={styles.feedbackSection}>
            <DetailHeader weight="bold">How can we do better?</DetailHeader>
            <View style={styles.feedbackBodyWrapper}>
              <Type>
              We are trying to make the best #@$& app out there for growing your
               own food, so we want to hear from our community! What do you
                like? What can we do better?
              </Type>
            </View>
            <Button onPress={handleFeedbackPress}>Tell us your thoughts</Button>
          </View>
        </View>
      </ScrollView>
    </ScreenWithBottomNav>
  );
};

PersonalHome.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    getParam: PropTypes.func.isRequired,
  }).isRequired,
};

export default PersonalHome;
