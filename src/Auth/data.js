import * as firebase from 'firebase';
import 'firebase/firestore';

import { retrieveUser, updateUser } from '../shared/data/localStorage';
import handleError from '../shared/data/handleError';

const settingsKeys = [
  'firstName',
  'lastName',
  'growerType',
  'zipcode',
  'reminderTime',
];
export const defaultSettings = {
  firstName: '',
  lastName: '',
  email: '',
  zipcode: '',
  reminderTime: '',
};

function getValidKeypairs(object, keyList) {
  const returnObj = {};
  keyList.forEach((key) => {
    if (typeof object[key] !== 'undefined') {
      returnObj[key] = object[key];
    }
  });
  return returnObj;
}

export const getStoredUser = async () => {
  let result;
  try {
    result = await retrieveUser();
  } catch (e) {
    handleError(e);
    throw e;
  }
  return result;
};

export const getStoredInfo = async () => {
  let userInfo;
  try {
    userInfo = await retrieveUser();
  } catch (e) {
    handleError(e);
    throw new Error('There was a problem fetching stored data');
  }
  return {
    uid: (userInfo || {}).uid,
    zipcode: (userInfo || {}).zipcode,
  };
};

export const getSettings = async authUser => firebase
  .firestore()
  .collection('users')
  .doc(authUser.uid)
  .get();

const storeZipcode = (zipcode) => {
  updateUser({ zipcode });
};

export const addUserSettings = async (uid, settings) => {
  const userSettings = getValidKeypairs(settings, settingsKeys);
  if (settings.zipcode) {
    storeZipcode(settings.zipcode);
  }
  return firebase.firestore().collection('users').doc(uid).set(userSettings, { merge: true });
};

export const storeUser = user => updateUser({ uid: user.uid });
