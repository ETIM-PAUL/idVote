import { ethers } from "hardhat";
import { VOTING_SYSTEM_ADDRESS } from "../addresses/address";

async function main() {
  const votingSystemContract = await ethers.getContractAt(
    "IVotingSystem",
    VOTING_SYSTEM_ADDRESS
  );

  const electionName = "web3Bridge";
  const [addr1, addr2, addr3] = await ethers.getSigners();

  await votingSystemContract.CreateElection(electionName, [
    addr1,
    addr2,
    addr3,
  ]);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
