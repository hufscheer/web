import { theme } from '@hcc/styles';
import { globalStyle } from '@vanilla-extract/css';

import './layers.css';
import './reset.css';

globalStyle('body', {
  fontFamily: theme.fonts.body,
  background: theme.colors.white,
  paddingBottom: 'env(safe-area-inset-bottom)',
});

globalStyle('div, span, p, a, button, ul, li', {
  fontFamily: theme.fonts.body,
});

globalStyle('.eg-flick-viewport', {
  display: 'flex',
  justifyContent: 'center',
});

globalStyle('.eg-flick-camera', {
  position: 'relative',
  display: 'flex',
});
