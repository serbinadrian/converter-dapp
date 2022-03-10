import { Grid } from '@mui/material';
import PrimaryFooter from './PrimaryFooter';
import SecondaryFooter from './SecondaryFooter';
import { FooterData } from './content';

const SnetFooter = () => {
  return (
    <Grid container spacing={24}>
      <PrimaryFooter leftData={FooterData.PrimaryFooterLeft} mainData={FooterData.PrimaryFooterMain} />
      <SecondaryFooter />
    </Grid>
  );
};

export default SnetFooter;
