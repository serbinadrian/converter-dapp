import { makeStyles } from '@mui/styles';
import BackgroundImage from '../assets/images/BG.png';

export const useStyles = makeStyles({
  mainContainer: {
    paddingTop: 97,
    backgroundImage: `url(${BackgroundImage})`,
    backgroundSize: 'cover'
  }
});
