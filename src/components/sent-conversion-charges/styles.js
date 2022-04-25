import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles({
  conversionChargesContainer: {
    paddingTop: 12,
    display: 'flex',
    alignItems: 'center',
    '& svg': {
      paddingRight: '4px',
      color: '#9b9b9b',
      cursor: 'pointer',
      fontSize: 22
    },
    '& p': {
      padding: 0,
      border: 'none',
      color: '#212121',
      fontSize: 14,
      letterSpacing: -0.22,
      lineHeight: '18px'
    }
  }
});
