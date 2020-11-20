import React, { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';

import { Type } from '../../shared/components';
import { COLORS, space } from '../../shared/constants';

const styles = StyleSheet.create({
  weatherBlock: {
    width: 120,
    paddingHorizontal: space[2],
    borderRightWidth: 1,
    borderRightColor: COLORS.lightGray,
  }
});

const getIcon = (icon) => {
  switch (icon) {
    case 'clear-day':
    case 'clear-night':
      return '☀️';
    case 'rain':
      return '🌧';
    case 'snow':
    case 'sleet':
      return '🌨';
    case 'wind':
      return '💨';
    case 'fog':
      return '🌫';
    case 'partly-cloudy-day':
    case 'partly-cloudy-night':
      return '⛅️';
    default:
      return '☁️';
  }
};

const getWeekday = (index) => {
  const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  return weekdays[index];
};

const WeatherBlock = ({
  style,
  time,
  icon,
  temperatureMax,
  temperatureMin,
  precipProbability,
  ...passedProps
}) => {
  const weatherIcon = useMemo(() => getIcon(icon), [icon]);

  return (
    <View style={[styles.weatherBlock, style]} {...passedProps}>
      <Type align="center">{getWeekday(new Date(time * 1000).getDay())}</Type>
      <Type size={40} lineHeight={1.1} align="center" accessibilityLabel={`weather: ${icon}`}>{weatherIcon}</Type>
      <Type align="center" size={20} weight="bold" color="gray">
        {`${Math.round(temperatureMax)}°`}
      </Type>
      <Type align="center" size={14} weight="bold" color="medGray">
        {`${Math.round(temperatureMin)}°`}
      </Type>
    </View>
  );
};
WeatherBlock.propTypes = {
  icon: PropTypes.oneOf([
    'clear-day',
    'clear-night',
    'rain',
    'snow',
    'sleet',
    'wind',
    'fog',
    'cloudy',
    'partly-cloudy-day',
    'partly-cloudy-night',
  ]),
  style: PropTypes.object,
  time: PropTypes.number,
  temperatureMax: PropTypes.number,
  temperatureMin: PropTypes.number,
  precipProbability: PropTypes.number,
};

export default WeatherBlock;
