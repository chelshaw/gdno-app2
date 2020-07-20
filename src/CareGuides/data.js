import * as firebase from 'firebase';
import 'firebase/firestore';

import handleError from '../shared/data/handleError';
import {
  retrieveParsedDataOfType,
  retrievePlant,
  retrieveSpecies,
  updatePlant,
  deletePlant,
} from '../shared/data/localStorage';
import {
  storeUserPlant
} from '../shared/data/plantStorage';

export const getPlantList = () => {
  const query = firebase.firestore().collection('speciesList').orderBy('name');
  return query.get().then((querySnapshot) => {
    const plantList = [];
    querySnapshot.forEach((doc) => {
      const fields = doc.data();
      plantList.push({
        id: doc.id,
        ...fields,
      });
    });
    return plantList;
  }).catch((e) => {
    handleError(e);
    throw e;
  });
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

const updateUserPlantInDb = (userId, id, updates) => firebase
  .firestore()
  .collection('users')
  .doc(userId)
  .collection('myPlants')
  .doc(id)
  .update(updates)
  .then(() => updates);

const deleteUserPlantInDb = (userId, id) => firebase
  .firestore()
  .collection('users')
  .doc(userId)
  .collection('myPlants')
  .doc(id)
  .update({ deletedOn: Date.now() })
  .then(() => true)
  .catch((e) => { handleError(e); return false; });

const updateSavedPlant = (plantId, updates) => updatePlant(plantId, updates);

const removeSavedPlant = plantId => deletePlant(plantId);

export const updatePlantInfoById = async (
  userId,
  id,
  updates,
) => updateUserPlantInDb(userId, id, updates)
  .then(() => updateSavedPlant(id, updates))
  .catch((err) => {
    handleError(err);
    throw err;
  });

export const deletePlantById = (userId, id) => deleteUserPlantInDb(userId, id)
  .then(() => removeSavedPlant(id))
  .catch((err) => {
    handleError(err);
    throw err;
  });

export const getPlantInfoById = async (id) => {
  let plant;
  let species;
  try {
    plant = await retrievePlant(id);
    species = await retrieveSpecies(plant.speciesId);
  } catch (e) {
    handleError(e);
    throw e;
  }
  return {
    ...species,
    ...plant,
  };
};

// TODO: Rename to downloadNewPlant
export const downloadPlant = (userId, speciesListItem) => {
  const db = firebase.firestore();
  if (!userId) throw new Error('Missing User Id');
  const now = Date.now();
  const plant = {
    speciesId: speciesListItem.id,
    species: speciesListItem.name,
    thumbnail: speciesListItem.thumbnail,
    plantedTimestamp: now,
    nickname: '',
    notificationsEnabled: false,
    lastWatered: now,
  };
  return db.collection('users').doc(userId).collection('myPlants').add(plant)
    .then(docRef => docRef.id)
    .then(docId => storeUserPlant({ ...plant, docId }))
    .catch(err => handleError(err));
};
