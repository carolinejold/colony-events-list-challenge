import makeBlockie from "ethereum-blockies-base64";
import styles from "./Avatar.module.css";

const Avatar = ({
  userAddress,
  transactionHash,
}: {
  userAddress?: string;
  transactionHash?: string;
}): JSX.Element => {
  return userAddress ? (
    <img
      className={styles.avatar}
      alt="avatar"
      src={makeBlockie(userAddress)}
    />
  ) : transactionHash ? (
    <img
      className={styles.avatar}
      alt="avatar"
      src={makeBlockie(transactionHash)}
    />
  ) : (
    <img
      className={styles.avatar}
      alt="avatar"
      src={makeBlockie("0x7cB57B5A97eAbe94205C07890BE4c1aD31E486A8")}
    />
  );
};

export default Avatar;
