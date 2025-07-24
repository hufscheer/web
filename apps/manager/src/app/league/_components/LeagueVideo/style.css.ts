import { rem } from '@hcc/styles';
import { style } from '@vanilla-extract/css';

export const VideoContainer = style({
  display: 'flex',
  flexDirection: 'column',
  marginTop: rem(12),
});

export const Title = style({
  fontWeight: 700,
  fontSize: rem(16),
  marginBottom: rem(12),
});
