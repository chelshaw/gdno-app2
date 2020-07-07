import { AsyncStorage } from 'react-native';
import handleError from './handleError';

/*
 * LOCAL DATA STRUCTURE
 * Different types of data should be stored locally.
 * User specific (zipcode, uid, lastVersion?)
 * User's plants (independent of the plant data)
 * Plant species data (no dupes)
 *
 * Typical user's data store might look like:
 * @GDNO_USER_INFO => { uid, zipcode/lat,lng }
 * @GDNO_INFO_VERSION => '0.4.0' (or whatever their latest version is)
 * @GDNO_PLANT_{ID} => { plant info }
 * @GDNO_SPECIES_{PLANTID} => { species info }
 */

export const keyTypes = {
  info: 'INFO',
  user: 'USER',
  plant: 'PLANT',
  species: 'SPECIES',
};

const setValue = async (key, type, value) => {
  let val = value;
  if (!key) throw new Error('No key defined');
  if (!keyTypes[type]) throw new Error('Bad storage key type');
  if (typeof value !== 'string') {
    val = JSON.stringify(value);
  }
  try {
    return AsyncStorage.setItem(`@GDNO_${keyTypes[type]}_${key}`, val);
  } catch (e) {
    handleError(e);
    throw e;
  }
};
export const storePlant = (key, value) => setValue(key, 'plant', value);
export const storeSpecies = (key, value) => setValue(key, 'species', value);
export const setVersion = version => setValue('VERSION', 'info', version);

const getValue = async (key, type) => {
  let value;
  try {
    value = await AsyncStorage.getItem(`@GDNO_${keyTypes[type]}_${key}`);
  } catch (e) {
    handleError(e);
    throw e;
  }
  try {
    return JSON.parse(value);
  } catch {
    return value;
  }
};
export const retrievePlant = key => getValue(key, 'plant');
export const retrieveSpecies = key => getValue(key, 'species');
export const retrieveUser = () => getValue('INFO', 'user');
export const retrieveVersion = () => getValue('VERSION', 'info');

const updateValue = async (key, type, data) => {
  let existing;
  if (!key) throw new Error('No key defined');
  if (!keyTypes[type]) throw new Error('Bad storage key type');
  try {
    existing = await getValue(key, type);
    if (!existing) {
      return setValue(key, type, data);
    }
    return AsyncStorage.mergeItem(`@GDNO_${keyTypes[type]}_${key}`, JSON.stringify(data));
  } catch (e) {
    handleError(e);
    throw e;
  }
};
export const updatePlant = (key, data) => updateValue(key, 'plant', data);
export const updateUser = data => updateValue('INFO', 'user', data);

const getMultipleValues = async (keys) => {
  let values;
  try {
    values = await AsyncStorage.multiGet(keys);
  } catch (e) {
    handleError(e);
    throw e;
  }

  return values;
};

// Used for debug mode only
export const getAllKeysOfType = async (type) => {
  let filter = () => false;
  if (keyTypes[type]) {
    filter = key => key.indexOf(`@GDNO_${keyTypes[type]}_`) >= 0;
  } else if (type === 'all') {
    filter = () => true;
  }
  let keyList;
  try {
    keyList = await AsyncStorage.getAllKeys();
  } catch (e) {
    handleError(e);
    throw e;
  }
  const filtered = keyList.filter(filter);
  return filtered;
};

const retrieveDataOfType = async (type) => {
  let keyList;
  let results;
  try {
    keyList = await getAllKeysOfType(type);
    results = await getMultipleValues(keyList);
  } catch (e) {
    handleError(e);
    throw e;
  }

  if (results === null) {
    return [];
  }
  return results;
};

export const retrieveParsedDataOfType = async (type) => {
  let data;
  try {
    data = await retrieveDataOfType(type);
  } catch (e) {
    handleError(e);
    throw e;
  }

  return data.map((d) => {
    try {
      return JSON.parse(d[1]);
    } catch (e) {
      return d;
    }
  });
};

export const removeStorage = key => AsyncStorage.removeItem(key);

export const deletePlant = key => removeStorage(`@GDNO_${keyTypes.plant}_${key}`);

export const clearPlantStorage = async () => {
  try {
    const userKeys = await getAllKeysOfType('plant');
    return AsyncStorage.multiRemove(userKeys);
  } catch (e) {
    handleError(e);
    throw e;
  }
};

export const clearUserStorage = async () => {
  try {
    const userKeys = await getAllKeysOfType('user');
    return AsyncStorage.multiRemove(userKeys);
  } catch (e) {
    handleError(e);
    throw e;
  }
};

export const clearStorage = async () => {
  let keys;
  try {
    keys = await getAllKeysOfType('all');
  } catch (e) {
    handleError(e);
  }
  AsyncStorage.multiRemove(keys, (e) => {
    if (e) handleError(e);
  });
};
