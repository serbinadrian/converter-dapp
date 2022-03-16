import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles({
  footer: {
    padding: '30px 0 53px',
    position: 'absolute',
    right: 0,
    left: 0,
    zIndex: 9,
    backgroundColor: '#29113F',
    '@media (max-width:767px)': { padding: '21px 0 52px' }
  },
  footerWrapper: {
    width: '80%',
    margin: '0 auto',
    '& > p': {
      width: '100%',
      paddingTop: 19.5,
      color: '#999',
      fontSize: 14,
      letterSpacing: -0.1,
      lineHeight: '21px',
      textAlign: 'center',
      '&::before': {
        content: '""',
        width: '100%',
        height: 1,
        margin: '27.5px 0 21px',
        display: 'block',
        backgroundColor: '#DBE3E7',
        opacity: 0.5
      }
    },
    '@media (max-width:1279px) and (min-width:1020px)': { width: '98%' },
    '@media (max-width:1023px)': { width: '100%' }
  }
});
