import { makeStyles } from '@mui/styles';
import BackgroundImage from '../assets/images/BG.png';

export const useStyles = makeStyles({
  mainContainer: {
    padding: '24px 0 186px',
    backgroundImage: `url(${BackgroundImage})`,
    backgroundSize: 'cover'
  },
  wrapper: {
    maxWidth: 1063,
    margin: '0 auto',
    '@media(max-width: 1200px)': { padding: '0 20px' }
  }
});
