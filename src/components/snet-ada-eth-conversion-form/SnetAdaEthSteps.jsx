import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import propTypes from 'prop-types';

const SnetAdaEthSteps = ({ steps, activeStep }) => {
  return (
    <Stepper activeStep={activeStep}>
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
