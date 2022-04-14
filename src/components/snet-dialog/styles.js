import ColorCodes from '../../assets/theme/colorCodes';

const snetDialogStyles = {
  dialogTitle: { m: 0, padding: '13px 22px !important', color: ColorCodes.blue, fontSize: '18px', fontWeight: '600', lineHeight: '24px' },
  iconButton: {
    position: 'absolute',
    right: 8,
    top: 8,
    color: (theme) => theme.palette.grey[700],
    '& svg': { fontSize: 24 }
  },
  dailogContent: {
    padding: '32px 44px 40px 50px !important'
  }
};

export default snetDialogStyles;
