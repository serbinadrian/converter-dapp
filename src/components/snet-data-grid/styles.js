import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles({
  transactionHistoryTable: { padding: '30px 22px' },
  colName: {
    opacity: 0.53,
    color: '#9B9B9B',
    fontSize: 14,
    fontWeight: 600,
    letterSpacing: 0,
    lineHeight: '18px'
  },
  transactionDataRow: {
    borderTop: '1px solid #f5f7f8'
  },
  expandedData: {
    padding: 24,
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#f1f1f1'
  },
  expandedDataWrapper: {
    width: '100%',
    padding: '7px 20px 7px 36px',
    borderTop: '1px solid #f5f7f8',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff'
  }
});
