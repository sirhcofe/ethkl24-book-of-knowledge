import { ApolloClient, InMemoryCache, gql } from "@apollo/client";

// Initialize the Apollo Client
const client = new ApolloClient({
  uri: "https://api.goldsky.com/api/public/project_cm1uotih4v2ow01xxhsav67ml/subgraphs/bananacash-manta-pacific-sepolia/v1/gn",
  cache: new InMemoryCache(),
  defaultOptions: {
    query: {
      fetchPolicy: "no-cache",
    },
  },
});

export const PLAY_GAMES_QUERY = gql`
  query ($transactionHash: String!) {
    playGames(where: { transactionHash__contains: $transactionHash }) {
      id
      block_number
      timestamp_
      transactionHash_
      contractId_
      player
      gameIndex
      subject
    }
  }
`;

export const FINISH_GAMES_QUERY = gql`
  query ($transactionHash: String!) {
    finishGames(where: { transactionHash__contains: $transactionHash }) {
      id
      block_number
      timestamp_
      transactionHash_
      contractId_
      player
      gameIndex
      reward
    }
  }
`;

export const PROMPTS_REQUESTED_QUERY = gql`
  query ($transactionHash: String!) {
    promptRequests(where: { transactionHash__contains: $transactionHash }) {
      id
      block_number
      timestamp_
      transactionHash_
      contractId_
      requestId
      sender
      modelId
      prompt
    }
  }
`;

export const PROMPTS_UPDATED_QUERY = gql`
  query ($requestId: String!, $contractId: String!) {
    promptsUpdateds(
      where: { contractId__contains_nocase: $contractId, requestId: $requestId }
    ) {
      id
      block_number
      timestamp_
      transactionHash_
      contractId_
      requestId
      output
      callbackData
    }
  }
`;

async function getTransactionInfoByContract(
  requestId: string,
  contractId: string,
  query: any
) {
  try {
    const { data } = await client.query({
      query: query,
      variables: { requestId, contractId },
    });
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

async function getTransactionInfo(transactionHash: string, query: any) {
  try {
    const { data } = await client.query({
      query: query,
      variables: { transactionHash },
    });
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

const playGameTx =
  "0x6eb2cb424908b451cd43d3e4487cb11ef87b860d877ce5338619a7433d4419dd";
const finishGameTx =
  "0xe616913dd0f98a2b7d16056ce4c4d46cb3111c93fa9eaa864d94fac1e8a8fb5f";
const promptsRequested =
  "0xa0308cafba31bfb72c474c338082f5492d473a53f151990fbe1b2131c0857218";
const promptsUpdated =
  "0x52b3e9b297810339b35d97fc0765f8f90379eb029e149975a78af3d04fa2c5da";

// getTransactionInfo(promptsUpdated, PROMPTS_UPDATED_QUERY)
//   .then((data) => console.log("Data:", data))
//   .catch((error) => console.error(error));

// getPromptResult(promptsRequested, PROMPTS_REQUESTED_QUERY);

type playGameType = {
  __typename: string;
  id: string;
  block_number: string;
  timestamp_: string;
  transactionHash_: string;
  contractId_: string;
  player: string;
  gameIndex: number;
  subject: string;
};

export const getPlayGameResult = async (
  transactionHash: string
): Promise<playGameType> => {
  return getTransactionInfo(transactionHash, PLAY_GAMES_QUERY)
    .then((data) => {
      return data.playGames[0];
    })
    .catch((error) => {
      console.error(error);
      throw error;
    });
};
type promptRequestsType = {
  __typename: string;
  id: string;
  block_number: string;
  timestamp_: string;
  transactionHash_: string;
  contractId_: string;
  requestId: string;
  sender: string;
  modelId: string;
  prompt: string;
};

export const getPromptResult = async (
  promptsRequested: string
): Promise<promptRequestsType> => {
  return getTransactionInfo(promptsRequested, PROMPTS_REQUESTED_QUERY)
    .then((data) => {
      console.log("in getpromptresult", data);
      return data.promptRequests[0]; // returning the data
    })
    .catch((error) => {
      console.error(error);
      throw error; // re-throwing the error if needed
    });
};

type promptUpdatedType = {
  __typename: string;
  id: string;
  block_number: string;
  timestamp_: string;
  transactionHash_: string;
  contractId_: string;
  requestId: string;
  output: string;
  callbackData: string;
};

export const getPromptUpdated = async (
  requestId: string,
  contractId: string
): Promise<promptUpdatedType> => {
  return getTransactionInfoByContract(
    requestId,
    contractId,
    PROMPTS_UPDATED_QUERY
  )
    .then((data) => {
      return data.promptsUpdateds[0]; // returning the data
    })
    .catch((error) => {
      console.error(error);
      throw error; // re-throwing the error if needed
    });
};

type finishGamesType = {
  __typename: string;
  id: string;
  block_number: string;
  timestamp_: string;
  transactionHash_: string;
  contractId_: string;
  player: string;
  gameIndex: string;
  reward: string;
};

export const getFinishGames = async (
  promptsRequested: string
): Promise<finishGamesType> => {
  let queryResult: any = [];

  return getTransactionInfo(promptsRequested, FINISH_GAMES_QUERY)
    .then((data) => {
      return data.finishGames[0]; // returning the data
    })
    .catch((error) => {
      console.error(error);
      throw error; // re-throwing the error if needed
    });
};

// getPromptResult(promptsRequested, PROMPTS_REQUESTED_QUERY);
// const run = async () => {
//   const result = await getPromptResult(promptsRequested);
//   console.log(result); // This will log the resolved data
// };

// run();
