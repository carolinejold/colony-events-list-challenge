import { ColonyRole } from "@colony/colony-js";
import { parseBigNumber } from "../../utils/convertNumbers";
import { BigNumberish } from "ethers/utils";
import styles from "./ListItem.module.css";

const ColonyRoleSet = ({
  role,
  userAddress,
  domainId,
}: {
  role: ColonyRole;
  userAddress: string;
  domainId: BigNumberish;
}): JSX.Element => {
  return (
    <div>
      <p className={styles.text}>
        <span className={styles.dynamic}>{ColonyRole[role]}</span> role assigned
        to user <span className={styles.dynamic}>{userAddress}</span> in domain{" "}
        <span className={styles.dynamic}>{parseBigNumber(domainId)}</span>.
      </p>
    </div>
  );
};

export default ColonyRoleSet;
