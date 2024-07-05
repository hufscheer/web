import { rem, theme } from '@hcc/styles';
import { globalStyle } from '@vanilla-extract/css';

const cellSize = 36;
const activeColor = '#141B21';
const neighboringColor = '#c1c5ca';
const weekendColor = '#FC5555';
const weekendNeighboringColor = '#fc555580';
const backgroundColor = '#FFFFFF';
const hoverBackgroundColor = '#e6e6e6';
const neighboringBackgroundColor = '#ebecee';

globalStyle('.react-calendar--doubleView', {
  width: rem(cellSize * 14),
});

globalStyle(
  '.react-calendar, .react-calendar *, .react-calendar *:before, .react-calendar *:after',
  {
    WebkitBoxSizing: 'border-box',
    boxSizing: 'border-box',
    MozBoxSizing: 'border-box',
  },
);

globalStyle('.react-calendar button', {
  margin: 0,
  border: 0,
  outline: 'none',
});

globalStyle('.react-calendar button:enabled:hover', {
  cursor: 'pointer',
});

globalStyle('.react-calendar__navigation button:disabled', {
  backgroundColor: theme.colors.black50,
});

globalStyle('.react-calendar__month-view__weekdays', {
  textAlign: 'center',
  textTransform: 'uppercase',
  font: 'inherit',
  fontSize: rem(13),
  width: rem(cellSize * 7),
  padding: 0,
});

globalStyle('.react-calendar__tile:disabled', {
  backgroundColor: theme.colors.black100,
  color: theme.colors.white,
});

globalStyle('.react-calendar', {
  width: 'min-content',
  backgroundColor: theme.colors.white,
  padding: rem(12),
  border: 'none',
});

globalStyle('.react-calendar__navigation', {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',

  width: rem(cellSize * 7),
  height: 'fit-content',
  marginBottom: rem(12),
});

globalStyle(
  '.react-calendar__navigation__label, .react-calendar__navigation button:disabled',
  {
    textAlign: 'center',
    backgroundColor: 'transparent',
    pointerEvents: 'none',
  },
);

globalStyle('.react-calendar__navigation__arrow', {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',

  width: rem(28),
  height: rem(28),
  minWidth: 0,
  borderRadius: 4,

  transition: 'background-color 0.1s ease-in-out',
});

globalStyle('.react-calendar__navigation button', {
  minWidth: 0,
});

globalStyle('.react-calendar__viewContainer', {
  width: rem(cellSize * 7),
});

globalStyle('.react-calendar__month-view__weekdays', {
  width: rem(cellSize * 7),
  padding: 0,
});

globalStyle('.react-calendar__month-view__weekdays__weekday', {
  width: cellSize,
  padding: 0,
});

globalStyle('.react-calendar__month-view__days', {
  width: rem(cellSize * 7),
  padding: 0,
  rowGap: rem(4),
  marginTop: rem(4),
});

globalStyle('.react-calendar__tile', {
  width: cellSize,
  height: cellSize,
  padding: 0,
  border: 'none',
  backgroundColor: 'transparent',
  color: activeColor,
  cursor: 'pointer',
  flex: '0 0 auto ',
  transition: 'background-color 0.1s ease-in-out, color 0.1s ease-in-out',
  borderRadius: 4,
  textAlign: 'center',
  lineHeight: 1,
  fontSize: rem(13),
});

globalStyle(
  '.react-calendar__tile:enabled:hover, .react-calendar__tile:enabled:focus',
  {
    backgroundColor: theme.colors.black50,
  },
);

globalStyle('.react-calendar__month-view__weekNumbers', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  font: 'inherit',
  fontSize: rem(13),
});

globalStyle(
  '.react-calendar__tile--now, .react-calendar__tile--now:enabled:hover, .react-calendar__tile--now:enabled:focus',
  {
    backgroundColor: hoverBackgroundColor,
    color: activeColor,
  },
);

globalStyle(
  '.react-calendar__tile--active:enabled:hover, .react-calendar__tile--active:enabled:focus',
  {
    backgroundColor: activeColor,
    color: backgroundColor,
  },
);

globalStyle('.react-calendar__tile--active', {
  backgroundColor: activeColor,
  color: backgroundColor,
});

globalStyle('.react-calendar__month-view__days__day--neighboringMonth', {
  color: neighboringColor,
});

globalStyle('.react-calendar__month-view__days__day--neighboringMonth', {
  color: neighboringColor,
});

globalStyle(
  '.react-calendar__month-view__days__day--neighboringMonth.react-calendar__tile:enabled:hover, .react-calendar__month-view__days__day--neighboringMonth.react-calendar__tile:enabled:focus',
  {
    backgroundColor: neighboringBackgroundColor,
  },
);

globalStyle(
  '.react-calendar__month-view__days__day--weekend, .react-calendar__month-view__weekdays__weekday--weekend',
  {
    color: weekendColor,
  },
);

globalStyle(
  '.react-calendar__month-view__days__day--weekend.react-calendar__month-view__days__day--neighboringMonth',
  {
    color: weekendNeighboringColor,
  },
);
