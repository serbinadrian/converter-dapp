import { makeStyles } from '@mui/styles';
import BackgroundImage from '../assets/images/BG.png';

export const useStyles = makeStyles({
  mainContainer: {
    padding: '97px 0 280px',
    backgroundImage: `url(${BackgroundImage})`,
    backgroundSize: 'cover'
  },
  wrapper: {
    maxWidth: 1400,
    margin: '0 auto'
  }
});
