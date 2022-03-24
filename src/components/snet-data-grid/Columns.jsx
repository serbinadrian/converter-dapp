import Grid from '@mui/material/Grid';
import { Typography } from '@mui/material';
import { useStyles } from './styles';

const Columns = () => {
  const classes = useStyles();
  return (
    <Grid container spacing={2} className={classes.columnsContainer}>
      <Grid item xs={6} md={2}>
        <Typography textTransform="uppercase" align="left">
          date
        </Typography>
      </Grid>
      <Grid item xs={6} md={2}>
        <Typography textTransform="uppercase" align="left">
          chain type
        </Typography>
      </Grid>
      <Grid item xs={6} md={2}>
        <Typography textTransform="uppercase" align="right">
          from
        </Typography>
      </Grid>
      <Grid item xs={6} md={2}>
        <Typography textTransform="uppercase" align="right">
          to
        </Typography>
      </Grid>
      <Grid item xs={6} md={2}>
        <Typography textTransform="uppercase" align="center">
          status
        </Typography>
      </Grid>
      <Grid item xs={6} md={2}>
        <Typography textTransform="uppercase" align="right">
          &nbsp;
        </Typography>
      </Grid>
    </Grid>
  );
};

export default Columns;
