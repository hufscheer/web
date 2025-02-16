import './reset.css';

import { globalStyle } from '@vanilla-extract/css';

import { theme } from './theme.css';

globalStyle('body', {
  paddingBottom: 'env(safe-area-inset-bottom)',
  backgroundColor: theme.colors.gray25,
  overflowX: 'hidden',
  overflowY: 'scroll',
  scrollbarGutter: 'stable',
});

globalStyle('.eg-flick-viewport', {
  display: 'flex',
  justifyContent: 'center',
});

globalStyle('.eg-flick-camera', {
  position: 'relative',
  display: 'flex',
});

globalStyle('ul', {
  listStyle: 'none',
  padding: 0,
  margin: 0,
});
