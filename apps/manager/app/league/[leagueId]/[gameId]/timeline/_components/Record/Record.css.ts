import { rem, theme } from '@hcc/styles';
import { style } from '@vanilla-extract/css';

export const textRecordContainer = style({
  ...theme.layouts.rowBetween,
  paddingBlock: rem(8),
  paddingInline: rem(16),
  gap: rem(10),
});

export const textRecordCenter = style({ ...theme.layouts.center });

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

export const eventRecordContainer = style({
  ...theme.layouts.centerY,
  gap: rem(16),
  paddingBlock: rem(8),
});

export const eventRecordAwayContainer = style({
  flexDirection: 'row-reverse',
});

export const eventRecordTime = style({
  ...theme.layouts.center,
  width: rem(40),
  height: rem(40),
  color: theme.colors.gray400,
  fontSize: rem(16),
  fontWeight: 500,
  lineHeight: '100%',
  border: `1px solid ${theme.colors.gray25}`,
  borderRadius: '50%',
});

export const eventRecordLine = style({
  height: '100%',
  width: rem(3),
  backgroundColor: theme.colors.gray900,
});

export const eventDescriptionContainer = style({
  ...theme.layouts.column,
  gap: rem(4),
});

export const eventDescriptionTitle = style({
  color: theme.colors.gray900,
  fontSize: rem(14),
  fontWeight: 500,
  lineHeight: '100%',
});

export const eventDescriptionSubtitle = style({
  color: theme.colors.gray400,
  fontSize: rem(12),
  fontWeight: 500,
  lineHeight: '100%',
  letterSpacing: rem(-0.17),
});
