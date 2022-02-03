import axios from './Axios';

export const getBlockchains = async () => {
  try {
    const { data } = await axios.get('blockchain');
    return data;
  } catch (error) {
    return [];
  }
};

export const getTokenPairs = async () => {
  try {
    const { data } = await axios.get('token/pair');
    return data;
  } catch (error) {
    return [];
  }
};
