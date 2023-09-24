import { ethers } from "hardhat";
import { IDMS_ADDRESS } from "../addresses/address";

async function main() {
  const iDMSContract = await ethers.getContractAt(
    "IIdentityDatabaseManagementSystem",
    IDMS_ADDRESS
  );

  const name = "Mars Ifeanyi";
  const dateOfBirth = 12;
  const nationalID = 1234;
  const phrase = "yes123456";

  await iDMSContract.createUser(name, dateOfBirth, nationalID, phrase);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
