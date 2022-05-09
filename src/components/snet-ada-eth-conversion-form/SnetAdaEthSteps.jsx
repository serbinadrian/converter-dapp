import { useSelector } from 'react-redux';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import propTypes from 'prop-types';
import { conversionStatuses } from '../../utils/ConverterConstants';
import { useStyles } from './styles';

const SnetAdaEthSteps = ({ steps, activeStep, isBurning }) => {
  const classes = useStyles();
  const { conversion } = useSelector((state) => state.tokenPairs.conversionOfAdaToEth);

  const isStepFailed = () => {
    return conversion.status === conversionStatuses.EXPIRED;
  };

  const waitingIcon = () => {
    return <HourglassEmptyIcon />;
  };

  console.log('$$$$$$$$$', isBurning);

  return (
    <Stepper activeStep={activeStep} alternativeLabel className={classes.stepper}>
      {steps.map(({ step, label }) => {
        const labelProps = {};
        if (isStepFailed(step)) {
          labelProps.error = true;
        }
        return (
          <Step key={step}>{isBurning ? <StepLabel {...labelProps}>{label}</StepLabel> : <StepLabel StepIconComponent={waitingIcon}>{label}</StepLabel>}</Step>
        );
      })}
    </Stepper>
  );
};

SnetAdaEthSteps.propTypes = {
  steps: propTypes.arrayOf(propTypes.string).isRequired,
  activeStep: propTypes.number.isRequired,
  isBurning: propTypes.bool.isRequired
};

export default SnetAdaEthSteps;
