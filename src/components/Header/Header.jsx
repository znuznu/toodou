import React from 'react';

import { Twemoji } from 'react-emoji-render';

import { Heading } from '@chakra-ui/react';

import { Link as RdrLink } from 'react-router-dom';

import PropTypes from 'prop-types';

const Header = (props) => {
  const { title } = props;

  return (
    <Heading as="h1" size="3xl" py="6" pl="6" display="flex">
      <RdrLink to="/">{title}</RdrLink>
      <Twemoji text=":memo:" />
    </Heading>
  );
};

Header.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Header;
