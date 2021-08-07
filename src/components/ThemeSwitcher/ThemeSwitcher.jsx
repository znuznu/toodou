import React from 'react';

import { IconButton, Tooltip, useColorMode } from '@chakra-ui/react';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';

const ThemeSwitcher = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <IconButton
      aria-label="Switch theme"
      icon={
        <Tooltip label="Switch theme" openDelay={500}>
          {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
        </Tooltip>
      }
      onClick={toggleColorMode}
      mx="6"
      size="36"
      variant="unstyled"
    />
  );
};

export default ThemeSwitcher;
