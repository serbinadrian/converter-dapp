import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import WelcomeBoxLinks from './WelcomeBoxLinks';

const WelcomeBox = () => {
  return (
    <Box
      sx={{
        boxShadow: '0 1px 1px 0 rgba(0,0,0,0.14), 0 2px 1px -1px rgba(0,0,0,0.14), 0 1px 3px 0 rgba(0,0,0,0.2)',
        padding: 4,
        backgroundColor: '#FFFFFF',
        background: 'linear-gradient(180deg, #184FA7 0%, #061753 100%)',
        borderRadius: '8px'
      }}
    >
      <Typography variant="h4" color="white">
        Welcome
      </Typography>
      <Typography variant="body1" marginBottom={3} marginTop={3}>
        SingularityNET Bridge allows users to transfer tokens from one chain to another. Follow the articles below to understand how to tranfer tokens.
      </Typography>
      <WelcomeBoxLinks />
    </Box>
  );
};

export default WelcomeBox;
