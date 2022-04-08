import { makeStyles } from '@mui/styles';
import ColorCodes from '../../assets/theme/colorCodes';

export const useStyles = makeStyles({
  field: {
    fontSize: 16,
    color: ColorCodes.lightText,
    borderRadius: 4
  },
  fieldContainer: {
    paddingBottom: 30
  }
});
