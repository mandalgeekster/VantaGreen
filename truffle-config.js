require('babel-register');
require('babel-polyfill');
const HDWalletProvider = require('@truffle/hdwallet-provider');

const fs = require('fs');
const privateKey = fs.readFileSync("./.secret").toString().trim();

module.exports = {
    networks: {
        development: {
            host: "127.0.0.1",
            port: 8545,
            network_id: "*" // Match any network id
        },
        iotex: {
            networkCheckTimeout: 10000,
            provider: function() {
                return new HDWalletProvider({
                    privateKeys: [privateKey],
                    providerOrUrl: "wss://babel-api.testnet.iotex.io",
                    shareNonce: true
                })
            },
            network_id: 4690, // IOTEX mainnet chain id 4689, testnet is 4690
            gas: 8500000,
            gasPrice: 1000000000000,
            skipDryRun: true
        }
    },
    contracts_directory: './src/contracts/',
    contracts_build_directory: './src/abis/',
    compilers: {
        solc: {
            version: "0.8.10",
            optimizer: {
                enabled: true,
                runs: 200
            }
        }
    }
}
