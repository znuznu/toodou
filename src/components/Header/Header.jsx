import React from 'react';

import ThemeSwitcher from '../ThemeSwitcher/ThemeSwitcher';
import { Twemoji } from 'react-emoji-render';

import { Flex, Heading } from '@chakra-ui/react';

import { Link as RdrLink } from 'react-router-dom';

import PropTypes from 'prop-types';

const Header = (props) => {
  const { title } = props;

  return (
    <Heading
      as="h1"
      size="3xl"
      py="6"
      pl="6"
      display="flex"
      justifyContent="space-between"
    >
      <Flex>
        <RdrLink to="/">{title}</RdrLink>
        <Twemoji text=":memo:" />
      </Flex>
      <ThemeSwitcher ml="auto" />
    </Heading>
  );
};

Header.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Header;
