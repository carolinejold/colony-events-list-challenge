import { getBlockTime } from "@colony/colony-js";
import { Provider } from "ethers/providers";

export const getDate = async (blockHash: string, provider: Provider) => {
  try {
    let rawBlockTime = await getBlockTime(provider, blockHash);
    return rawBlockTime;
  } catch (e) {
    return e;
  }
};
