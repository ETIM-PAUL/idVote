import { ethers } from "hardhat";
import { VOTING_SYSTEM_ADDRESS } from "../addresses/address";

async function main() {
  const votingSystemContract = await ethers.getContractAt(
    "IVotingSystem",
    VOTING_SYSTEM_ADDRESS
  );

  const electionId = 1;
  const candidateId = 1;

  await votingSystemContract.Vote(electionId, candidateId);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
