import { rem, theme } from '@hcc/styles';
import { styleVariants } from '@vanilla-extract/css';

export const banner = styleVariants({
  wrapper: {
    position: 'relative',
    display: 'flex',
    flexShrink: 0,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBlock: theme.spaces.xxs,
    backgroundColor: theme.colors.gray[2],
    gap: theme.spaces.default,
  },
  teamName: {
    ...theme.textVariants.xs,
    color: '#000000',
    fontWeight: 500,
  },
  teamScore: {
    color: '#000000',
    fontSize: rem(36),
    fontWeight: 'bold',
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
  },
  gameStartTime: {
    ...theme.textVariants.xs,
    color: theme.colors.gray[6],
  },
});
