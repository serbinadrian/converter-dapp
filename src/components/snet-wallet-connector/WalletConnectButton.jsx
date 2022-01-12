import ButtonBase from '@mui/material/ButtonBase';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import propTypes from 'prop-types';

const WalletConnectButton = ({ name, imageSrc, description }) => {
  return (
    <ButtonBase sx={{ width: '100%', display: 'inline-block', minWidth: 320 }}>
      <Box sx={{ textAlign: 'center' }}>
        <Box>
          <img src={imageSrc} alt={name} width={100} />
        </Box>
        <Typography color="black" variant="body1">
          {name}
        </Typography>
        <Typography color="gray" variant="body2">
          {description}
        </Typography>
      </Box>
    </ButtonBase>
  );
};

WalletConnectButton.propTypes = {
  name: propTypes.string.isRequired,
  imageSrc: propTypes.string.isRequired,
  description: propTypes.string.isRequired
};

export default WalletConnectButton;
