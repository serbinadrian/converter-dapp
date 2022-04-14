const style = {
  box: { width: '100%', display: 'inline-block' },
  flex: {
    display: 'flex'
  },
  grid: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    '& button': {
      padding: '15px 25px 13px',
      borderWidth: 2,
      fontSize: 14,
      fontWeight: 600,
      letterSpacing: 1.25,
      lineHeight: '16px',
      '&:hover': { borderWidth: 2 }
    }
  },
  blockchain: {
    marginLeft: '16px !important',
    color: '#212121',
    fontSize: 20,
    letterSpacing: -0.31,
    lineHeight: '24px'
  },
  blockchainInfo: { display: 'inline', lineHeight: 0.5, fontSize: '14px', textAlign: 'left' },
  icon: { height: 20 },
  btnsAfterConnectOrAdd: {
    '& button': { padding: '15px 20px 13px 10px !important' }
  },
  textFieldForAddress: {
    width: '100%',
    '& label': {
      color: '#212121',
      fontSize: 15
    },
    '& .MuiOutlinedInput-input': {
      padding: '14px',
      fontSize: 14
    },
    '& filedset': { borderColor: '#828282' }
  }
};

export default style;
