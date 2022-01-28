import propTypes from 'prop-types';
import Container from '@mui/material/Container';
import Menubar from '../components/snet-navigation';

const GeneralLayout = ({ children }) => {
  return (
    <>
      <Menubar />
      <Container sx={{ marginTop: 8 }}>{children}</Container>
    </>
  );
};

GeneralLayout.propTypes = {
  children: propTypes.node.isRequired
};

export default GeneralLayout;
