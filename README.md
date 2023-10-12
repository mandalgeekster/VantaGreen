

## Testing Instructions
To test this project locally, run
```bash
$ npm install
```

Add your Network Private Key (from MetaMask) in `.secret`:
```bash
touch .secret
```

Then, run *each* of the following on *separate* terminal sessions:
```bash
truffle migrate --network iotex --reset
npm run start
node src/server.js
```

## Compatibility
`npm` version 8.1.2
`node` version v16.13.1
