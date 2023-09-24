import { ethers } from "hardhat";
import { IDMS_ADDRESS, IDMS_USER } from "../addresses/address";

async function main() {
  const iDMSContract = await ethers.getContractAt(
    "IIdentityDatabaseManagementSystem",
    IDMS_ADDRESS
  );

  const userAdress = IDMS_USER;
  const nationalID = 123456;

  await iDMSContract.generateKey(userAdress, nationalID);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
