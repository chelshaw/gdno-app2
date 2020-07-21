import React, { useState, useEffect } from 'react';
import {
  View, StyleSheet, ScrollView, ActivityIndicator
} from 'react-native';
import PropTypes from 'prop-types';
import { space } from '../../shared/constants';
import { Type } from '../../shared/components';
import handleError from '../../shared/data/handleError';
import WeatherBlock from './WeatherBlock';
import RelatableWeather from './RelatableWeather';
import { getDailyWeatherAndLocationForZipcode } from '../data';

const styles = StyleSheet.create({
  weather: {
    paddingVertical: space[2],
    paddingLeft: space[2],
  },
  relatableWeather: {
    margin: space[2]
  },
  loadingWrapper: {
    padding: space[4],
  },
  locationWrapper: {
    paddingHorizontal: space[2],
  }
});

const Weather = ({
  style,
  zipcode,
  loadingZipcode,
  ...passedProps,
}) => {
  const [loading, setLoading] = useState(false);
  const [weatherDays, setWeatherDays] = useState(null);
  const [location, setLocation] = useState('');
  const [error, setError] = useState(null);

  const getAndSetWeatherData = (zip) => {
    getDailyWeatherAndLocationForZipcode(zip)
      .then((data) => {
        setWeatherDays(data.dailyData);
        setLocation(data.locality);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
        handleError(err);
      });
  };

  useEffect(() => {
    if (zipcode && zipcode !== 'loading') {
      setError(null);
      getAndSetWeatherData(zipcode);
    }
  }, [zipcode]);

  if (loading || loadingZipcode) {
    return (
      <View style={styles.loadingWrapper}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.loadingWrapper}>
        <Type align="center" color="danger">{error || 'We had an issue loading your weather.'}</Type>
      </View>
    );
  }

  return (
    <>
      <View style={styles.locationWrapper}>
        <Type lineHeight={1}>
          {`Somewhere near ${location || zipcode}`}
        </Type>
      </View>
      <ScrollView horizontal bounces={false} style={[styles.weather, style]} {...passedProps}>
        {!!weatherDays && weatherDays.map(day => (
          <WeatherBlock key={day.time} {...day} />
        ))}
      </ScrollView>
      <RelatableWeather style={styles.relatableWeather} dailyData={weatherDays || []} />
    </>
  );
};

Weather.propTypes = {
  zipcode: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  loadingZipcode: PropTypes.bool,
  style: PropTypes.object,
};

Weather.defaultProps = {
  zipcode: null,
  loadingZipcode: true,
  style: {},
};

export default Weather;
