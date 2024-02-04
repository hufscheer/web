import { globalStyle } from '@vanilla-extract/css';

import * as layers from './layers.css';

globalStyle(
  '*:where(:not(html, iframe, canvas, img, svg, video, audio):not(svg *, symbol *))',
  { '@layer': { [layers.reset]: { all: 'unset', display: 'revert' } } },
);

globalStyle('*, *::before, *::after', {
  '@layer': { [layers.reset]: { boxSizing: 'border-box' } },
});

globalStyle('html', {
  '@layer': {
    [layers.reset]: {
      MozTextSizeAdjust: 'none',
      WebkitTextSizeAdjust: 'none',
      textSizeAdjust: 'none',
    },
  },
});

globalStyle('a, button', {
  '@layer': { [layers.reset]: { cursor: 'pointer' } },
});

globalStyle('ol, ul, menu, summary', {
  '@layer': { [layers.reset]: { listStyle: 'none' } },
});

globalStyle('img', {
  '@layer': { [layers.reset]: { maxInlineSize: '100%', maxBlockSize: '100%' } },
});

globalStyle('table', {
  '@layer': { [layers.reset]: { borderCollapse: 'collapse' } },
});

globalStyle('input, textarea', {
  '@layer': {
    [layers.reset]: { WebkitUserSelect: 'auto' },
  },
});

globalStyle('textarea', {
  '@layer': { [layers.reset]: { whiteSpace: 'revert' } },
});

globalStyle('meter', {
  '@layer': {
    [layers.reset]: { WebkitAppearance: 'revert', appearance: 'revert' },
  },
});

globalStyle(':where(pre)', {
  '@layer': { [layers.reset]: { all: 'revert', boxSizing: 'border-box' } },
});

globalStyle('::placeholder', {
  '@layer': { [layers.reset]: { color: 'unset' } },
});

globalStyle(':where([hidden])', {
  '@layer': { [layers.reset]: { display: 'none' } },
});

globalStyle(':where(dialog:modal)', {
  '@layer': { [layers.reset]: { all: 'revert', boxSizing: 'border-box' } },
});

globalStyle(':where([contenteditable]:not([contenteditable="false"]))', {
  // @ts-expect-error: -webkit-line-break is a non-standard property
  '@layer': {
    [layers.reset]: {
      MozUserModify: 'read-write',
      WebkitUserModify: 'read-write',
      overflowWrap: 'break-word',
      WebkitLineBreak: 'after-white-space',
      WebkitUserSelect: 'auto',
    },
  },
});

globalStyle(':where([draggable="true"])', {
  '@layer': {
    [layers.reset]: {
      // @ts-expect-error: -webkit-user-drag is a non-standard property
      WebkitUserDrag: 'element',
    },
  },
});
