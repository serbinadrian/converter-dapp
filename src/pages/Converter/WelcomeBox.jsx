import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import WelcomeBoxLinks from './WelcomeBoxLinks';
import styles from './styles';

const WelcomeBox = () => {
  return (
    <Box sx={styles.welcomeBox}>
      <Typography variant="h4" color="white.main" sx={styles.welcome}>
        Welcome
      </Typography>
      <Typography variant="body1" color="white.main" marginBottom={3} marginTop={3}>
        SingularityNET Bridge allows users to transfer tokens from one chain to another. Follow the articles below to understand how to tranfer tokens.
      </Typography>
      <WelcomeBoxLinks />
    </Box>
  );
};

export default WelcomeBox;
