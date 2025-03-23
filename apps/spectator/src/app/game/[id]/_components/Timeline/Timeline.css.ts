import { rem, theme } from '@hcc/styles';
import { style, styleVariants } from '@vanilla-extract/css';

export const root = style({
  position: 'relative',

  display: 'flex',
  flexDirection: 'column',
  gap: theme.spaces.default,

  marginTop: theme.spaces.default,
});

// Timeline Separator
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

export const summaryRecord = style({
  paddingTop: 0,
});

// Event Record
export const eventRecordContainer = style({
  position: 'relative',
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

const sectionBarStyle = style({
  position: 'absolute',
  width: rem(3),
  backgroundColor: theme.colors.gray900,
  height: '100%',

  top: 0,
});

export const sectionBar = {
  home: [
    sectionBarStyle,
    {
      right: 0,
    },
  ],
  away: [
    sectionBarStyle,
    {
      left: 0,
    },
  ],
};

export const errorFallback = styleVariants({
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: theme.spaces.xs,

    minHeight: rem(180),
    paddingInline: theme.spaces.default,
  },
  message: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: theme.spaces.sm,

    color: theme.colors.gray[5],
    ...theme.textVariants.sm,

    fontWeight: 500,
    textAlign: 'center',
  },
  retry: {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spaces.xs,

    ...theme.textVariants.sm,
    color: theme.colors.gray[5],
    fontWeight: 500,
  },
});
