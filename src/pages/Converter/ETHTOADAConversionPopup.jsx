import { Typography, Modal, Box, CircularProgress } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import propTypes from 'prop-types';
import SnetButton from '../../components/snet-button';
import styles from './styles';

const ETHTOADAConversionPopup = ({ title, openPopup, handlePopupClose, openLink, blockConfiramtionsRequired, blockConfiramtionsReceived }) => {
  return (
    <Modal open={openPopup} onClose={handlePopupClose} sx={styles.conersionModal}>
      <Box sx={styles.conersionBox}>
        <Box sx={styles.conersionModalHeader}>
          <CircularProgress />
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {title}
          </Typography>
          <CloseIcon onClick={handlePopupClose} />
        </Box>
        <Box sx={styles.conersionModalBody}>
          <div sx={styles.processingLoaderContainer}>
            <Typography>
              Processing: Awaiting Confimation {blockConfiramtionsReceived}/{blockConfiramtionsRequired}
            </Typography>
          </div>
          <Typography>
            Your transaction is in progress and may take some time to complete. You can close this overlay and monitor the status from &apos;Transactions&apos;.
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
  title: propTypes.string.isRequired,
  openPopup: propTypes.bool.isRequired,
  handlePopupClose: propTypes.func.isRequired,
  openLink: propTypes.func.isRequired,
  blockConfiramtionsRequired: propTypes.number.isRequired,
  blockConfiramtionsReceived: propTypes.number.isRequired
};

export default ETHTOADAConversionPopup;
