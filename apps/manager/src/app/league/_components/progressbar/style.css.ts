import { style } from '@vanilla-extract/css';

export const progressBar = style({
  display: 'flex',
  flexDirection: 'row',
});

export const progressBarItem = style({
  display: 'flex',
  flexDirection: 'row',
  marginRight: '5px',
  marginLeft: '5px',
  marginBottom: '10px',
  textAlign: 'center',
});

export const progressBarItemCircle = style({
  borderRadius: '50%',
  backgroundColor: '#ccc',
  width: '23.92px',
  height: '23.92px',
  color: 'white',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginRight: '10px',
  marginLeft: '10px',
});

export const active = style({
  background: '#007AFF',
  color: '#fff',
  fontSize: '14px',
  fontWeight: 'bold',
});

export const completed = style({
  background: '#ccc',
  color: '#fff',
  fontSize: '14px',
  fontWeight: 'bold',
});

export const current = style({
  background: '#007AFF',
  color: '#fff',
});
