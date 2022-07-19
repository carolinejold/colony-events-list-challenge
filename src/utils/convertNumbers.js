import { utils } from "ethers";

export const parseBigNumber = (number) => {
  return new utils.BigNumber(number).toString();
};

export const parseAmount = (number) => {
  const readableAmount = new utils.BigNumber(number).toString();
  const wei = new utils.BigNumber(10);
  const convertedAmount = readableAmount / wei.pow(18);
  const parsedAmount = parseFloat(convertedAmount).toFixed(2);
  return parsedAmount;
};
