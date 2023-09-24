import { ethers } from "hardhat";
import {
  IDMS_ADDRESS,
  VOTING_SYSTEM_ADDRESS,
  IDMS_USER,
} from "../addresses/address";

async function main() {
  const votingSystemContract = await ethers.getContractAt(
    "IVotingSystem",
    VOTING_SYSTEM_ADDRESS
  );

  const iDMSContract = await ethers.getContractAt(
    "IIdentityDatabaseManagementSystem",
    IDMS_ADDRESS
  );

  const userAddress = await ethers.getImpersonatedSigner(IDMS_USER);
  const nationalIdentityNumber = 234;
  const electionId = 1;

  const hashKey = await iDMSContract
    .connect(userAddress)
    .generateKey(userAddress, nationalIdentityNumber);

  console.log(hashKey);

  const registerVoter = await votingSystemContract.registerVoter(
    hashKey,
    electionId
  );

  await registerVoter;
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
