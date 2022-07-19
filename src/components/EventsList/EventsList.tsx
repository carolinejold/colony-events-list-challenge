import { v4 as uuidv4 } from "uuid";
import { ColonyClient } from "@colony/colony-js";
import useEvents from "../../hooks/useEvents";
import Avatar from "../Avatars/Avatar";
import ColonyInitialised from "../ListItem/ColonyInitialised";
import ColonyRoleSet from "../ListItem/ColonyRoleSet";
import PayoutClaimed from "../ListItem/PayoutClaimed";
import DomainAdded from "../ListItem/DomainAdded";
import Date from "../ListItem/Date";
import colonyLogo from "../../images/colonylogo.png";
import { eventObj } from "../../types";
import styles from "./EventsList.module.css";

const EventsList = (): JSX.Element => {
  const {
    eventsData,
    client,
  }: { eventsData?: Array<eventObj>; client?: ColonyClient } = useEvents();

  return (
    <div className={styles.eventsList}>
      {eventsData && client ? (
        eventsData
          .sort((a, b) =>
            a.blockTime && b.blockTime ? b.blockTime - a.blockTime : 0
          )
          .map((e) => (
            <div key={uuidv4()} className={styles.listItem}>
              <div>
                <Avatar
                  userAddress={e?.parsed?.values.user}
                  transactionHash={e?.unparsed?.transactionHash}
                />
              </div>
              <div className={styles.listItemContent}>
                {e?.parsed?.name === "ColonyInitialised" && (
                  <ColonyInitialised />
                )}
                {e?.parsed?.name === "ColonyRoleSet" && (
                  <ColonyRoleSet
                    role={e.parsed.values.role}
                    userAddress={e.parsed.values.user}
                    domainId={e.parsed.values.domainId}
                  />
                )}
                {e?.parsed?.name === "PayoutClaimed" && (
                  <PayoutClaimed
                    client={client}
                    amount={e.parsed.values.amount}
                    token={e.parsed.values.token}
                    fundingPotId={e.parsed.values.fundingPotId}
                  />
                )}
                {e?.parsed?.name === "DomainAdded" && (
                  <DomainAdded domainId={e.parsed.values.domainId} />
                )}
                <Date blockTime={e.blockTime} />
              </div>
            </div>
          ))
      ) : (
        <div className={styles.loadingItem}>
          <img className={styles.loading} alt="colony logo" src={colonyLogo} />
          <p>Loading, please wait...</p>
        </div>
      )}
    </div>
  );
};

export default EventsList;
