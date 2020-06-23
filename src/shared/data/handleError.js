/* global __DEV__ */
import * as Sentry from '@sentry/react-native';

const handleError = (error) => {
  if (__DEV__) {
    console.debug(error);
  } else {
    Sentry.captureException(error);
  }
};

export default handleError;
