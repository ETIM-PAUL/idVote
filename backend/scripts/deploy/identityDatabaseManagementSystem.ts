import { ethers, network } from "hardhat";
const { verify } = require("../../utils/verify");

async function main() {
  const iDMSContract = await ethers.deployContract(
    "IdentityDatabaseManagementSystem"
  );

  console.log("===========Deploying IDMS Contract================");
  await iDMSContract.waitForDeployment();

  console.log(`Voting System Contract Deployed at: ${iDMSContract.target}`);

  if (
    network.config.chainId === 84531 ||
    11155111 ||
    (5 && process.env.ETHERSCAN_API_KEY)
  ) {
    console.log("Waiting for block confirmations...");

    //wait for 10 block confirmations before verifying the transaction
    // @ts-ignore
    await iDMSContract.waitForDeployment(10);
    await verify(iDMSContract.target, []);
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
