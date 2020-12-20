import React from 'react';

import { Heading } from '@chakra-ui/react';

import PropTypes from 'prop-types';

const Header = (props) => {
  const { title } = props;

  return (
    <Heading as="h1" size="3xl" textAlign={'end'} margin={[25, 0, 0, 25]}>
      {title}
    </Heading>
  );
};

Header.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Header;
