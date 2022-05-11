import { useSelector } from 'react-redux';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
// import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
// import { styled } from '@mui/material/styles';
import propTypes from 'prop-types';
import { conversionStatuses } from '../../utils/ConverterConstants';
import { useStyles } from './styles';

const SnetAdaEthSteps = ({ steps, activeStep }) => {
  const classes = useStyles();
  const { conversion } = useSelector((state) => state.tokenPairs.conversionOfAdaToEth);

  const isStepFailed = () => {
    return conversion.status === conversionStatuses.EXPIRED;
  };

  // const ColorlibStepIconRoot = styled('div')(() => ({
  //   backgroundColor: '#F18D5A',
  //   color: '#fff',
  //   width: 28,
  //   height: 28,
  //   display: 'flex',
  //   borderRadius: '50%',
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   '& svg': { fontSize: 18 }
  // }));

  // const waitingIcon = () => {
  //   return (
  //     <ColorlibStepIconRoot>
  //       <HourglassEmptyIcon />
  //     </ColorlibStepIconRoot>
  //   );
  // };

  // <StepLabel StepIconComponent={waitingIcon}>{label}</StepLabel>

  return (
    <Stepper activeStep={activeStep} alternativeLabel className={classes.stepper}>
      {steps.map(({ step, label }) => {
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
