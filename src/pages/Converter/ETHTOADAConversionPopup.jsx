import { Typography, Modal, Box } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import propTypes from 'prop-types';
import SnetButton from '../../components/snet-button';
import styles from './styles';

const ETHTOADAConversionPopup = ({ opnePopup, handlePopupClose, openLink }) => {
  return (
    <Modal open={opnePopup} onClose={handlePopupClose} sx={styles.conersionModal}>
      <Box sx={styles.conersionBox}>
        <Box sx={styles.conersionModalHeader}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Converting AGI [ETH] to AGIX [ADA]
          </Typography>
          <CloseIcon onClick={handlePopupClose} />
        </Box>
        <Box sx={styles.conersionModalBody}>
          <div sx={styles.processingLoaderContainer}>
            <Typography>Processing: Awaiting Confimation 10/13</Typography>
          </div>
          <Typography>
            Your transaction is in progress and may take some time to complete. You can close this overlay and monitorthe status from &apos;Transactions&apos;.
          </Typography>
        </Box>
        <Box sx={styles.conersionModalActions}>
          <SnetButton name="view transaction history" onClick={openLink} variant="text" />
          <SnetButton name="close" onClick={handlePopupClose} />
        </Box>
      </Box>
    </Modal>
  );
};

ETHTOADAConversionPopup.propTypes = {
  opnePopup: propTypes.bool.isRequired,
  handlePopupClose: propTypes.func.isRequired,
  openLink: propTypes.func.isRequired
};

export default ETHTOADAConversionPopup;
