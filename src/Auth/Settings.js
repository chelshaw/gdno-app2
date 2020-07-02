/* global __DEV__ */
import React, { useEffect, useState } from 'react';
import {
  SafeAreaView, StyleSheet, ActivityIndicator
} from 'react-native';
import SettingDisplay from './components/SettingDisplay';
import {
  space, safeArea, PROPSHAPES, centered
} from '../shared/constants';
import {
  Button, ErrorState, Media, SubHead
} from '../shared/components';
import { defaultSettings, getSettings } from './data';
import { clearUserStorage, getAllKeysOfType, clearPlantStorage } from '../shared/data/localStorage';
import handleError from '../shared/data/handleError';
import { useAuth } from '../shared/use-auth';

const ss = StyleSheet.create({
  container: {
    padding: space[2],
  },
  centered,
  safeArea,
});

const SettingsScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [settings, setSettings] = useState(defaultSettings);
  const [requireLogin, setRequireLogin] = useState(false);
  const [keys, setKeys] = useState(null);
  const reset = navigation.getParam('reset');
  const auth = useAuth();

  const loadSettings = (user) => {
    getSettings(user)
      .then((userSettings) => {
        const s = userSettings.data();
        if (!s) {
          throw new Error('No settings saved');
        }
        const displaySettings = {
          name: `${s.firstName} ${s.lastName}`,
          email: user.email,
          ...s,
        };
        setSettings(displaySettings);
        setLoading(false);
      })
      .catch((err) => {
        handleError(err);
        setLoading(false);
        setError(err.message);
      });
  };

  const loadAllKeys = () => {
    getAllKeysOfType('all')
      .then(results => setKeys(results))
      .catch(() => {});
  };

  useEffect(() => {
    loadAllKeys();
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (loading) {
        setRequireLogin(true);
      }
    }, 5000);

    return () => {
      clearTimeout(timeout);
    };
  });

  useEffect(
    () => {
      if ((loading || reset) && auth.user) {
        loadSettings(auth.user);
      }
    },
    [auth, loading, reset],
  );

  const clearPlants = () => {
    clearPlantStorage();
  };

  const handleSignOut = () => {
    auth.signout()
      .then(() => {
        clearUserStorage();
      })
      .finally(() => {
        navigation.navigate('Welcome');
      });
  };

  if (error) {
    return <ErrorState title="We couldn't load your settings" details={error} />;
  }

  if (requireLogin) {
    return (
      <SafeAreaView style={ss.safeArea}>
        <Media>
          <Media.Body style={ss.centered}>
            <SubHead>Please log in again to edit your settings</SubHead>
          </Media.Body>
          <Media.Item>
            <Button color="danger" onPress={handleSignOut}>Log Out</Button>
          </Media.Item>
        </Media>
      </SafeAreaView>
    );
  }

  if (loading) {
    return (
      <SafeAreaView style={ss.safeArea}>
        <Media>
          <Media.Body style={ss.centered}>
            <ActivityIndicator size="large" />
          </Media.Body>
          <Media.Item>
            <Button color="danger" onPress={handleSignOut}>Log Out</Button>
          </Media.Item>
        </Media>
      </SafeAreaView>
    );
  }

  const fullName = (`${settings.firstName || ''} ${settings.lastName || ''}`).trim();
  return (
    <SafeAreaView style={ss.safeArea}>
      <Media>
        <Media.Body style={ss.container}>
          <SettingDisplay
            label="Name"
            value={fullName}
          />
          <SettingDisplay
            label="Email"
            value={settings.email}
          />
          <SettingDisplay
            label="Zipcode"
            value={settings.zipcode}
          />
          <Button align="left" inverted onPress={() => navigation.navigate('EditSettings', { ...settings })}>Edit</Button>
          {__DEV__ && (
            <>
              <Button onPress={clearPlants}>Clear</Button>
              {keys && keys.length && keys.map(k => (
                <SubHead key={k}>{k}</SubHead>
              ))}
            </>
          )}
        </Media.Body>
        <Media.Item>
          <Button color="danger" onPress={handleSignOut}>Log Out</Button>
        </Media.Item>
      </Media>
    </SafeAreaView>
  );
};

SettingsScreen.propTypes = {
  navigation: PROPSHAPES.navigation.isRequired,
};

export default SettingsScreen;
