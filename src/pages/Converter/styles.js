import colorCodes from '../../assets/theme/colorCodes';
import WelcomeImage from '../../assets/images/welcome.png';

const styles = {
  welcome: {
    lineHeight: '34px',
    letterSpacing: '0.25px'
  },
  welcomeBox: {
    boxShadow: '0 1px 1px 0 rgba(0,0,0,0.14), 0 2px 1px -1px rgba(0,0,0,0.14), 0 1px 3px 0 rgba(0,0,0,0.2)',
    padding: 4,
    backgroundColor: colorCodes.white,
    background: 'linear-gradient(180deg, #184FA7 0%, #061753 100%)',
    borderRadius: '8px',
    backgroundImage: WelcomeImage
  },
  listItem: {
    color: 'white'
  },
  padding: {
    padding: '2rem'
  },
  iconButton: {
    backgroundColor: colorCodes.lightBlue,
    color: colorCodes.white,
    '&:hover': { backgroundColor: colorCodes.lightBlue, color: colorCodes.white }
  }
};

export default styles;
