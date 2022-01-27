import { useState } from 'react';
import Fab from '@mui/material/Fab';
import SwapIcon from '@mui/icons-material/SwapVert';
import Stack from '@mui/material/Stack';
import SnetConversionOptions from '../../components/snet-conversion-input';
import SnetPaper from '../../components/snet-paper';
import SnetButton from '../../components/snet-button';

const ConverterForm = () => {
  const [isConversionDisabled] = useState(true);

  const onClickConvert = () => {
    // TODO: Implement conversion logic
  };

  return (
    <SnetPaper>
      <SnetConversionOptions direction="FROM" />
      <Stack direction="row" alignItems="center" justifyContent="center" padding={4}>
        <Fab aria-label="swap-icon" color="primary">
          <SwapIcon />
        </Fab>
      </Stack>
      <SnetConversionOptions direction="TO" />
      <Stack direction="row" alignItems="center" justifyContent="center" padding={4}>
        <SnetButton disabled={isConversionDisabled} name="Convert" onClick={onClickConvert} />
      </Stack>
    </SnetPaper>
  );
};

export default ConverterForm;
