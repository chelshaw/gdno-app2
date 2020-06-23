import React, { useEffect } from 'react';

import { PageLoader } from '../shared/components';
import { PROPSHAPES } from '../shared/constants';
import handleError from '../shared/data/handleError';
import { retrieveVersion, clearStorage } from '../shared/data/localStorage';
import { getStoredInfo } from './data';
import { useAuth } from '../shared/use-auth';

const currentVersion = '0.4.0';

const AuthLoading = ({ navigation }) => {
  const auth = useAuth();

  const checkVersionSignout = () => {
    retrieveVersion().then((version) => {
      if (!version || version !== currentVersion) {
        clearStorage();
      }
      auth.signout();
    }).catch((error) => {
      handleError(error);
    }).finally(() => {
      navigation.navigate('Auth');
    });
  };

  const checkLoginState = () => {
    getStoredInfo()
      .then((u) => {
        if (u.uid && u.zipcode) {
          navigation.navigate('App');
          return;
        }
        checkVersionSignout();
      })
      .catch((e) => {
        handleError(e);
        checkVersionSignout();
      });
  };

  useEffect(() => {
    const timer = setTimeout(checkLoginState, 5000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (auth.user) {
      navigation.navigate('App');
    }
  }, [auth]);

  return (
    <PageLoader label="Loading Gardenio…" />
  );
};

AuthLoading.propTypes = {
  navigation: PROPSHAPES.navigation.isRequired,
};

export default AuthLoading;
