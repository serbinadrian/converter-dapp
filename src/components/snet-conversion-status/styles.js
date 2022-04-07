import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles({
  ethToAdaTransactionReceiptContainer: {
    '& h2': {
      background: 'red'
    }
  },
  progressSection: {
    paddingBottom: 32,
    display: 'flex',
    flexDirection: 'column',
    '& svg': {
      color: '#00C48C',
      fontSize: 48
    },
    '& p': {
      color: '#9B9B9B',
      fontSize: 16,
      fontWeight: 600,
      lineHeight: '28px',
      textAlign: 'center'
    }
  },
  transactionReceiptContent: {
    '& p': {
      margin: 0,
      color: '#666',
      fontSize: 16,
      fontWeight: 'bold',
      lineHeight: '17px'
    }
  },
  transactionDetails: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 4,
    backgroundColor: '#F8F8F8',
    borderBottom: '1px solid #D8D8D8',
    padding: '21px 22px',
    margin: '32px 0'
  },
  transactionReceiptActions: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    '& button': {
      padding: '10px 24px',
      fontSize: 14,
      fontWeight: 600,
      letterSpacing: 1.25,
      lineHeight: '16px',
      '&:first-of-type': { marginRight: 32 }
    }
  }
});
