import * as firebase from 'firebase';
import 'firebase/firestore';

import handleError from '../shared/data/handleError';
import { performGet } from '../shared/data/rest';
import {
  retrieveUser, retrieveParsedDataOfType
} from '../shared/data/localStorage';
import {
  storeUserPlant,
} from '../shared/data/plantStorage';
import { DARKSKY_KEY, GEOCODE_KEY } from '../shared/secrets';

const getFirstOfArray = (arr) => {
  if (!arr || arr.length === 0) {
    return null;
  }
  return arr[0];
};

const getCoordsAndLocalityForZip = async (zipcode) => {
  const url = `https://maps.googleapis.com/maps/api/geocode/json?key=${GEOCODE_KEY}&components=postal_code:${zipcode}`;
  try {
    const apiResponse = await performGet(url);
    const firstResponse = getFirstOfArray(apiResponse.data.results);
    if (!firstResponse || !firstResponse.geometry) {
      throw new Error(`We were unable to locate you based on the zipcode ${zipcode}. Are you sure that's right?`);
    }
    const { location } = apiResponse.data.results[0].geometry || {};
    const { postcode_localities: locals } = apiResponse.data.results[0];
    // returns shape { lat, lng }
    return {
      ...location,
      locality: locals ? locals[0] : '',
    };
  } catch (err) {
    handleError(err);
    throw err;
  }
};

const loadWeatherDataFromCoords = async (lat, lng) => {
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

export const getDailyWeatherAndLocationForZipcode = async (zipcode) => {
  try {
    const { lat, lng, locality } = await getCoordsAndLocalityForZip(zipcode);
    const weatherData = await loadWeatherDataFromCoords(lat, lng);
    return {
      dailyData: weatherData.daily.data,
      locality,
    };
  } catch (e) {
    handleError(e);
    throw e;
  }
};

export const loadStoredPlants = async () => {
  try {
    const plants = await retrieveParsedDataOfType('plant');
    return plants;
  } catch (e) {
    handleError(e);
    throw e;
  }
};

const fetchUserPlants = userId => firebase
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


const saveMyPlantsLocally = (userId, myPlants) => {
  if (!userId) return;
  const promises = myPlants.map(plant => storeUserPlant(plant));
  Promise.all(promises).finally(() => {});
};

const fetchAndDownloadUserPlants = async (userId) => {
  let userPlants;
  try {
    const fetchedPlants = await fetchUserPlants(userId);
    userPlants = fetchedPlants.filter(plant => !plant.deletedOn);
    saveMyPlantsLocally(userId, userPlants);
    return userPlants;
  } catch (e) {
    handleError(e);
    throw new Error('We couldn\'t fetch your plants. Please try again later.');
  }
};

export const getUserPlants = async (userId) => {
  let storedPlants;
  try {
    storedPlants = await loadStoredPlants();
    if (!userId || storedPlants.length !== 0) return storedPlants;
    return fetchAndDownloadUserPlants(userId);
  } catch (e) {
    handleError(e);
    throw new Error('We were unable to get info about your garden :( please try again later.');
  }
};

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

export default null;
