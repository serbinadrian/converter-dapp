import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles({
  footer: {
    padding: '11px 0',
    position: 'absolute',
    right: 0,
    left: 0,
    zIndex: 9,
    backgroundColor: 'rgba(46,6,83,0.6)',
    '@media (max-width:767px)': { padding: '21px 0 52px' }
  },
  footerWrapper: {
    width: '80%',
    margin: '0 auto',
    '@media (max-width:1279px) and (min-width:1024px)': { width: '98%' },
    '@media (max-width:1023px)': { width: '100%' }
  }
});
