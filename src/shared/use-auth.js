/* from https://usehooks.com/ */
import React, {
  useState, useEffect, useContext, createContext
} from 'react';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import { firebaseConfig } from './secrets';
import { updateUser, setVersion } from './data/localStorage';
import handleError from './data/handleError';

firebase.initializeApp(firebaseConfig);

const currentVersion = '0.4.0';

const authContext = createContext();

export const useAuth = () => useContext(authContext);

function useProvideAuth() {
  const [user, setUser] = useState(null);
  const [features, setFeatures] = useState([]);

  const storeZipcode = (zipcode) => {
    updateUser({ zipcode });
  };

  const fetchAndSaveUserFeatures = async (userId) => {
    try {
      const result = await firebase
        .firestore()
        .collection('users')
        .doc(userId)
        .get();
      const settings = result.data();
      if (settings.features !== undefined) {
        setFeatures(settings.features);
      }
      if (settings.zipcode !== undefined) {
        storeZipcode(settings.zipcode);
      }
    } catch (err) {
      handleError(err);
    }
  };

  const signin = (email, password) => firebase
    .auth()
    .setPersistence(firebase.auth.Auth.Persistence.LOCAL)
    .then(() => firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((response) => {
        setUser(response.user);
        return response.user;
      })
      .then((u) => {
        updateUser({ uid: u.uid });
        fetchAndSaveUserFeatures(u.uid);
        return u;
      })
      .catch((err) => {
        handleError(err);
        throw err;
      }));


  const signup = (email, password) => firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then((response) => {
      setUser(response.user);
      return response.user;
    });

  const signout = () => firebase
    .auth()
    .signOut()
    .then(() => {
      setUser(null);
    });

  const sendPasswordResetEmail = email => firebase
    .auth()
    .sendPasswordResetEmail(email)
    .then(() => true);

  const confirmPasswordReset = (code, password) => firebase
    .auth()
    .confirmPasswordReset(code, password)
    .then(() => true);

  const hasFeature = name => features.indexOf(name) >= 0;

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((u) => {
      if (u) {
        setUser(u);
        setVersion(currentVersion);
        fetchAndSaveUserFeatures(u.uid);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  return {
    user,
    features,
    hasFeature,
    signin,
    signup,
    signout,
    sendPasswordResetEmail,
    confirmPasswordReset
  };
}

export function ProvideAuth({ children }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}
