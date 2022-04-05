import { useState } from 'react';

const useContactSupportHook = () => {
  const emailReg =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
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

  const handleSubmitClick = () => {
    if (!email.match(emailReg)) {
      setEmailError(true);
    }
    if (!message) {
      setMessageError(true);
    }
    if (email.match(emailReg) && message) {
      setName('');
      setEmail('');
      setAddress('');
      setType('Bug');
      setMessage('');
      setShowSuccessMessage(true);

      setTimeout(() => {
        setShowSuccessMessage(false);
      }, 10000);
    }
  };

  return {
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
