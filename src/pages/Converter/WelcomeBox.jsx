import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import WelcomeBoxLinks from './HelpLinks';
import styles from './styles';

const WelcomeBox = () => {
  return (
    <Box sx={{ ...styles.welcomeBox }}>
      <Typography sx={styles.welcome}>Bridge</Typography>
      <Typography color="white.main" sx={styles.welcomeIntro}>
        SingularityNET Bridge allows users to transfer tokens from one chain to another. Follow the articles below to understand how to transfer tokens.
      </Typography>
      <WelcomeBoxLinks />
    </Box>
  );
};

export default WelcomeBox;
