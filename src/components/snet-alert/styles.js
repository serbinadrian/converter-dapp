import { makeStyles } from '@mui/styles';
import ColorCodes from '../../assets/theme/colorCodes';

export const useStyles = makeStyles({
  successMsg: {
    fontSize: 14,
    border: `1px solid ${ColorCodes.successMsgBorder}`,
    borderRadius: 3,
    backgroundColor: ColorCodes.successMsgBg
  },
  pandingMsg: {
    fontSize: 14,
    border: `1px solid ${ColorCodes.pandingMsgBorder}`,
    borderRadius: 3,
    backgroundColor: ColorCodes.pandingMsgBg
  },
  errorMsg: {
    fontSize: 14,
    border: `1px solid ${ColorCodes.errorMsgBorder}`,
    borderRadius: 3,
    backgroundColor: ColorCodes.errorMsgBg
  }
});
