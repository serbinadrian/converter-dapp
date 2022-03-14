import { Grid } from '@mui/material';
import PrimaryFooter from './PrimaryFooter';
import SecondaryFooter from './SecondaryFooter';
import { FooterData } from './content';
import { useStyles } from './styles';

const SnetFooter = () => {
  const classes = useStyles();
  return (
    <footer className={classes.footer}>
      <Grid container spacing={24} className={classes.footerWrapper}>
        <PrimaryFooter leftData={FooterData.PrimaryFooterLeft} mainData={FooterData.PrimaryFooterMain} />
        <SecondaryFooter />
      </Grid>
    </footer>
  );
};

export default SnetFooter;
