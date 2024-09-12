require("@nomicfoundation/hardhat-toolbox");

module.exports = {
  solidity: "0.8.24",
  networks: {
    sepolia: {
      url: "https://sepolia.infura.io/v3/4764281883ed494d8485a6af3b400616", // Replace with your Infura or Alchemy project URL
      accounts: [`0xdde2d3159171430db1f9139b5906391322197429dea5b24572c7b568be527bdf`] // Replace with your MetaMask private key
    }
  }
};
