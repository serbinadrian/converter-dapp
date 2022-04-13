import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles({
  agreeTermsContainer: {
    padding: 32,
    display: 'flex',
    justifyContent: 'space-between',
    backgroundColor: '#eee',
    '& div': {
      display: 'flex',
      alignItems: 'center',
      '& p': {
        color: '#9e9e9e',
        fontSize: 13,
        fontWeight: 600,
        letterSpacing: -0.14,
        lineHeight: '16px'
      },
      '& span': {
        paddingLeft: 5,
        color: '#4086ff',
        fontSize: 13,
        fontWeight: 600,
        letterSpacing: -0.14,
        lineHeight: '16px'
      }
    }
  }
});
