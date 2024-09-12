// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

// Uncomment this line to use cons//import{"hardhat/console.sol"};

contract Voting {
    struct Candidate {
        uint id;
        string name;
        uint voteCount;
    }

    struct Voter {
        bool isRegistered;
        bool hasVoted;
        uint vote;
    }

    address public admin;
    bool public votingOpen;
    uint public candidateCount;
    mapping(uint => Candidate) public candidates;
    mapping(address => Voter) public voters;
    uint public totalVotes;
    uint yo;

    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can execute");
        _;
    }

    modifier onlyDuringVoting() {
        require(votingOpen == true, "Voting is not open");
        _;
    }

    modifier onlyRegisteredVoters() {
        require(voters[msg.sender].isRegistered == true, "You are not registered");
        _;
    }

    constructor() {
        admin = msg.sender;
        votingOpen = false;
    }

    function startVoting() public onlyAdmin() {
        votingOpen = true;
    }

    function endVoting() public onlyAdmin() {
        votingOpen = false;
    }

    function registerVoter(address voter) public onlyAdmin {
        require(voters[voter].isRegistered == false, "Voter is already registered.");
        voters[voter].isRegistered = true;
    }

    function addCandidate(string memory name) public onlyAdmin {
        candidateCount++;
        candidates[candidateCount] = Candidate(candidateCount, name, 0);
    }

    function vote(uint candidateId) public onlyRegisteredVoters onlyDuringVoting {
        require(!voters[msg.sender].hasVoted, "You have already voted.");
        require(candidateId > 0 && candidateId <= candidateCount, "Invalid candidate.");

        voters[msg.sender].hasVoted = true;
        voters[msg.sender].vote = candidateId;

        candidates[candidateId].voteCount++;
        totalVotes++;
    }

    function getCandidate(uint candidateId) public view returns (string memory name, uint voteCount) {
        require(candidateId > 0 && candidateId <= candidateCount, "Invalid candidate.");
        Candidate memory candidate = candidates[candidateId];
        return (candidate.name, candidate.voteCount);
    }

    function getWinner() public view returns (string memory winnerName) {
        uint highestVoteCount = 0;
        uint winningCandidateId;
        for (uint i = 1; i <= candidateCount; i++) {
            if (candidates[i].voteCount > highestVoteCount) {
                highestVoteCount = candidates[i].voteCount;
                winningCandidateId = i;
            }
        }
        return candidates[winningCandidateId].name;
    }
}
