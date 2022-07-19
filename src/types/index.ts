import { Log } from "ethers/providers";
import { LogDescription } from "ethers/utils";

export interface eventObj {
  unparsed?: Log;
  parsed?: LogDescription;
  blockTime?: number;
}
