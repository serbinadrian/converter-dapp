import axios from './Axios';

export const getBlockchains = async () => {
  try {
    const { data } = await axios.get('blockchain');
    return data;
  } catch (error) {
    return [];
  }
};
