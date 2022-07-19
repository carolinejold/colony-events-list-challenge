import { BigNumberish } from "ethers/utils";
import { parseBigNumber } from "../../utils/convertNumbers";
import styles from "./ListItem.module.css";

const DomainAdded = ({ domainId }: { domainId: BigNumberish }): JSX.Element => {
  return (
    <div>
      <p className={styles.text}>
        Domain{" "}
        <span className={styles.dynamic}>{parseBigNumber(domainId)}</span>{" "}
        added.
      </p>
    </div>
  );
};

export default DomainAdded;
