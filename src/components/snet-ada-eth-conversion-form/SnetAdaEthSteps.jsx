import { useSelector } from 'react-redux';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import { styled } from '@mui/material/styles';
import propTypes from 'prop-types';
import { conversionStatuses } from '../../utils/ConverterConstants';
import { useStyles } from './styles';

const SnetAdaEthSteps = ({ steps, activeStep }) => {
  const classes = useStyles();
  const { conversion } = useSelector((state) => state.tokenPairs.conversionOfAdaToEth);

  const isStepFailed = (step) => {
    if (conversion.status === conversionStatuses.EXPIRED) {
      return step === 1;
    }
    return null;
  };

  const ColorlibStepIconRoot = styled('div')(() => ({
    backgroundColor: '#F18D5A',
    color: '#fff',
    width: 28,
    height: 28,
    display: 'flex',
    borderRadius: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    '& svg': { fontSize: '18px !important' }
  }));

  const waitingIcon = () => {
    return (
      <ColorlibStepIconRoot>
        <HourglassEmptyIcon />
      </ColorlibStepIconRoot>
    );
  };

  return (
    <Stepper activeStep={activeStep} alternativeLabel className={classes.stepper}>
      {steps.map(({ step, label, progress }) => {
        if (progress === 'PROCESSING') {
          return (
            <Step key={step}>
              <StepLabel StepIconComponent={waitingIcon}>{label}</StepLabel>
            </Step>
          );
        }
        const labelProps = {};
        if (isStepFailed(step)) {
          labelProps.error = true;
        }
        return (
          <Step key={step}>
            <StepLabel {...labelProps}>{label}</StepLabel>
          </Step>
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
