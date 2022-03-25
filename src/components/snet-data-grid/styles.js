import { makeStyles } from '@mui/styles';
import { transactionStatus } from '../../pages/Transactions/transactionStatus';

export const useStyles = makeStyles({
  columnsContainer: {
    marginTop: 48,
    '& > div': { paddingTop: 0 },
    '& p': {
      color: '#9b9b9b',
      fontSize: 14,
      fontWeight: 600,
      opacity: 0.53
    }
  },
  transactionHistoryTable: { padding: '0 16px' },
  transactionHistoryHeader: {
    borderBottom: '1px solid #f5f7f8'
  },
  refreshDataContainer: {
    padding: '11px 0',
    margin: 0,
    '& button': {
      color: '#4086FF',
      fontSize: 14,
      lineHeight: '16px',
      textTransform: 'capitalize',
      '& svg': { fontSize: 18 }
    }
  },
  colName: {
    opacity: 0.53,
    color: '#9B9B9B',
    fontSize: 14,
    fontWeight: 600,
    letterSpacing: 0,
    lineHeight: '18px'
  },
  transactionDataRow: {
    padding: '8px 17px 8px 15px',
    borderTop: '1px solid #f5f7f8',
    marginTop: 10,
    '& > div': {
      padding: `0 !important`,
      display: 'flex',
      alignItems: 'center'
    },
    '& p': { fontSize: 14 },
    '& span': {
      textOverflow: 'ellipsis',
      overflow: 'hidden',
      display: 'inherit'
    }
  },
  statusData: {
    display: 'flex',
    justifyContent: 'center',
    '& button': {
      border: '3px solid #4086ff',
      color: '#4086FF',
      fontSize: 14,
      fontWeight: 600,
      padding: '8px 25px',
      letterSpacing: 1.25,
      lineHeight: '16px'
    },
    '& svg': {
      marginRight: 4,
      fontSize: 16
    }
  },
  statusValueContainer: {
    [`& p[data-status-type="${transactionStatus.ACTION_REQUIRED}"]`]: { color: 'F18D5A' },
    [`& p[data-status-type="${transactionStatus.PROCESSING}"]`]: { color: '#2196F3' },
    [`& p[data-status-type="${transactionStatus.FAILED}"]`]: { color: '#D0021B' },
    [`& p[data-status-type="${transactionStatus.SUCCESS}"]`]: { color: '#00C48C' }
  },
  expandArrowContainer: {
    '& div': {
      padding: 0,
      '& button': {
        padding: 0,
        '& svg': { fontSize: 24 }
      }
    }
  },
  expandedData: {
    padding: 24,
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#f1f1f1'
  },
  expandedDataWrapper: {
    width: '100%',
    borderTop: '1px solid #f5f7f8',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  expandedDataCol: {
    padding: '26px 20px 15px 60px',
    backgroundColor: '#fff',
    '& div p': {
      color: '#9B9B9B',
      fontSize: 14,
      letterSpacing: 0.17
    }
  },
  expandedDataRows: {
    padding: '7px 20px 7px 60px',
    background: '#fff',
    marginTop: 2
  },
  detailsData: {
    '& a': {
      textOverflow: 'ellipsis',
      overflow: 'hidden',
      display: 'inherit',
      '& span': { color: '#4086FF' }
    }
  },
  alignRight: {
    display: 'inline !important',
    textAlign: 'right'
  },
  // Pagination styles
  paginationContainer: {
    marginTop: 64,
    '& nav': {
      '& ul li': {
        '&:first-of-type button': { marginRight: 14 },
        '&:last-of-type button': { marginLeft: 14 },
        '& button': {
          minWidth: 24,
          height: 24,
          padding: 0,
          margin: 0,
          fontSize: 14,
          '& svg': { fontSize: 22 }
        }
      }
    }
  },
  pageCountSection: { paddingRight: 22 },
  itemPerPageTxt: {
    paddingRight: 15,
    color: '#9B9B9B',
    fontSize: 14,
    lineHeight: '18px',
    textAlign: 'right'
  },
  pageListformControl: {
    width: 73,
    marginRight: 12,
    '& div': {
      '& div': {
        padding: '2px 13px',
        fontSize: 16
      },
      '& svg': { fontSize: 22 }
    },
    '& fieldset': {
      top: 0,
      '& legend': { display: 'none' }
    }
  }
});
