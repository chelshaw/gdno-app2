import React, { useState } from 'react';
import {
  SafeAreaView, View, StyleSheet, Linking, Clipboard, Alert
} from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import { isEmpty } from 'lodash';

import {
  space, safeArea, PROPSHAPES, centered, hitSlop, LINKS
} from '../shared/constants';
import {
  StyledInput, Button, ErrorState, PageLoader, Type
} from '../shared/components';
import { addUserSettings } from './data';
import handleError from '../shared/data/handleError';
import { useAuth } from '../shared/use-auth';


const validationSchema = yup.object().shape({
  firstName: yup
    .string()
    .label('First Name'),
  lastName: yup
    .string()
    .label('Last Name'),
  zipcode: yup
    .number()
    .label('Zipcode'),
  reminderTime: yup
    .string()
    .matches(/^(1[0-2]|0[1-9]):([0-5]?[0-9])(\s?[AP]M)$/, {
      excludeEmptyString: true,
      message: 'Bad formatting. Please use HH:mm AM/PM'
    }),
});

const ss = StyleSheet.create({
  container: {
    padding: space[2],
  },
  centered,
  safeArea,
  saveButtonSpacing: {
    marginTop: space[2],
    marginBottom: space[1],
  }
});

const SettingsScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const auth = useAuth();
  const initialSettings = { ...navigation.state.params };

  const handleHelpError = () => {
    Alert.alert(
      'It\'s not you, it\'s us.',
      `That link didn't work how we thought it would. Just shoot us an email at ${LINKS.helpEmail} and we'll help ya out.`,
      [
        { text: 'Copy email', onPress: () => Clipboard.setString(LINKS.helpEmail) },
      ]
    );
  };

  const handleEmailPress = () => {
    Linking
      .openURL(LINKS.help)
      .catch((e) => {
        handleError(e);
        handleHelpError();
      });
  };

  const submitSettings = (values) => {
    const { user } = auth;
    setLoading(true);
    addUserSettings(user.uid, values)
      .then(() => {
        setLoading(false);
        navigation.navigate('Settings', { reset: true });
      })
      .catch((err) => {
        handleError(err);
        setLoading(false);
        setError(err.message);
      });
  };

  if (error || isEmpty(initialSettings)) {
    return <ErrorState title="We couldn't load your settings" details={error} />;
  }

  if (loading) {
    return (
      <SafeAreaView style={ss.safeArea}>
        <PageLoader details="Updating your settings…" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={ss.safeArea}>
      <View style={ss.container}>
        <Formik
          initialValues={initialSettings}
          validationSchema={validationSchema}
          onSubmit={values => submitSettings(values)}
        >
          {fProps => (
            <View>
              <StyledInput
                label="First Name"
                formProps={fProps}
                formKey="firstName"
                autoFocus
              />
              <StyledInput
                label="Last Name"
                formProps={fProps}
                formKey="lastName"
              />
              <StyledInput
                isEditing
                label="Zipcode"
                formProps={fProps}
                formKey="zipcode"
                keyboardType="number-pad"
              />
              {auth.hasFeature('NOTIFICATIONS')
              && (
                <React.Fragment>
                  <StyledInput
                    isEditing
                    label="Reminder Time"
                    formProps={fProps}
                    formKey="reminderTime"
                    placeholder="05:30 PM"
                  />
                  <Type size={10} color="medGray" weight="bold">
                  When you have notifications on, this is the time of day
                   we&apos;ll remind you to do things in your garden.
                  </Type>
                </React.Fragment>
              )
              }
              <View style={ss.saveButtonSpacing}>
                <Button color="cyan" onPress={fProps.handleSubmit}>Save</Button>
              </View>
              <Type color="medGray" align="center">
                To update your email or password,
              </Type>
              <Type color="medGray" align="center">
                shoot us an email at
              </Type>
              <Type color="cyan" onPress={handleEmailPress} hitSlop={hitSlop} selectable align="center">
                {' help@growgardenio.com'}
              </Type>
            </View>
          )}
        </Formik>
      </View>
    </SafeAreaView>
  );
};

SettingsScreen.propTypes = {
  navigation: PROPSHAPES.navigation.isRequired,
};

export default SettingsScreen;
