import { createGlobalTheme } from '@vanilla-extract/css';

import { rem } from './pxto';

export const theme = createGlobalTheme(':root', {
  colors: {
    primary: {
      '1': '#ECEEFF',
      '2': '#9AA4FF',
      '3': '#4354F0',
      '4': '#2735BD',
      '5': '#121E8A',
      '6': '#050D57',
      normal: 'var(--hcc-colors-primary)',
      light: 'var(--hcc-colors-primary-light)',
    },
    indicatorBlue: {
      '1': '#EFF6FF',
      '2': '#BEDDFF',
      '3': '#007AFF',
      '4': '#5DAAFF',
      '5': '#226BBB',
      '6': '#003977',
    },
    indicatorRed: {
      '1': '#FFECEB',
      '2': '#FF9993',
      '3': '#FF453A',
      '4': '#CC281F',
      '5': '#99130B',
      '6': '#660600',
    },
    secondary: {
      '1': '#F9FBFD',
      '2': '#D3E2F6',
      '3': '#A9B9CD',
      '4': '#8291A5',
      '5': '#5E6B7C',
      '6': '#3C4653',
      normal: 'var(--hcc-colors-secondary)',
      light: 'var(--hcc-colors-secondary-light)',
    },
    gray: {
      '1': '#F7F8F9',
      '2': '#E9EBEE',
      '3': '#C5C8CE',
      '4': '#646F7C',
      '5': '#374553',
      '6': '#28323C',
    },
    background: {
      secondary: '#F7F8F9',
      light: '#D5D5DC',
    },
    black: 'var(--hcc-colors-black)',
    white: 'var(--hcc-colors-white)',

    // gray
    gray25: 'var(--hcc-colors-gray-25)',
    gray50: 'var(--hcc-colors-gray-50)',
    gray100: 'var(--hcc-colors-gray-100)',
    gray200: 'var(--hcc-colors-gray-200)',
    gray300: 'var(--hcc-colors-gray-300)',
    gray400: 'var(--hcc-colors-gray-400)',
    gray500: 'var(--hcc-colors-gray-500)',
    gray700: 'var(--hcc-colors-gray-700)',
    gray800: 'var(--hcc-colors-gray-800)',
    gray900: 'var(--hcc-colors-gray-900)',

    // blue
    blue200: 'var(--hcc-colors-blue-200)',
    blue600: 'var(--hcc-colors-blue-600)',

    // red
    red200: 'var(--hcc-colors-red-200)',
    red600: 'var(--hcc-colors-red-600)',

    // orange
    orange600: 'var(--hcc-colors-orange-600)',

    // green
    green600: 'var(--hcc-colors-green-600)',

    // alert
    alert: {
      normal: 'var(--hcc-colors-alert)',
      light: 'var(--hcc-colors-alert-light)',
    },

    // other
    border: 'var(--hcc-colors-border)',
    tip: 'var(--hcc-colors-tip)',
  },

  shadows: {
    sm: '0px 3px 8px -1px rgba(50, 50, 71, 0.05), 0px 0px 1px 0px rgba(12, 26, 75, 0.24)',
    base: '0px 4px 20px -2px rgba(50, 50, 71, 0.08), 0px 0px 1px 0px rgba(12, 26, 75, 0.10)',
    md: '0px 10px 16px 0px rgba(20, 37, 63, 0.06), 0px 0px 1px 0px rgba(12, 26, 75, 0.10)',
    lg: '0px 20px 24px 0px rgba(20, 37, 63, 0.06), 0px 0px 1px 0px rgba(12, 26, 75, 0.10)',
    xl: 'drop-shadow(0px 30px 40px rgba(20, 37, 63, 0.08)) drop-shadow(0px 0px 1px rgba(12, 26, 75, 0.10))',
  },

  fonts: {
    body: `"Pretendard Variable", Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto, "Helvetica Neue", "Segoe UI", "Apple SD Gothic Neo", "Noto Sans KR", "Malgun Gothic", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", sans-serif`,
  },

  spaces: {
    xxs: rem(4),
    xs: rem(8),
    sm: rem(12),
    default: rem(16),
    lg: rem(24),
    xl: rem(32),
  },

  textVariants: {
    heading1: {
      fontSize: rem(40),
      fontWeight: '800',
      lineHeight: 'normal',
    },
    heading2: {
      fontSize: rem(32),
      fontWeight: '800',
      lineHeight: 'normal',
    },
    heading3: {
      fontSize: rem(24),
      fontWeight: '800',
      lineHeight: 'normal',
    },
    lg: {
      fontSize: rem(20),
      fontWeight: '800',
      lineHeight: 'normal',
    },
    default: {
      fontSize: rem(16),
      fontWeight: '500',
      lineHeight: 'normal',
    },
    sm: {
      fontSize: rem(14),
      fontWeight: '400',
      lineHeight: 'normal',
    },
    xs: {
      fontSize: rem(12),
      fontWeight: '400',
      lineHeight: 'normal',
    },
    xxs: {
      fontSize: rem(10),
      fontWeight: '400',
      lineHeight: 'normal',
    },
  },

  sizes: {
    appWidth: rem(480),
    appInlinePadding: rem(21),
  },

  layouts: {
    center: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    centerX: {
      display: 'flex',
      justifyContent: 'center',
    },
    centerY: {
      display: 'flex',
      alignItems: 'center',
    },
    rowBetween: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    column: {
      display: 'flex',
      flexDirection: 'column',
    },
    columnCenter: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    },
    columnCenterX: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    columnCenterY: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
    },
  },

  zIndices: {
    hide: '-1',
    auto: 'auto',
    base: '0',
    tab: '10',
    header: '100',
    navigation: '200',
    dropdown: '1000',
    sticky: '1100',
    banner: '1200',
    overlay: '1300',
    modal: '1400',
    popover: '1500',
    toast: '1700',
    tooltip: '1800',
  },
});
