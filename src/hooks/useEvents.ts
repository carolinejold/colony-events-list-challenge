import { useEffect, useState } from "react";
import { ColonyClient } from "@colony/colony-js";
import { Log, Provider } from "ethers/providers";
import { getColonyClient } from "../client/getColonyClient";
import { getDate } from "../utils/getDate";
import { eventObj } from "../types";

const useEvents = () => {
  const [rawEventLogs, setRawEventLogs] = useState<Array<Log>>([]);
  const [client, setClient] = useState<ColonyClient>();
  const [provider, setProvider] = useState<Provider>();
  const [eventsData, setEventsData] = useState<Array<eventObj>>([]);

  useEffect(() => {
    const getEventLogs = async () => {
      try {
        const events = await getColonyClient();
        setRawEventLogs([...events.eventsArray]);
        setClient(events.colonyClient);
        setProvider(events.provider);
      } catch (e) {
        return e;
      }
    };
    getEventLogs();
  }, []);

  useEffect(() => {
    const combineData = async () => {
      if (rawEventLogs && client && provider) {
        try {
          const combinedData = rawEventLogs.map(async (e) => {
            let blockTime =
              e.blockHash && (await getDate(e.blockHash, provider));
            const obj = await {
              unparsed: e,
              parsed: client.interface.parseLog(e),
              blockTime: blockTime,
            };
            return obj;
          });
          // @ts-ignore
          setEventsData(await Promise.all([...combinedData]));
        } catch (e) {
          return e;
        }
      }
    };
    combineData();
  }, [rawEventLogs, client, provider]);

  return { eventsData, client };
};

export default useEvents;
