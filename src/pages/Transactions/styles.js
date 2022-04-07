import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles({
  transactionHistoryContainer: {
    paddingBottom: 52,
    borderRadius: 4,
    backgroundColor: '#FFF',
    boxShadow: '0 1px 1px 0 rgba(0,0,0,0.07), 0 2px 1px -1px rgba(0,0,0,0.07), 0 1px 3px 0 rgba(0,0,0,0.1)',
    '& > p': {
      padding: '0 22px',
      borderBottom: '1px solid #f5f7f8',
      color: '#212121',
      fontSize: 20,
      letterSpacing: 0,
      lineHeight: '50px'
    }
  },
  EmptyTransactionHistoryContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 100,
    display: 'flex',
    flexDirection: 'column'
  }
});
