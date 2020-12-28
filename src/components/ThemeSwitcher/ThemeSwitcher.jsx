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
      ml="6"
    />
  );
};

export default ThemeSwitcher;
