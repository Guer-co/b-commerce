require('dotenv').config()
const HDWalletProvider = require("@truffle/hdwallet-provider");
const infura = `https://ropsten.infura.io/v3/a6122371120a4819ae02bac868b9d07a`;
const pkey = ``;
const skalepkey = ``;
const skaleNetwork = `https://eth-global-12.skalenodes.com:10584`
module.exports = {
plugins: ["truffle-contract-size"],
contracts_build_directory: "./src/build",
networks: {
    development: {
    host: "127.0.0.1",
    port: 8545,
    network_id: "*",
    },
    ropsten: {
        provider: () =>
          new HDWalletProvider({
            privateKeys: [pkey],
            providerOrUrl: infura,
            chainId: 3,
          }),
        network_id: 3, // Ropsten's id
        gas: 5500000, // Ropsten has a lower block limit than mainnet
        confirmations: 0, // # of confs to wait between deployments. (default: 0)
        timeoutBlocks: 200, // # of blocks before a deployment times out  (minimum/default: 50)
        skipDryRun: true, // Skip dry run before migrations? (default: false for public nets )
      },
      skale: {
        provider: () =>
          new HDWalletProvider({
            privateKeys: [skalepkey],
            providerOrUrl: skaleNetwork
          }),
        network_id: 2481366625373186, // Ropsten's id
        gas: 5500000, // Ropsten has a lower block limit than mainnet
        confirmations: 0, // # of confs to wait between deployments. (default: 0)
        timeoutBlocks: 200, // # of blocks before a deployment times out  (minimum/default: 50)
        skipDryRun: true, // Skip dry run before migrations? (default: false for public nets )
      },
},

mocha: {
    // timeout: 100000
},

compilers: {
    solc: {
    version: "0.8.4",    // Fetch exact version from solc-bin (default: truffle's version)
    docker: false,        // Use "0.5.1" you've installed locally with docker (default: false)
    settings: {          // See the solidity docs for advice about optimization and evmVersion
        optimizer: {
        enabled: false,
        runs: 0
        },
        evmVersion: "byzantium"
    }
    }
}
}
