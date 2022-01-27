import ButtonBase from '@mui/material/ButtonBase';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import propTypes from 'prop-types';
import style from './style';

const WalletConnectButton = ({ name, imageSrc, description, onConnect }) => {
  return (
    <ButtonBase onClick={onConnect} sx={style.walletConnectButton}>
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
  description: propTypes.string.isRequired,
  onConnect: propTypes.func.isRequired
};

export default WalletConnectButton;
