import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

import "dotenv/config";


const BASE_GOERLI_RPC = process.env.BASE_GOERLI_RPC;

const PRIVATE_KEY = process.env.PRIVATE_KEY;


const config: HardhatUserConfig = {
  defaultNetwork: "localhost",
  networks: {
    hardhat: {
      forking: {
        // @ts-ignore
        url: BASE_GOERLI_RPC,
      },
    },
    base: {
      url: BASE_GOERLI_RPC,
      // @ts-ignore
      accounts: [PRIVATE_KEY],
      chainId: 84531,
      gasPrice: 1000000000,
    },

    localhost: {
      url: "http://localhost:8545",
      chainId: 31337,
    },
  },
  solidity: "0.8.21",
  etherscan: {
    apiKey: {
     "base-goerli": "PLACEHOLDER_STRING"
    },
    customChains: [
      {
        network: "base-goerli",
        chainId: 84531,
        urls: {
         apiURL: "https://api-goerli.basescan.org/api",
         browserURL: "https://goerli.basescan.org"
        }
      }
    ]
  },
};

export default config;
