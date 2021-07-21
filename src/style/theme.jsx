import { extendTheme } from '@chakra-ui/react';
import { mode } from '@chakra-ui/theme-tools';

const theme = extendTheme({
  styles: {
    global: (props) => ({
      'html, body, #root': {
        height: '100%',
        overflowX: 'hidden',
      },
      '#root': {
        overflow: 'hidden',
        background:
          props.colorMode === 'light'
            ? 'linear-gradient(320deg, rgba(231,244,254,1) 4%, rgba(255,255,255,1) 100%)'
            : 'linear-gradient(320deg, rgba(181,110,146,1) 0%, rgba(80,46,158,1) 68%, rgba(26,61,86,1) 100%)',
      },
      body: {
        display: 'flex',
        flexDir: 'column',
        color: mode('#222222', 'white')(props),
      },
      '::selection': {
        'background-color': mode('#222222', 'white')(props),
        color: mode('white', '#222222')(props),
      },
    }),
  },
  colors: {
    sith: {
      700: '#222222',
      800: '#252525',
      900: '#1c1c1c',
    },
  },
});

export default theme;
