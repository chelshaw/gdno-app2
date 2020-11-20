import React from 'react';
import PropTypes from 'prop-types';
import Markdown from 'react-native-simple-markdown';
import { COLORS } from '../constants';

export const markdownStyles = {
  heading1: {
    fontSize: 36,
    fontWeight: 'bold',
    lineHeight: 1.1,
  },
  heading2: {
    fontSize: 24,
  },
  heading3: {
    fontSize: 18,
    fontWeight: '200',
  },
  link: {
    color: COLORS.cyan,
  },
  mailTo: {
    color: COLORS.cyan,
  },
  text: {
    color: COLORS.gray,
    fontSize: 16,
    fontWeight: '200'
  }
};

const MyMarkdown = ({
  styles,
  children,
  ...rest
}) => (
  <Markdown styles={{ ...markdownStyles, ...styles }} {...rest}>
    {children}
  </Markdown>
);

MyMarkdown.propTypes = {
  styles: PropTypes.object,
  children: PropTypes.node,
};

MyMarkdown.defaultProps = {
  styles: {},
  children: '',
};
export default MyMarkdown;
