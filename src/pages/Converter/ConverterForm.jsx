import Stack from '@mui/material/Stack';
import SnetPaper from '../../components/snet-paper';
import SnetButton from '../../components/snet-button';
import TokenPairs from './TokenPairs';
import { useConverterHook } from './hooks/ConverterHook';

const ConverterForm = () => {
  const { isConversionDisabled, fromTokenPairs, toTokenPairs } = useConverterHook();

  const onClickConvert = () => {
    // TODO: Implement conversion logic
  };

  return (
    <SnetPaper>
      <TokenPairs fromBlockchains={fromTokenPairs} toBlockchains={toTokenPairs} />
      <Stack direction="row" alignItems="center" justifyContent="center" padding={4}>
        <SnetButton disabled={isConversionDisabled} name="Convert" onClick={onClickConvert} />
      </Stack>
    </SnetPaper>
  );
};

export default ConverterForm;
