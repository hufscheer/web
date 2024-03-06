import './layers.css';
import './reset.css';

import { globalStyle } from '@vanilla-extract/css';

import { theme } from './theme.css';

globalStyle('body', {
  fontFamily: theme.fonts.body,
  background: theme.colors.background.normal,
  paddingBottom: 'env(safe-area-inset-bottom)',
});

globalStyle('div, span, p, a, button, ul, li', {
  fontFamily: theme.fonts.body,
});
