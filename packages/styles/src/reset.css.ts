import { globalStyle } from '@vanilla-extract/css';

globalStyle('*', {
  margin: 0,
  padding: 0,
  font: 'inherit',
  color: 'inherit',
});

globalStyle('*, :after, :before', {
  boxSizing: 'border-box',
});

globalStyle(':root', {
  WebkitTapHighlightColor: 'transparent',
  WebkitTextSizeAdjust: '100%',
  textSizeAdjust: '100%',
  cursor: 'default',
  lineHeight: 1.5,
  overflowWrap: 'break-word',
  MozTabSize: 4,
  tabSize: 4,
});

globalStyle('html, body', {
  height: '100%',
});

globalStyle('img, picture, video, canvas, svg', {
  display: 'block',
  maxWidth: '100%',
});

globalStyle('button', {
  background: 'none',
  border: 0,
  cursor: 'pointer',
});

globalStyle('a, abbr', {
  textDecoration: 'none',
});

globalStyle('table', {
  borderCollapse: 'collapse',
  borderSpacing: 0,
});

globalStyle('ul', {
  listStyle: 'none',
  padding: 0,
  margin: 0,
});
