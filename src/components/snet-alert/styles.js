import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles({
  alertBox: {
    borderRadius: 4,
    marginBottom: 24,
    alignItems: 'center',
    justifyContent: 'flex-start !important',
    border: '1.5px solid #E67381',
    backgroundColor: '#FDE5E8',
    '& p': {
      margin: 0,
      color: '#000',
      fontSize: 14,
      letterSpacing: -0.01,
      lineHeight: '18px'
    },
    '& a': {
      paddingLeft: 10,
      '&:hover': { textDecoration: 'underline' }
    }
  }
});
