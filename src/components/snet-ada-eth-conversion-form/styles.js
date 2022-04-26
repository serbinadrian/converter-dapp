import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles({
  stepper: {
    backdropColor: 'red',
    '& .MuiStepLabel-root': {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      '& .MuiStepLabel-iconContainer': {
        '& .Mui-completed': { color: '#00C48C' }
      },
      '& .MuiStepLabel-label': {
        color: '#9B9B9B',
        fontSize: 14,
        letterSpacing: 0.15,
        lineHeight: '20px',
        textAlign: 'center'
      },
      '& .MuiSvgIcon-root': { fontSize: 28 },
      '& .MuiStepLabel-labelContainer': {
        '& .Mui-active': { color: '#212121' }
      }
    }
  },
  adaEthTokenAndValueContainer: {
    '& hr': { paddingTop: 12 }
  },
  amtSymbolAndValueContainer: {
    padding: '0 41px 0 47px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    '& p': {
      padding: 0,
      border: 'none',
      fontWeight: 600
    }
  },
  tokenAndAmtContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    '& p': {
      border: 'none',
      color: '#9B9B9B',
      fontSize: 12,
      fontWeight: 600,
      lineHeight: '12px'
    },
    '& div': {
      '& span': {
        color: '#212121',
        fontSize: 20,
        fontWeight: 600,
        lineHeight: '28px',
        '&:first-of-type': { paddingRight: 5 }
      }
    }
  },
  inputBoxAndCopyBtnContainer: {
    margin: '32px 0 0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    '& .MuiFormControl-root': {
      width: 388,
      '& label': {
        color: '#333',
        fontSize: 16,
        letterSpacing: 0.4,
        lineHeight: '16px'
      },
      '& input.Mui-disabled': {
        '-webkit-text-fill-color': '#212121',
        fontSize: 16,
        letterSpacing: 0.15,
        lineHeight: '24px',
        textOverflow: 'ellipsis'
      }
    },
    '& button': {
      padding: '6px 44px',
      fontSize: 14,
      fontWeight: 600,
      letterSpacing: 1.25
    }
  },
  btnContainer: {
    marginTop: 32,
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
  },
  successMsgIconContainer: {
    margin: '32px 0',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    '& h3': {
      color: '#9B9B9B',
      fontSize: 16,
      fontWeight: 600,
      lineHeight: '28px'
    }
  },
  receiptList: {
    padding: 0,
    marginTop: 16,
    '& li': {
      borderRadius: 4,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: '#f8f8f8',
      '& p': {
        '&:first-of-type': {
          color: '#666',
          fontSize: 16,
          lineHeight: '40px'
        },
        '& span': {
          color: '#9B9B9B',
          fontSize: 16,
          fontWeight: 600,
          letterSpacing: 0.67,
          lineHeight: '40px'
        }
      }
    }
  }
});
