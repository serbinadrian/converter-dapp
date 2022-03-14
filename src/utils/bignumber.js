import BigNumber from 'bignumber.js';

export const bigNumberToString = (value) => {
  return new BigNumber(value).toString();
};

export const bigNumberSubtract = (value, subtractValue) => {
  return new BigNumber(value).minus(subtractValue).abs().toString();
};

export const convertFromCogs = (cogs, decimals) => {
  return new BigNumber(cogs).dividedBy(10 ** decimals).toString();
};
