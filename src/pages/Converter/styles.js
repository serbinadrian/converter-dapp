import colorCodes from '../../assets/theme/colorCodes';

const styles = {
  conersionBox: {
    width: 640,
    borderRadius: '4px 4px 0 0',
    position: 'absolute',
    background: '#fff',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%,-50%)',
    '@media(max-width:900px)': { width: '90%' }
  },
  conersionModalHeader: {
    borderBottom: '1px solid #F5F7F8',
    padding: '0 22px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    '& h2': {
      color: '#212121',
      fontSize: 20,
      lineHeight: '50px',
      '@media(max-width:600px)': { fontSize: 16 }
    },
    '& svg': {
      cursor: 'pointer',
      fontSize: 24
    }
  },
  conversionModalBody: {
    '& > p': {
      padding: '32px 20px',
      color: '#212121',
      fontSize: 14,
      letterSpacing: 0.13,
      lineHeight: '18px'
    }
  },
  processingLoaderContainer: {
    paddingTop: `32px !important`,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    '& > p': {
      paddingTop: '10px',
      color: '#9B9B9B',
      fontSize: 16,
      fontWeight: 600,
      lineHeight: '28px',
      textAlign: 'center'
    }
  },
  conersionModalActions: {
    paddingBottom: `40px !important`,
    textAlign: 'center',
    '& button': {
      padding: '10px 24px',
      cursor: 'pointer',
      fontSize: 14,
      fontWeight: 600,
      letterSpacing: 1.25,
      lineHeight: '16px',
      textAlign: 'center',
      '&:first-of-type': {
        marginRight: `32px !important`,
        color: '#4086FF'
      }
    }
  },
  homePageContainer: {
    display: 'flex',
    justifyContent: 'center'
  },
  pendingTxnAlertContainer: {
    '& > div': {
      display: 'flex',
      justifyContent: 'center',
      '& > div': {
        '& div': {
          display: 'flex',
          alignItems: 'center'
        }
      }
    }
  },
  welcome: {
    color: '#000',
    fontSize: 32,
    fontWeight: 600,
    lineHeight: '48px',
    letterSpacing: '-0.5px'
  },
  welcomeBox: {
    boxShadow: '0 1px 3px 0 rgba(0,0,0,0.14), 0 2px 3px -1px rgba(0,0,0,0.14)',
    padding: '40px 31px 90px 32px',
    backgroundColor: colorCodes.white,
    background: 'linear-gradient(180deg, #E6EAFF 0.06%, #CAA7F9 100%);',
    borderRadius: '8px',
    '& ul > div': {
      borderBottom: '1px solid rgba(255, 255, 255, .5)',
      '& a': {
        '&:hover': {
          color: '#4F13E0',
          fontWeight: 600
        }
      }
    }
  },
  welcomeIntro: {
    marginTop: '16px',
    marginBottom: '38px',
    color: '#2A2A2A',
    fontSize: 18,
    fontWeight: 300,
    lineHeight: '26px'
  },
  listItem: {
    padding: '4px 0',
    margin: 0
  },
  listItemText: {
    color: '#512DA8',
    fontSize: '20px',
    letterSpacing: 0.25,
    lineHeight: '34px'
  },
  viewAllLink: {
    marginTop: 24,
    display: 'inline-block',
    color: '#512DA8',
    fontSize: 14,
    fontWeight: 600,
    letterSpacing: 0.17,
    lineHeight: '18px'
  },
  padding: {
    padding: '2rem'
  },
  iconButton: {
    padding: 0,
    backgroundColor: colorCodes.lightBlue,
    color: colorCodes.white,
    '& svg': { fontSize: 48 },
    '&:hover': { backgroundColor: colorCodes.lightBlue, color: colorCodes.white }
  },
  list: { backgroundColor: 'red' },
  converterBox: { '& > div': { padding: 0 } },
  ethAdaConversionBox: {
    padding: '52px 50px 0',
    '@media(max-width: 1200px)': {
      padding: '26px 25px 0 !important'
    }
  },
  alertAndBtnContainer: {
    padding: '15px 50px 0 52px',
    borderRadius: '0 0 8px 8px',
    marginTop: 20,
    backgroundColor: '#FAFAFA'
  },
  infoBoxIcon: {
    marginRight: 4,
    color: '#9b9b9b',
    fontSize: 20
  },
  infoBoxMsg: {
    color: '#212121',
    fontSize: 14,
    letterSpacing: -0.22,
    lineHeight: '18px'
  }
};

export default styles;
