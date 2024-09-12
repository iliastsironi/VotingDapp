Here is a sample `README.md` file for your **Voting Dapp** project:

---

# Voting Dapp

This is a decentralized voting application built on the Ethereum blockchain. It allows participants to cast votes securely using smart contracts, ensuring transparency and immutability of voting results. This project uses **Solidity** for smart contracts, **Web3.js** to interact with the Ethereum blockchain, and **React** for the front-end interface.

## Features

- **Decentralized Voting**: Secure voting with smart contracts on the Ethereum blockchain.
- **Vote Casting**: Users can cast their votes for a list of predefined candidates.
- **Result Calculation**: The system automatically calculates the winning candidate based on the total votes.
- **Account Management**: Displays the connected Ethereum account from MetaMask.

Technologies Used

    Solidity: For writing smart contracts.
    Hardhat: For development, testing, and deployment of smart contracts.
    Web3.js: To interact with the Ethereum blockchain.
    React: Frontend framework.
    Infura/Alchemy: Blockchain node service provider.
    MetaMask: For managing Ethereum accounts.

Prerequisites

    Node.js
    MetaMask
    Hardhat
    Infura or Alchemy for node services.

Installation

Clone the repository:

    git clone https://github.com/iliastsironi/VotingDapp.git
    cd VotingDapp

Install the dependencies:

    npm install

Set up environment variables:

Create a .env file and add the following details:

    INFURA_PROJECT_ID=your_infura_project_id
    PRIVATE_KEY=your_metamask_private_key

Compile the smart contract:

    npx hardhat compile

Deploy the contract to Sepolia testnet:

Ensure your Hardhat configuration (hardhat.config.js) includes the Sepolia testnet setup:

    require('@nomiclabs/hardhat-waffle');

    module.exports = {
      solidity: '0.8.18',
      networks: {
        sepolia: {
          url: `https://sepolia.infura.io/v3/${process.env.INFURA_PROJECT_ID}`,
          accounts: [`0x${process.env.PRIVATE_KEY}`]
        }
      }
    };

Then, deploy using:

    npx hardhat run scripts/deploy.js --network sepolia

Start the frontend:

    npm start

Smart Contract Overview

The Voting.sol smart contract is responsible for handling all voting logic. It ensures each voter can only vote once and calculates the winner based on votes received.
Key Functions:

    addCandidate(string memory _name): Adds a candidate to the election.
    vote(uint _candidateId): Allows a voter to cast their vote.
    getWinner(): Returns the candidate with the highest votes.

Frontend Overview

The front-end is built using React and styled via App.css. The frontend communicates with the Ethereum blockchain via Web3.js, allowing users to connect their MetaMask wallets and cast votes.
Key Components:

    App.js: Main component to connect the MetaMask wallet and interact with the smart contract.
    App.css: Styling for the user interface, which gives the application a clean, modern look.

MetaMask Integration

The app uses MetaMask for Ethereum account management. Users can connect their wallets via MetaMask and interact with the Sepolia test network.

javascript

    const ethereum = window.ethereum;
    await ethereum.request({ method: 'eth_requestAccounts' });

Connecting to Sepolia with Infura

Ensure that your Hardhat configuration file (hardhat.config.js) includes the Sepolia network setup using Infura:

    sepolia: {
      url: `https://sepolia.infura.io/v3/${process.env.INFURA_PROJECT_ID}`,
      accounts: [`0x${process.env.PRIVATE_KEY}`]
    }

Make sure to replace INFURA_PROJECT_ID and PRIVATE_KEY with your actual Infura project ID and MetaMask private key.
Usage

    Connect MetaMask to the Sepolia testnet.
    Deploy the smart contract using Hardhat on Sepolia.
    Cast votes via the frontend and check the results.

License

This project is licensed under the MIT License. See the LICENSE file for more details.
