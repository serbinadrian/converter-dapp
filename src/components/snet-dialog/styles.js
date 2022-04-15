import ColorCodes from '../../assets/theme/colorCodes';

const snetDialogStyles = {
  dialogTitle: {
    m: 0,
    padding: '16px 24px !important',
    color: ColorCodes.blue,
    fontSize: 18,
    fontWeight: '600',
    lineHeight: '24px'
  },
  iconButton: {
    position: 'absolute',
    right: 8,
    top: 8,
    color: (theme) => theme.palette.grey[700],
    '& svg': { fontSize: 24 }
  },
  dailogContent: {
    padding: '0 !important'
  }
};

export default snetDialogStyles;
