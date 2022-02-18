import propTypes from 'prop-types';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme, styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import dialogueStyle from './styles';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2)
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1)
  }
}));

const SnetDialog = ({ isDialogOpen, onDialogClose, dialogTitle, children, showClosebutton }) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <BootstrapDialog fullScreen={fullScreen} maxWidth="xl" onClose={onDialogClose} aria-labelledby="snet-dialog-title" open={isDialogOpen}>
      <DialogTitle sx={{ ...dialogueStyle.dialogTitle, textAlign: onDialogClose ? 'left' : 'center' }}>
        {dialogTitle}
        {showClosebutton ? (
          <IconButton aria-label="close" onClick={onDialogClose} sx={dialogueStyle.iconButton}>
            <CloseIcon />
          </IconButton>
        ) : null}
      </DialogTitle>
      <DialogContent dividers>{children}</DialogContent>
    </BootstrapDialog>
  );
};

SnetDialog.propTypes = {
  isDialogOpen: propTypes.bool.isRequired,
  onDialogClose: propTypes.func.isRequired,
  dialogTitle: propTypes.string.isRequired,
  children: propTypes.node.isRequired,
  showClosebutton: propTypes.bool
};

SnetDialog.defaultProps = {
  showClosebutton: true
};

export default SnetDialog;
