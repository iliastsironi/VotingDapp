const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Voting Contract", function () {
  let Voting;
  let voting;
  let admin;
  let voter1;
  let voter2;

  beforeEach(async function () {
    // Get the contract factory
    Voting = await ethers.getContractFactory("Voting");

    // Get the signers (accounts)
    [admin, voter1, voter2] = await ethers.getSigners();

    // Deploy the contract instance using the admin account
    voting = await Voting.connect(admin).deploy();

    // Wait for the contract deployment to finish
    await voting.deployed();
  });

  it("should allow the admin to add a candidate", async function () {
    // Add a candidate using the admin account
    await voting.connect(admin).addCandidate("Alice");

    // Retrieve the candidate details
    const candidate = await voting.getCandidate(1);

    // Assert the candidate's name is "Alice"
    expect(candidate.name).to.equal("Alice");
  });
});
