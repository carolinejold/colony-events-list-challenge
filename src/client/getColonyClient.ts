import { getColonyNetworkClient, Network } from "@colony/colony-js";
import { Wallet } from "ethers";
import { InfuraProvider } from "ethers/providers";
import { getLogs } from "@colony/colony-js";

export const getColonyClient = async () => {
  const MAINNET_NETWORK_ADDRESS = `0x5346D0f80e2816FaD329F2c140c870ffc3c3E2Ef`;
  const MAINNET_BETACOLONY_ADDRESS = `0x869814034d96544f3C62DE2aC22448ed79Ac8e70`;

  const provider = new InfuraProvider();
  const wallet = Wallet.createRandom();
  const connectedWallet = wallet.connect(provider);

  // Get a network client instance
  const networkClient = await getColonyNetworkClient(
    Network.Mainnet,
    connectedWallet,
    {
      networkAddress: MAINNET_NETWORK_ADDRESS,
    }
  );

  // Get the colony client instance for the betacolony
  const colonyClient = await networkClient.getColonyClient(
    MAINNET_BETACOLONY_ADDRESS
  );

  // Filters for each event type
  const colonyInitialisedFilter = colonyClient.filters.ColonyInitialised(
    null,
    null
  );
  const payoutClaimedFilter = colonyClient.filters.PayoutClaimed(
    null,
    null,
    null
  );
  // @ts-ignore
  const colonyRoleSetFilter = colonyClient.filters.ColonyRoleSet(null, null);
  const domainAddedFilter = colonyClient.filters.DomainAdded(null);

  // Raw data logs for each event type
  const colonyInitialisedEventLogs = await getLogs(
    colonyClient,
    colonyInitialisedFilter
  );
  const payoutClaimedEventLogs = await getLogs(
    colonyClient,
    payoutClaimedFilter
  );
  const colonyRoleSetEventLogs = await getLogs(
    colonyClient,
    colonyRoleSetFilter
  );
  const domainAddedEventLogs = await getLogs(colonyClient, domainAddedFilter);

  let eventsArray = [
    ...colonyInitialisedEventLogs,
    ...payoutClaimedEventLogs,
    ...colonyRoleSetEventLogs,
    ...domainAddedEventLogs,
  ];

  return { colonyClient, eventsArray, provider };
};
