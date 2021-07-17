import React from 'react';

import { Heading } from '@chakra-ui/react';

import PropTypes from 'prop-types';

const Header = (props) => {
  const { title } = props;

  return (
    <Heading as="h1" size="3xl" textAlign={'end'} py="6" pr="6">
      {title} 📝
    </Heading>
  );
};

Header.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Header;
