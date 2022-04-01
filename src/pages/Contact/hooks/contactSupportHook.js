import { useState } from 'react';

const useContactSupportHook = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [type, setType] = useState('Bug');
  const [message, setMessage] = useState('');
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const handleNameChange = (event) => {
    const { value } = event.target;
    setName(value);
  };

  const handleEmailChange = (event) => {
    const { value } = event.target;
    setEmail(value);
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
  };

  const handleSubmitClick = () => {
    setName('');
    setEmail('');
    setAddress('');
    setType('Bug');
    setMessage('');
    setShowSuccessMessage(true);

    setTimeout(() => {
      setShowSuccessMessage(false);
    }, 10000);
  };

  return {
    name,
    email,
    address,
    type,
    message,
    showSuccessMessage,
    handleNameChange,
    handleEmailChange,
    handleAddressChange,
    handleTypeChange,
    handleMessageChange,
    handleSubmitClick
  };
};

export default useContactSupportHook;
