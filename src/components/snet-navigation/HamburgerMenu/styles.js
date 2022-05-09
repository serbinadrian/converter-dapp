import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles(() => ({
  hamburger: {
    padding: 10,
    margin: '0 39px 0 0',
    display: 'none',
    cursor: 'pointer',
    '& span': {
      width: 18,
      height: 2,
      display: 'block',
      backgroundColor: '#212121',
      marginBottom: 3
    },
    '@media (max-width:960px)': { display: 'block' },
    '@media (max-width:600px)': { margin: '0 15px 0 0' }
  },
  hamburgerNavContainer: {
    display: 'flex',
    position: 'fixed',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    zIndex: 1,
    backgroundColor: '#29113F',
    '@media (min-width:1024px)': { display: 'none' }
  },
  closeMenuIcon: {
    color: '#fff',
    position: 'absolute',
    top: 20,
    left: 20,
    cursor: 'pointer'
  },
  navAndWalletActionsContainer: {
    width: '100%',
    margin: '150px 0 0 20%'
  },
  humburgerNavigations: {
    padding: 0,
    margin: 0,
    display: 'flex',
    flexDirection: 'column',
    '& li': {
      paddingBottom: 25,
      listStyle: 'none',
      '&:last-of-type': { paddingBottom: 0 },
      '&:hover': {
        '& a': {
          color: '#4F13E0',
          fontWeight: 'bold'
        }
      },
      '& a': {
        color: '#fff',
        fontSize: 20,
        lineHeight: '20px'
      }
    }
  }
}));
