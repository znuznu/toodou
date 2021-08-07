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
        background: props.colorMode === 'light' ? 'white' : 'sith.1000',
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
      600: '#272728',
      700: '#222222',
      800: '#252525',
      900: '#1c1c1c',
      1000: '#18181b',
    },
  },
});

export default theme;
