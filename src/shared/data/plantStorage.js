import * as firebase from 'firebase';
import 'firebase/firestore';

import handleError from './handleError';
import {
  storePlant,
  storeSpecies,
} from './localStorage';

const fetchAndSavePlantSpecies = async (speciesId) => {
  let speciesInfo;
  try {
    const result = await firebase
      .firestore()
      .collection('species')
      .doc(speciesId)
      .get();
    speciesInfo = result.data();
    return storeSpecies(speciesId, speciesInfo);
  } catch (e) {
    handleError(e);
    throw e;
  }
};

export const storeUserPlant = async (plant) => {
  let storedPlant;
  try {
    storedPlant = await storePlant(plant.id, plant);
  } catch (e) {
    handleError(e);
  }
  return fetchAndSavePlantSpecies(plant.speciesId, storedPlant);
};

export default null;
