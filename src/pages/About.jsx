import React from 'react';

import { useTranslation } from 'react-i18next';

import { Link as RrdLink } from 'react-router-dom';

import { Flex, Text, Link } from '@chakra-ui/react';
import { ArrowBackIcon } from '@chakra-ui/icons';

const About = () => {
  const { t } = useTranslation();

  return (
    <Flex
      flexDir="column"
      fontSize={{ base: '18px', md: '24px' }}
      p="0 2rem"
      m="2rem auto 0"
      maxW="800px"
      textAlign="justify"
    >
      <Text margin="auto">{t('about.line-one')}</Text>

      <Text margin="2rem auto 0">
        {t('about.line-two')}{' '}
        <Link href="https://reactjs.org/" isExternal fontWeight="bold">
          React
        </Link>
        ,{' '}
        <Link
          href="https://github.com/atlassian/react-beautiful-dnd"
          isExternal
          fontWeight="bold"
        >
          react-beautiful-dnd
        </Link>
        ,{' '}
        <Link href="https://react-redux.js.org/" isExternal fontWeight="bold">
          React Redux
        </Link>{' '}
        {t('word.and')}{' '}
        <Link href="https://chakra-ui.com/" isExternal fontWeight="bold">
          Chakra
        </Link>
        .
      </Text>

      <Text mt="2rem"> {t('about.line-three')}</Text>

      <Text margin="2rem auto">
        {t('about.line-four')}{' '}
        <Link
          href="https://github.com/znuznu/toodou"
          isExternal
          fontWeight="bold"
          color="yellow.400"
        >
          {t('word.here')}
        </Link>
        .
      </Text>

      <Flex ml="auto">
        <RrdLink to="/" fontWeight="bold">
          <ArrowBackIcon fontSize={{ base: '37px', md: '50px' }} />
        </RrdLink>
      </Flex>
    </Flex>
  );
};

export default About;
