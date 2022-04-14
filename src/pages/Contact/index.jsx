import { lazy } from 'react';
import { Helmet } from 'react-helmet';
import { Box, Button, Stack, Typography } from '@mui/material';
import { useStyles } from './styles';
import SnetContactInput from '../../components/snet-contact-input';
import useContactSupportHook from './hooks/contactSupportHook';
import ColorCodes from '../../assets/theme/colorCodes';
import SnetAlert from '../../components/snet-alert';

const GeneralLayout = lazy(() => import('../../layouts/GeneralLayout'));
const options = [
  {
    value: 'Bug',
    label: 'Bug'
  },
  {
    value: 'Question',
    label: 'Question'
  },
  {
    value: 'FeedBack',
    label: 'FeedBack'
  }
];
const Contact = () => {
  const classes = useStyles();
  const {
    name,
    email,
    address,
    type,
    message,
    showSuccessMessage,
    emailError,
    messageError,
    handleNameChange,
    handleEmailChange,
    handleAddressChange,
    handleTypeChange,
    handleMessageChange,
    handleSubmitClick
  } = useContactSupportHook();

  return (
    <>
      <Helmet>
        <title>SingularityNet Bridge | Contact Us</title>
      </Helmet>
      <GeneralLayout>
        <Box display="flex" justifyContent="center" alignItems="center">
          <div className={classes.container}>
            <div className={classes.headerContainer}>
              <Typography variant="h3" color={ColorCodes.text}>
                Contact Support
              </Typography>
            </div>
            <Box marginX={3}>
              <Stack direction="row" spacing={2}>
                <SnetContactInput id="name" value={name} onChange={handleNameChange} label="Your Name (Optional)" />
                <SnetContactInput
                  id="email"
                  value={email}
                  onChange={handleEmailChange}
                  label="Email"
                  error={emailError}
                  helperText={emailError ? 'Please enter valid email' : ''}
                />
              </Stack>
              <SnetContactInput id="address" value={address} onChange={handleAddressChange} label="Wallet Address (Optional)" />
              <SnetContactInput id="bug" fullWidth value={type} onChange={handleTypeChange} label="Bug" select options={options} />
              <SnetContactInput
                id="message"
                fullWidth
                value={message}
                onChange={handleMessageChange}
                label="Your Message"
                multiline
                error={messageError}
                helperText={messageError ? 'Please enter message' : ''}
              />
              {showSuccessMessage ? <SnetAlert error="Support request successfully send." type="success" /> : null}
              <Stack alignItems="center" justifyContent="center" marginY={2}>
                <Button onClick={handleSubmitClick} color="primary" variant="contained" className={classes.submitBtn}>
                  SUBMIT
                </Button>
              </Stack>
            </Box>
          </div>
        </Box>
      </GeneralLayout>
    </>
  );
};

export default Contact;
