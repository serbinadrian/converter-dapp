import colorCodes from '../../assets/theme/colorCodes';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
    }
  }
};

const styles = {
  formControl: {
    width: 300
  },
  dropdownWithBorders: {
    borderRadius: 20,
    backgroundColor: colorCodes.lightGray,
    overflow: 'hidden'
  },
  dropdown: {
    borderRadius: '4px',
    backgroundColor: colorCodes.lightGray,
    overflow: 'hidden'
  },
  texfieldWithDropdown: {
    padding: 1.6,
    paddingRight: 0
  },
  walletNotSelected: { fontSize: '12px' },
  walletIconSize: { fontSize: '20px' },
  avatar: { width: 25, height: 25 }
};

export { MenuProps, styles };
