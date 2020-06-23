import * as firebase from 'firebase';
import 'firebase/firestore';

import handleError from '../shared/data/handleError';
import { performGet } from '../shared/data/rest';
import {
  retrieveUser, retrieveParsedDataOfType
} from '../shared/data/localStorage';
import { DARKSKY_KEY } from '../shared/secrets';

export { default as getCoordsForZip } from './travisZipcodes';

export const loadStoredPlants = async () => {
  try {
    const plants = await retrieveParsedDataOfType('plant');
    return plants;
  } catch (e) {
    handleError(e);
    throw e;
  }
};

export const fetchUserPlants = userId => firebase
  .firestore()
  .collection('users')
  .doc(userId)
  .collection('myPlants')
  .get()
  .then((querySnapshot) => {
    const plantList = [];
    querySnapshot.forEach((doc) => {
      const fields = doc.data();
      plantList.push({
        id: doc.id,
        ...fields,
      });
    });
    return plantList;
  })
  .catch((e) => {
    handleError(e);
    throw e;
  });

export const getSavedZipcode = async () => {
  let info = {};
  try {
    info = await retrieveUser('user');
    return info.zipcode;
  } catch (e) {
    handleError(e);
    throw e;
  }
};

export const loadWeatherDataFromCoords = async (lat, lng) => {
  let weatherData;
  // TODO: replace URL with function url
  const url = `https://api.darksky.net/forecast/${DARKSKY_KEY}/${lat},${lng}`;
  try {
    const apiResponse = await performGet(url);
    weatherData = apiResponse.data;
  } catch (err) {
    throw err;
  }
  return weatherData;
};

export default {
  loadStoredPlants,
};
