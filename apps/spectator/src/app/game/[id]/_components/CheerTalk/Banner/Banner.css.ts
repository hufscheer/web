import { rem, theme } from '@hcc/styles';
import { style, styleVariants } from '@vanilla-extract/css';

const teamNameBase = style({
  ...theme.textVariants.xs,
  color: '#000000',
  fontWeight: 500,
  maxWidth: rem(100),
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
});

export const banner = styleVariants({
  wrapper: {
    position: 'relative',
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    justifyItems: 'center',
    alignItems: 'center',
    paddingBlock: theme.spaces.xxs,
    backgroundColor: theme.colors.gray[2],
    gap: theme.spaces.default,
  },
  firstTeamName: [
    teamNameBase,
    {
      justifySelf: 'flex-end',
    },
  ],
  secondTeamName: [
    teamNameBase,
    {
      justifySelf: 'flex-start',
    },
  ],
  teamScore: {
    color: '#000000',
    fontSize: rem(36),
    fontWeight: 'bold',
  },
  gameInfoArea: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: theme.spaces.default,
  },
  gameQuarterContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: theme.spaces.xxs,
  },
  gameQuarter: {
    padding: `${theme.spaces.xxs} ${theme.spaces.xs}`,
    color: '#FFFFFF',
    fontSize: rem(12),
    fontWeight: 500,
    borderRadius: rem(8),
    backgroundColor: theme.colors.primary[3],
    whiteSpace: 'nowrap',
  },
  gameStartTime: {
    ...theme.textVariants.xs,
    color: theme.colors.gray[6],
  },
});
