import './layers.css';
import './reset.css';

import { globalFontFace, globalStyle } from '@vanilla-extract/css';

import { theme } from './theme.css';

globalStyle('body', {
  fontFamily: theme.fonts.body,
  background: theme.colors.background.normal,
  paddingBottom: 'env(safe-area-inset-bottom)',
});

globalFontFace('Pretendard', {
  src: 'url("https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css")',
});

globalFontFace('Pretendard Variable', {
  src: 'url("https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css")',
});
