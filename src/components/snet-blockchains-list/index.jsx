import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Grid';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import propTypes from 'prop-types';
import Box from '@mui/material/Box';
import Button from '../snet-button';
import style from './style';

const BlockchainList = ({ blockchain, blockchainLogo, blockChainConnectInfo, isWalletAvailable }) => {
  return (
    <Box sx={style.box} divider>
      <Grid spacing={2} container sx={style.grid}>
        <Grid item sm={4} sx={style.flex}>
          <Avatar alt={blockchain} src={blockchainLogo} />
          <ListItemText primary={blockchain} sx={style.blockchain} />
        </Grid>
        <Grid item sm={6}>
          <ListItemText
            secondary={
              <Typography sx={style.blockchainInfo} component="span" variant="body2" color="text.primary">
                {blockChainConnectInfo}
              </Typography>
            }
          />
        </Grid>
        <Grid item sm={2}>
          <Button name={isWalletAvailable ? 'Connect' : 'Add'} variant="outlined" />
        </Grid>
      </Grid>
    </Box>
  );
};

BlockchainList.propTypes = {
  blockchain: propTypes.string.isRequired,
  blockchainLogo: propTypes.string.isRequired,
  blockChainConnectInfo: propTypes.string.isRequired,
  isWalletAvailable: propTypes.bool.isRequired
};

export default BlockchainList;
