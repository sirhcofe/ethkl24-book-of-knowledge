import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "https://api.goldsky.com/api/public/project_cm1uotih4v2ow01xxhsav67ml/subgraphs/bananacash-manta-pacific-sepolia/v1/gn",
  cache: new InMemoryCache(),
});

export default client;
