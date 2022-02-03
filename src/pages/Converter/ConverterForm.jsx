import Stack from '@mui/material/Stack';
import SnetPaper from '../../components/snet-paper';
import SnetButton from '../../components/snet-button';
import TokenPairs from './TokenPairs';
import { useConverterHook } from './hooks/ConverterHook';

const ConverterForm = () => {
  const { isConversionDisabled, fromTokenPairs, toTokenPairs, fromAndToTokenValues, handleFromInputChange, handleToInputChange } = useConverterHook();

  const onClickConvert = () => {
    // TODO: Implement conversion logic
  };

  return !isConversionDisabled ? (
    <SnetPaper>
      <TokenPairs
        fromBlockchains={fromTokenPairs}
        toBlockchains={toTokenPairs}
        fromInputChange={handleFromInputChange}
        fromInputValue={fromAndToTokenValues.fromValue}
        toInputChange={handleToInputChange}
        toInputValue={fromAndToTokenValues.toValue}
      />
      <Stack direction="row" alignItems="center" justifyContent="center" padding={4}>
        <SnetButton disabled={isConversionDisabled} name="Convert" onClick={onClickConvert} />
      </Stack>
    </SnetPaper>
  ) : null;
};

export default ConverterForm;
