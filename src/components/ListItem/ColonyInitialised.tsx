import styles from "./ListItem.module.css";

const ColonyInitialised = (): JSX.Element => {
  return (
    <div>
      <p className={styles.text}>
        Congratulations! It's a beautiful baby colony!
      </p>
    </div>
  );
};

export default ColonyInitialised;
