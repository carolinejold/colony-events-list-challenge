import { useEffect, useState } from "react";
import { utils } from "ethers";
import { parseBigNumber, parseAmount } from "../../utils/convertNumbers";
import { convertTokens } from "../../utils/convertTokens";
import { ColonyClient } from "@colony/colony-js";
import { BigNumberish } from "ethers/utils";
import styles from "./ListItem.module.css";

const PayoutClaimed = ({
  client,
  amount,
  token,
  fundingPotId,
}: {
  client: ColonyClient;
  amount: number;
  token: string;
  fundingPotId: BigNumberish;
}) => {
  const [userAddress, setUserAddress] = useState<string>();

  useEffect(() => {
    const getAddress = async () => {
      const humanReadableFundingPotId = new utils.BigNumber(
        fundingPotId
      ).toString();
      const { associatedTypeId } = await client.getFundingPot(
        humanReadableFundingPotId
      );
      const { recipient: userAddress } = await client.getPayment(
        associatedTypeId
      );
      setUserAddress(userAddress);
    };
    getAddress();
  }, [fundingPotId, client]);

  return userAddress ? (
    <div>
      <p className={styles.text}>
        User <span className={styles.dynamic}>{userAddress}</span> claimed{" "}
        <span className={styles.dynamic}>
          {parseAmount(amount)}
          {convertTokens(token)}
        </span>{" "}
        payout from pot 
        <span className={styles.dynamic}>{parseBigNumber(fundingPotId)}.</span>
      </p>
    </div>
  ) : (
    <div>
      <p>Generating user address, please wait...</p>
    </div>
  );
};

export default PayoutClaimed;
