import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import propTypes from 'prop-types';
import { useStyles } from './styles';

const SnetAdaEthSteps = ({ steps, activeStep }) => {
  const classes = useStyles();
  return (
    <Stepper activeStep={activeStep} alternativeLabel className={classes.stepper}>
      {steps.map(({ step, label }) => {
        return (
          <Step key={step}>
            <StepLabel>{label}</StepLabel>
          </Step>
        );
      })}
    </Stepper>
  );
};

SnetAdaEthSteps.propTypes = {
  steps: propTypes.arrayOf(propTypes.string).isRequired,
  activeStep: propTypes.number.isRequired
};

export default SnetAdaEthSteps;
