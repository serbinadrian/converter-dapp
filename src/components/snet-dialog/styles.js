import ColorCodes from '../../assets/theme/colorCodes';

const snetDialogStyles = {
  dialogTitle: { m: 0, p: 2, color: ColorCodes.blue, fontSize: '18px', fontWeight: '600', lineHeight: '24px' },
  iconButton: {
    position: 'absolute',
    right: 8,
    top: 8,
    color: (theme) => theme.palette.grey[700]
  }
};

export default snetDialogStyles;
