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
import { loadWeatherDataFromCoords, getCoordsForZip } from '../data';

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
  const [error, setError] = useState(null);

  const fetchWeatherForCoordinates = (lat, lng) => {
    loadWeatherDataFromCoords(lat, lng)
      .then((results) => {
        setWeatherDays(results.daily.data);
        setLoading(false);
      })
      .catch((err) => {
        setError('Our weather coconut is broken. Please try again later.');
        setLoading(false);
        handleError(err);
      });
  };

  const fetchWeatherFromZip = async (zip) => {
    try {
      const coords = getCoordsForZip(zip);
      fetchWeatherForCoordinates(coords.LAT, coords.LNG);
    } catch (e) {
      setError(e.message);
    }
  };

  useEffect(() => {
    if (zipcode && zipcode !== 'loading') {
      setError(null);
      fetchWeatherFromZip(zipcode);
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
