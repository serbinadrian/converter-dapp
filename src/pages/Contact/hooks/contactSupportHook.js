import { useState } from 'react';
import { submitFeedback } from '../../../utils/HttpRequests';

const useContactSupportHook = () => {
  const emailReg =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [type, setType] = useState('Bug');
  const [message, setMessage] = useState('');
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [messageError, setMessageError] = useState(false);

  const handleNameChange = (event) => {
    const { value } = event.target;
    setName(value);
  };

  const handleEmailChange = (event) => {
    const { value } = event.target;
    setEmail(value);
    if (value.match(emailReg)) {
      setEmailError(false);
    } else {
      setEmailError(true);
    }
  };

  const handleAddressChange = (event) => {
    const { value } = event.target;
    setAddress(value);
  };
  const handleTypeChange = (event) => {
    const { value } = event.target;
    setType(value);
  };
  const handleMessageChange = (event) => {
    const { value } = event.target;
    setMessage(value);
    if (value) {
      setMessageError(false);
    } else {
      setMessageError(true);
    }
  };

  const handleSubmitClick = async () => {
    if (!email.match(emailReg)) {
      setEmailError(true);
      return;
    }
    if (!message) {
      setMessageError(true);
      return;
    }

    setIsLoading(true);
    const params = {
      source: 'BRIDGE',
      name,
      address: '',
      email,
      phone_no: '',
      message_type: type,
      subject: '',
      message,
      attachment_details: {}
    };
    try {
      const data = await submitFeedback(params);
      setName('');
      setEmail('');
      setAddress('');
      setType('Bug');
      setMessage('');
      setShowSuccessMessage(true);

      setTimeout(() => {
        setShowSuccessMessage(false);
      }, 10000);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    name,
    email,
    address,
    type,
    message,
    showSuccessMessage,
    messageError,
    emailError,
    handleNameChange,
    handleEmailChange,
    handleAddressChange,
    handleTypeChange,
    handleMessageChange,
    handleSubmitClick
  };
};

export default useContactSupportHook;
