import { GraphQLClient, gql } from 'graphql-request';

// Zora Base Mainnet Subgraph
const ENDPOINT = 'https://api.goldsky.com/api/public/project_clhk16b61ay9t49vm6ntn4mkz/subgraphs/zora-create-zora-mainnet/stable/gn';

const client = new GraphQLClient(ENDPOINT);

export interface ZoraToken {
  id: string;
  contract: {
    id: string;
    name: string;
  };
  tokenId: string;
  uri: string;
  totalMinted: string;
  mintedAt: string;
}

const RECENT_MINTS_QUERY = gql`
  query RecentMints {
    zoraCreateTokens(
      first: 20
      orderBy: mintedAt
      orderDirection: desc
      where: { totalMinted_gt: "0" }
    ) {
      id
      contract {
        id
        name
      }
      tokenId
      uri
      totalMinted
      mintedAt
    }
  }
`;

export const fetchRecentMints = async (): Promise<ZoraToken[]> => {
  try {
    const data = await client.request<{ zoraCreateTokens: ZoraToken[] }>(RECENT_MINTS_QUERY);
    return data.zoraCreateTokens;
  } catch (error) {
    console.error("Failed to fetch Zora mints:", error);
    return [];
  }
};
