require('dotenv').config()
const HDWalletProvider = require("@truffle/hdwallet-provider");
const infura = `${process.env.DOMAIN}`;
const pkey = `${process.env.PRIVATEKEY}`;
const skaleNetwork = `${process.env.SKALENETWORK}`
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
        provider: () => new HDWalletProvider(pkey, infura),
        network_id: 3,
        gas: 5500000,
        confirmations: 2,
        timeoutBlocks: 200,
        skipDryRun: true
    },
    skale: {
        provider: () => new HDWalletProvider(pkey, skaleNetwork),
        gasPrice: 0,
        network_id: 2481366625373186
    }
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
