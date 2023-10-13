import express, { Request, Response } from 'express';
import cors from 'cors';
import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';
import fetch from 'cross-fetch';
import { gql } from 'graphql-tag';

const app = express();
const PORT = 5000;

app.use(cors());

// Define the TruStream Subgraph Endpoint
const TRUSTREAM_SUBGRAPH = 'https://subgraph.iott.network/subgraphs/name/iotex/pebble-subgraph';

const client = new ApolloClient({
  link: new HttpLink({ uri: TRUSTREAM_SUBGRAPH, fetch }),
  cache: new InMemoryCache(),
});

app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to CORS!');
});

app.get('/fetch_data', async (req: Request, res: Response) => {
  try {
    const imei = req.query.imei as string;
    console.log('IMEI:', imei);

    const query_result = await client.query({
      query: gql`
        {
          deviceRecords(orderBy: timestamp, orderDirection: ASC, first: 50, where: { imei: "${imei}" }) {
            raw
            imei
            signature
            timestamp
          }
        }
      `,
    });

    console.log('Data sent!');
    res.json(query_result.data);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

app.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}. CORS enabled`);
});
