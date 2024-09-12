import React, { useState, useEffect } from "react";
import Web3 from "web3";
import "./App.css";

function App() {
  const [account, setAccount] = useState("");
  const [contract, setContract] = useState(null);
  const [candidates, setCandidates] = useState([]);
  const [voterAddress, setVoterAddress] = useState("");
  const [candidateName, setCandidateName] = useState("");
  const [winner, setWinner] = useState("");
  const [loading, setLoading] = useState(false);

  // Replace with your deployed contract address
  const contractAddress = "0xf8A1C20DDfF138c8C2766972560f237645ce802C"; 

  // Replace with your contract ABI
  const ABI = [ {
    "inputs": [],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "name",
        "type": "string"
      }
    ],
    "name": "addCandidate",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "admin",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "candidateCount",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "candidates",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "id",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "name",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "voteCount",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "endVoting",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "candidateId",
        "type": "uint256"
      }
    ],
    "name": "getCandidate",
    "outputs": [
      {
        "internalType": "string",
        "name": "name",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "voteCount",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getWinner",
    "outputs": [
      {
        "internalType": "string",
        "name": "winnerName",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "voter",
        "type": "address"
      }
    ],
    "name": "registerVoter",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "startVoting",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "totalVotes",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "candidateId",
        "type": "uint256"
      }
    ],
    "name": "vote",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "name": "voters",
    "outputs": [
      {
        "internalType": "bool",
        "name": "isRegistered",
        "type": "bool"
      },
      {
        "internalType": "bool",
        "name": "hasVoted",
        "type": "bool"
      },
      {
        "internalType": "uint256",
        "name": "vote",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "votingOpen",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
];  // Add your contract's ABI here

  useEffect(() => {
    async function loadWeb3() {
      if (window.ethereum) {
        try {
          // Request account access if needed
          await window.ethereum.request({ method: "eth_requestAccounts" });
          
          // Set up Web3
          window.web3 = new Web3(window.ethereum);
          const web3 = window.web3;

          // Get the list of accounts connected to MetaMask
          const accounts = await web3.eth.getAccounts();
          setAccount(accounts[0]);

          // Set the contract instance
          const contractInstance = new web3.eth.Contract(ABI, contractAddress);
          setContract(contractInstance);

          // Network check
          const networkId = await web3.eth.net.getId();
          if (networkId !== 11155111) { // Check if connected to Sepolia
            alert("Please switch to the Sepolia network in MetaMask.");
          }
        } catch (error) {
          console.error("Error connecting to MetaMask:", error);
          alert("MetaMask connection failed. Please check and try again.");
        }
      } else {
        alert("Please install MetaMask to use this DApp!");
      }
    }

    loadWeb3();
  }, []);

  const registerVoter = async () => {
    setLoading(true);
    try {
      const voterAddressInput = voterAddress; // Get the inputted voter address
      await contract.methods.registerVoter(voterAddressInput).send({ from: account });
      alert("Voter registered successfully!");
    } catch (error) {
      console.error("Error registering voter:", error);
      alert("Failed to register voter.");
    }
    setLoading(false);
  };

  const addCandidate = async () => {
    setLoading(true);
    try {
      await contract.methods.addCandidate(candidateName).send({ from: account });
      alert("Candidate added successfully!");
      loadCandidates(contract);
    } catch (error) {
      console.error("Error adding candidate:", error);
      alert("Failed to add candidate.");
    }
    setLoading(false);
  };

  const voteForCandidate = async (candidateId) => {
    setLoading(true);
    try {
      await contract.methods.vote(candidateId).send({ from: account });
      alert("Vote cast successfully!");
      loadCandidates(contract);
    } catch (error) {
      console.error("Error voting for candidate:", error);
      alert("Failed to vote.");
    }
    setLoading(false);
  };

  const getWinner = async () => {
    setLoading(true);
    try {
      const winnerName = await contract.methods.getWinner().call();
      setWinner(winnerName);
    } catch (error) {
      console.error(error);
      alert("Failed to retrieve the winner.");
    }
    setLoading(false);
  };

  return (
    <div className="App">
      <header>
        <h1>Decentralized Voting DApp</h1>
        <p>Connected Account: {account}</p>
      </header>

      <section>
        <h2>Register Voter</h2>
        <input
          type="text"
          placeholder="Enter Voter Address"
          value={voterAddress}
          onChange={(e) => setVoterAddress(e.target.value)}
        />
        <button onClick={registerVoter} disabled={loading}>Register Voter</button>
      </section>

      <section>
        <h2>Add Candidate</h2>
        <input
          type="text"
          placeholder="Enter Candidate Name"
          value={candidateName}
          onChange={(e) => setCandidateName(e.target.value)}
        />
        <button onClick={addCandidate} disabled={loading}>Add Candidate</button>
      </section>

      <section>
        <h2>Vote for a Candidate</h2>
        {candidates.map((candidate, index) => (
          <div key={index}>
            <p>{candidate[0]}: {candidate[1]} (Votes: {candidate[2]})</p>
            <button onClick={() => voteForCandidate(candidate[0])} disabled={loading}>
              Vote
            </button>
          </div>
        ))}
      </section>

      <section>
        <h2>Get Winner</h2>
        <button onClick={getWinner} disabled={loading}>Get Winner</button>
        {winner && <p>The winner is: {winner}</p>}
      </section>

      {loading && <p>Loading...</p>}
    </div>
  );
}

