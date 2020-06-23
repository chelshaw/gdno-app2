import React, {
  useCallback, useState, useMemo, useEffect
} from 'react';
import {
  Alert,
  ScrollView,
  ActivityIndicator,
  StyleSheet,
  SafeAreaView,
} from 'react-native';

import { getPlantInfoById, updatePlantInfoById, deletePlantById } from './data';
import {
  COLORS, PROPSHAPES, detailsScreens, safeArea
} from '../shared/constants';
import handleError from '../shared/data/handleError';
import { useAuth } from '../shared/use-auth';

/* COMPONENTS */
import TitleBar from './components/TitleBar';
import SubNavMenu from './components/SubNavMenu';
import CareGuideEssentials from './sections/Essentials';
import CareGuideGrow from './sections/Grow';
import CareGuideIssues from './sections/Issues';
import CareGuideEnjoy from './sections/Enjoy';
import { PageLoader } from '../shared/components';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  subnav: {
    display: 'flex',
    flexDirection: 'row',
    height: 50,
  },
  safeArea,
});

const CareGuide = ({
  navigation
}) => {
  const [info, setInfo] = useState({});
  const [loading, setLoading] = useState(false);
  const [activeScreen, setScreen] = useState(detailsScreens.essentials);
  const auth = useAuth();

  const getCurrentPlantInfo = () => {
    const { id } = navigation.state.params;
    if (!id) navigation.goBack();
    setLoading(true);
    getPlantInfoById(id)
      .then((result) => {
        setInfo(result);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
        navigation.goBack();
      });
  };

  useEffect(() => {
    getCurrentPlantInfo();

    return () => setLoading(false);
  }, []);

  const triggerErrorMessage = (message = 'Something went wrong. Please try again later.') => (
    Alert.alert(
      'Well, darn.',
      message,
      [
        { text: 'OK', onPress: () => {} },
      ]
    )
  );

  const handleDeletePlant = useCallback(() => {
    const { uid } = auth.user;
    const { id } = navigation.state.params;
    if (!id || !uid) {
      handleError(`Plant or User ID missing on delete: ${uid} ${id}`);
      triggerErrorMessage();
      return;
    }
    setLoading(true);
    deletePlantById(uid, id)
      .then(() => {
        navigation.navigate('Home', {
          refresh: true,
        });
      })
      .catch(() => {
        triggerErrorMessage();
      });
  }, [navigation, auth]);

  const handleUpdatePlant = useCallback((updates) => {
    const { uid } = auth.user;
    const { id } = navigation.state.params;
    if (!id || !uid) {
      handleError(`Plant or User ID missing on update: ${uid} ${id}`);
      triggerErrorMessage();
      return;
    }
    updatePlantInfoById(uid, id, updates)
      .then(() => {
        setInfo({
          ...info,
          ...updates,
        });
      })
      .catch((e) => {
        handleError(e);
        triggerErrorMessage();
      });
  }, [auth, navigation, info]);

  const goToDetail = (toScreen) => {
    setScreen(toScreen);
  };

  const screenContent = useMemo(() => {
    if (!info) return (<ActivityIndicator size="large" color={COLORS.grass} />);

    switch (activeScreen) {
      case detailsScreens.grow:
        return (
          <CareGuideGrow info={info} />
        );
      case detailsScreens.issues:
        return (
          <CareGuideIssues />
        );
      case detailsScreens.enjoy:
        return (
          <CareGuideEnjoy info={info} />
        );
      default:
        return <CareGuideEssentials info={info} />;
    }
  }, [activeScreen, info]);

  if (loading || !info) {
    return (
      <PageLoader size="large" color="grass" />
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        <TitleBar
          onClickBack={() => navigation.navigate('Home', {
            refresh: true,
          })}
          nickname={info.nickname}
          species={info.name}
          imageUrl={info.thumbnail}
          updatePlant={updates => handleUpdatePlant(updates)}
          deletePlant={handleDeletePlant}
        />
        <SubNavMenu onPress={goToDetail} active={activeScreen} />
        {screenContent}
      </ScrollView>
    </SafeAreaView>
  );
};

CareGuide.propTypes = {
  navigation: PROPSHAPES.navigation,
};

export default CareGuide;
