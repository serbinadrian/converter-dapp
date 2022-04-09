import colorCodes from '../../assets/theme/colorCodes';

const styles = {
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
    borderRadius: '8px'
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
  listDivider: {
    background: '#fff'
  },
  viewAllLink: {
    color: '#512DA8',
    fontSize: 14,
    fontWeight: 600,
    letterSpacing: 0.17
  },
  padding: {
    padding: '2rem'
  },
  iconButton: {
    backgroundColor: colorCodes.lightBlue,
    color: colorCodes.white,
    '&:hover': { backgroundColor: colorCodes.lightBlue, color: colorCodes.white }
  },
  list: {
    backgroundColor: 'red'
  }
};

export default styles;
