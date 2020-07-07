import React from 'react';
import { SafeAreaView } from 'react-native';
import PropTypes from 'prop-types';

import BottomNav from './BottomNav';
import Media from './Media';

const ScreenWithBottomNav = ({ children, current, ...props }) => (
  <SafeAreaView style={{ flex: 1 }} {...props}>
    <Media>
      <Media.Body>
        {children}
      </Media.Body>
      <Media.Item>
        <BottomNav current={current} />
      </Media.Item>
    </Media>
  </SafeAreaView>
);

ScreenWithBottomNav.propTypes = {
  children: PropTypes.node.isRequired,
  current: PropTypes.string,
};

export default ScreenWithBottomNav;
