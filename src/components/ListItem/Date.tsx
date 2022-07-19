import styles from "./ListItem.module.css";

const moment = require("moment");

const Date = ({ blockTime }: { blockTime?: number }): JSX.Element => {
  let parsedTime = moment(blockTime).format(`Do MMM`);

  return <div className={styles.date}>{parsedTime}</div>;
};

export default Date;
