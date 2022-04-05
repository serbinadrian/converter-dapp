import colorCodes from '../../assets/theme/colorCodes';

const styles = {
  conersionModal: { position: 'relative' },
  conersionBox: {
    width: 640,
    borderRadius: '4px 4px 0 0',
    position: 'absolute',
    background: '#fff',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%,-50%)'
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
      lineHeight: '50px'
    },
    '& svg': {
      cursor: 'pointer',
      fontSize: 24
    }
  },
  conersionModalBody: {
    '& div': {
      paddingTop: `32px !important`,
      '& > p': {
        color: '#9B9B9B',
        fontSize: 16,
        fontWeight: 600,
        lineHeight: '28px',
        textAlign: 'center'
      }
    },
    '& > p': {
      padding: '32px 20px',
      color: '#212121',
      fontSize: 14,
      letterSpacing: 0.13,
      lineHeight: '18px'
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
