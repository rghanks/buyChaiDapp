require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */

const TESTNET_URL = process.env.TESTNET_URL;
const PRIVATE_KEY = process.env.PRIVATE_KEY;

module.exports = {
  solidity: "0.8.18",
  networks : {
    sepolia : {
      url : TESTNET_URL,
      accounts : [PRIVATE_KEY]
    }
  }
};
