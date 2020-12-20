import React from 'react';

import { Heading } from '@chakra-ui/react';

import PropTypes from 'prop-types';

const Title = (props) => {
  const { content } = props;

  return (
    <Heading as="h1" size="3xl" textAlign={'end'} margin={[25, 0, 0, 25]}>
      {content}
    </Heading>
  );
};

Title.propTypes = {
  content: PropTypes.string.isRequired,
};

export default Title;
