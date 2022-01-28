import Paper from '@mui/material/Paper';
import propTypes from 'prop-types';
import styles from './styles';

const SnetPaper = ({ children }) => {
  return <Paper sx={styles.paper}>{children}</Paper>;
};

SnetPaper.propTypes = {
  children: propTypes.node.isRequired
};

export default SnetPaper;
