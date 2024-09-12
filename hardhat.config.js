require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config(); // Load environment variables

module.exports = {
  solidity: "0.8.24",
  networks: {
    sepolia: {
      url: `https://sepolia.infura.io/v3/${process.env.INFURA_PROJECT_ID}`, // Use INFURA_PROJECT_ID from .env
      accounts: [`0x${process.env.PRIVATE_KEY}`] // Use PRIVATE_KEY from .env
    }
  }
};
