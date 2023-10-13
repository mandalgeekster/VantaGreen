var path = require('path');
var express = require("express")
var cors = require("cors")
var server = express()

static_dir = path.join(__dirname, "contracts/metadata")
const corsOptions = {
    origin: "*",
    methods: ["GET", "POST"]
};
server.use(cors(corsOptions))
server.use(express.static(static_dir))

const ApolloClient = require('apollo-client').ApolloClient;
const createHttpLink = require("apollo-link-http").createHttpLink;
const InMemoryCache = require("apollo-cache-inmemory").InMemoryCache;
const crossFetch = require('cross-fetch');
const gql = require("graphql-tag").default

// TruStream Subgraph Endpoint to fetch verified telemetry
const TRUSTREAM_SUBGRAPH = "https://subgraph.iott.network/subgraphs/name/iotex/pebble-subgraph";

const GRAPHQL_CLIENT = new ApolloClient({
    link: createHttpLink({
        uri: TRUSTREAM_SUBGRAPH,
        fetch: crossFetch
    }),
    cache: new InMemoryCache()
}) 


server.get("/", (req, res) => {
    res.send("Welcome to CORS!")
})

server.get("/fetch_data", async (req, res) => {
    const imei = req.query["imei"]
    console.log("This is the IMEI: ", imei)

    const query_result = await GRAPHQL_CLIENT.query({
        query: gql`
            {
                deviceRecords(orderBy: timestamp, orderDirection:asc, first: 50, where: { imei: "${imei}" }) {
                    raw # Protobuf encoded sensors values
                    imei
                    signature
                    timestamp
                }
            }
            `
    })
    // console.log("Query Result: ", query_result)
    console.log("Data sent!")
    res.json(query_result)
})

server.listen(5000, () => {
    console.log("Listening on http://localhost:5000. CORS enabled")
})