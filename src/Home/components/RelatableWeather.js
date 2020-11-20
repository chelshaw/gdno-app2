import React, { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';

import { COLORS, space } from '../../shared/constants';
import { Type } from '../../shared/components';

const styles = StyleSheet.create({
  relatableWeather: {
    paddingHorizontal: space[2],
    paddingVertical: space[3],
    backgroundColor: COLORS.blueTint,
  }
});

const RelatableWeather = ({
  style,
  dailyData = [],
  ...passedProps
}) => {
  const content = useMemo(() => {
    const concerns = {
      // TODO: These values are in Fahrenheit for now
      // and should not be magic strings
      hot: d => d.temperatureMax >= 95,
      cold: d => d.temperatureMin <= 35,
      precip: d => d.precipProbability >= 0.4
    };
    const firstAlert = dailyData.slice(0, 3).find(d => concerns.hot(d)
        || concerns.cold(d)
        || concerns.precip(d));

    if (!firstAlert) {
      return {
        icon: '🌤',
        body: 'It\'s a great day to be a plant! The weather is currently pretty darn good for lots of different herbs. And that means pretty good for you too. Step outside, smell some plants, tend to your garden. It loves you.'
      };
    }
    if (concerns.hot(firstAlert)) {
      return {
        icon: '☀️',
        body: 'It\'s mighty hot out there this week! Be sure to water regularly and consider a bit more shade. That goes for you too!',
      };
    }
    if (concerns.cold(firstAlert)) {
      return {
        icon: '❄️',
        body: 'Looks like it\'s pretty cold outside! Most plants should be covered or brought inside while it freezes, but some actually thrive in it. Check your plants\' care guides for guidance.'
      };
    }
    if (concerns.precip(firstAlert)) {
      return {
        icon: '🌧',
        body: 'Looks like it may rain soon. Put that rain water to work and let your plants splish splash. Some may like less water though, so check your care guides for specifics about what your plant likes, per always.'
      };
    }
    return null;
  }, [dailyData]);

  if (!dailyData || dailyData.length === 0 || !content) {
    return null;
  }

  return (
    <View style={[styles.relatableWeather, style]} {...passedProps}>
      <Type weight="bold" lineHeight={2}>
        {`${content.icon} What's it to me?`}
      </Type>
      <Type lineHeight={1.8}>{content.body}</Type>
    </View>
  );
};

RelatableWeather.propTypes = {
  dailyData: PropTypes.arrayOf(PropTypes.object),
  style: PropTypes.object,
};

export default RelatableWeather;
