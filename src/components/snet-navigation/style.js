import { makeStyles } from '@mui/styles';

const useMenubarStyles = makeStyles(() => ({
  header: {
    padding: '13px 60px',
    boxShadow: '0 2px 3px 0 rgba(0,0,0,0.1)'
  },
  navigations: {
    marginLeft: 83,
    '& a': {
      color: '#9B9B9B',
      fontSize: 16,
      letterSpacing: 0,
      lineHeight: '20px'
    }
  },
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
