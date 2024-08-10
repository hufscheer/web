import './layers.css';
import './reset.css';

import { globalStyle } from '@vanilla-extract/css';

import { theme } from './theme.css';

globalStyle('body', {
  background: theme.colors.black25,
  paddingBottom: 'env(safe-area-inset-bottom)',
  overflowX: 'hidden',
});

globalStyle('.eg-flick-viewport', {
  display: 'flex',
  justifyContent: 'center',
});

globalStyle('.eg-flick-camera', {
  position: 'relative',
  display: 'flex',
});
