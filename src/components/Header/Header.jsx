import React from 'react';

import { Heading } from '@chakra-ui/react';

import { Link as RdrLink } from 'react-router-dom';

import PropTypes from 'prop-types';

const Header = (props) => {
  const { title } = props;

  return (
    <Heading as="h1" size="3xl" py="6" pl="6">
      <RdrLink to="/">{title}</RdrLink> 📝
    </Heading>
  );
};

Header.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Header;
