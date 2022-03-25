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

export const isValueGreaterThanProvided = (value, providedValue) => {
  return new BigNumber(value).gt(providedValue);
};

export const isValueGreaterThanEqualToProvided = (value, providedValue) => {
  return new BigNumber(value).gte(providedValue);
};

export const isValueLessThanProvided = (value, providedValue) => {
  return new BigNumber(value).lt(providedValue);
};

export const isValueLessThanEqualToProvided = (value, providedValue) => {
  return new BigNumber(value).lte(providedValue);
};

export const convertToValueFromPercentage = (value, percentage) => {
  return new BigNumber(value).times(percentage).dividedBy(100).toString();
};
