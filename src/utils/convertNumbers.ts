import { utils } from "ethers";
import { BigNumberish } from "ethers/utils";

export const parseBigNumber = (number: BigNumberish) => {
  return new utils.BigNumber(number).toString();
};

export const parseAmount = (number: BigNumberish) => {
  const readableAmount = Number(new utils.BigNumber(number));
  const wei = new utils.BigNumber(10);
  const convertedAmount = readableAmount / Number(wei.pow(18));
  const parsedAmount = parseFloat(convertedAmount.toString()).toFixed(2);
  return parsedAmount;
};
