import { rem, theme } from '@hcc/styles';
import { style } from '@vanilla-extract/css';

export const textRecordContainer = style({
  ...theme.layouts.rowBetween,
  paddingBlock: rem(8),
  paddingInline: rem(16),
  gap: rem(10),
});

export const textRecordCenter = style({
  ...theme.layouts.center,
});

export const textRecordDivider = style({
  flex: 1,
  height: '1px',
  width: '100%',
  backgroundColor: theme.colors.gray50,
});

export const textRecordText = style({
  color: theme.colors.gray400,
  fontSize: rem(12),
  fontWeight: 500,
  textAlign: 'center',
});