export default App;



/*import React, { useState, useEffect } from "react";
import Web3 from "web3";
import "./App.css";

function App() {
  const [account, setAccount] = useState("");
  const [contract, setContract] = useState(null);
  const [candidates, setCandidates] = useState([]);
  const [voterAddress, setVoterAddress] = useState("");
  const [candidateName, setCandidateName] = useState("");
  const [winner, setWinner] = useState("");
  const [loading, setLoading] = useState(false);

  // Replace this with your Sepolia deployed contract address
  const contractAddress = "0xf8A1C20DDfF138c8C2766972560f237645ce802C"; 

  // Replace this with your contract's ABI
  const ABI = [ {
      "inputs": [],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "name",
          "type": "string"
        }
      ],
      "name": "addCandidate",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "admin",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "candidateCount",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "candidates",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "id",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "name",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "voteCount",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "endVoting",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "candidateId",
          "type": "uint256"
        }
      ],
      "name": "getCandidate",
      "outputs": [
        {
          "internalType": "string",
          "name": "name",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "voteCount",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getWinner",
      "outputs": [
        {
          "internalType": "string",
          "name": "winnerName",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "voter",
          "type": "address"
        }
      ],
      "name": "registerVoter",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "startVoting",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "totalVotes",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "candidateId",
          "type": "uint256"
        }
      ],
      "name": "vote",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "voters",
      "outputs": [
        {
          "internalType": "bool",
          "name": "isRegistered",
          "type": "bool"
        },
        {
          "internalType": "bool",
          "name": "hasVoted",
          "type": "bool"
        },
        {
          "internalType": "uint256",
          "name": "vote",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "votingOpen",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }
  ];  // Add your contract's ABI here

  useEffect(() => {
    async function loadWeb3() {
      if (window.ethereum) {
        try {
          // Request account access if needed
          await window.ethereum.request({ method: "eth_requestAccounts" });
          
          // Set up Web3
          window.web3 = new Web3(window.ethereum);
          const web3 = window.web3;

          // Get the list of accounts connected to MetaMask
          const accounts = await web3.eth.getAccounts();
          setAccount(accounts[0]);

          // Set the contract instance
          const contractInstance = new web3.eth.Contract(ABI, contractAddress);
          setContract(contractInstance);

          // Network check
          const networkId = await web3.eth.net.getId();
          if (networkId !== 11155111) { // Check if connected to Sepolia
            alert("Please switch to the Sepolia network in MetaMask.");
          }
        } catch (error) {
          console.error("Error connecting to MetaMask:", error);
          alert("MetaMask connection failed. Please check and try again.");
        }
      } else {
        alert("Please install MetaMask to use this DApp!");
      }
    }
    loadWeb3();
  }, []);

  const loadCandidates = async (contract) => {
    const candidateCount = await contract.methods.candidateCount().call();
    const candidatesArray = [];
    for (let i = 1; i <= candidateCount; i++) {
      const candidate = await contract.methods.getCandidate(i).call();
      candidatesArray.push(candidate);
    }
    setCandidates(candidatesArray);
  };

  const registerVoter = async () => {
    setLoading(true);
    try {
      await contract.methods.registerVoter(voterAddress).send({ from: account });
      alert("Voter registered successfully!");
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  const addCandidate = async () => {
    setLoading(true);
    try {
      await contract.methods.addCandidate(candidateName).send({ from: account });
      alert("Candidate added successfully!");
      loadCandidates(contract);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  const voteForCandidate = async (candidateId) => {
    setLoading(true);
    try {
      await contract.methods.vote(candidateId).send({ from: account });
      alert("Vote cast successfully!");
      loadCandidates(contract);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  const getWinner = async () => {
    setLoading(true);
    try {
      const winnerName = await contract.methods.getWinner().call();
      setWinner(winnerName);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  return (
    <div className="App">
      <header>
        <h1>Decentralized Voting DApp</h1>
        <p>Connected Account: {account}</p>
      </header>

      <section>
        <h2>Register Voter</h2>
        <input
          type="text"
          placeholder="Enter Voter Address"
          value={voterAddress}
          onChange={(e) => setVoterAddress(e.target.value)}
        />
        <button onClick={registerVoter} disabled={loading}>Register Voter</button>
      </section>

      <section>
        <h2>Add Candidate</h2>
        <input
          type="text"
          placeholder="Enter Candidate Name"
          value={candidateName}
          onChange={(e) => setCandidateName(e.target.value)}
        />
        <button onClick={addCandidate} disabled={loading}>Add Candidate</button>
      </section>

      <section>
        <h2>Vote for a Candidate</h2>
        {candidates.map((candidate, index) => (
          <div key={index}>
            <p>{candidate[0]}: {candidate[1]} (Votes: {candidate[2]})</p>
            <button onClick={() => voteForCandidate(candidate[0])} disabled={loading}>
              Vote
            </button>
          </div>
        ))}
      </section>

      <section>
        <h2>Get Winner</h2>
        <button onClick={getWinner} disabled={loading}>Get Winner</button>
        {winner && <p>The winner is: {winner}</p>}
      </section>

      {loading && <p>Loading...</p>}
    </div>
  );
}

export default App;
*/