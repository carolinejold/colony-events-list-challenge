import { getBlockTime } from "@colony/colony-js";

export const getDate = async (blockHash, provider) => {
  try {
    let rawBlockTime = await getBlockTime(provider, blockHash);
    return rawBlockTime;
  } catch (e) {
    return e;
  }
};
