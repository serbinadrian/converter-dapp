import { makeStyles } from '@mui/styles';

const useMenubarStyles = makeStyles(() => ({
  cursor: {
    cursor: 'pointer'
  },
  logo: {
    height: '40px',
    marginRight: 8
  },
  flex: {
    display: 'flex',
    alignItems: 'center'
  },
  items: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  }
}));

export default useMenubarStyles;
