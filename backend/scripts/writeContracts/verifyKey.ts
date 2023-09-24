import { ethers } from "hardhat";
import { IDMS_ADDRESS, IDMS_USER } from "../addresses/address";

async function main() {
  const iDMSContract = await ethers.getContractAt(
    "IIdentityDatabaseManagementSystem",
    IDMS_ADDRESS
  );

  const bytes12 = "0x";
  const userAdress = IDMS_USER;

  await iDMSContract.verifyKey(bytes12, userAdress);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
