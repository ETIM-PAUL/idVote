import { ethers, network } from "hardhat";
import { IDMS_ADDRESS } from "../addresses/address";
const { verify } = require("../../utils/verify");

async function main() {
  const votingSystemContract = await ethers.deployContract("VotingSystem", [
    IDMS_ADDRESS,
  ]);

  console.log("===========Deploying VotingSystem Contract================");
  await votingSystemContract.waitForDeployment();

  console.log(
    `Voting System Contract Deployed at: ${votingSystemContract.target}`
  );

  if (
    network.config.chainId === 84531 ||
    11155111 ||
    (5 && process.env.ETHERSCAN_API_KEY)
  ) {
    console.log("Waiting for block confirmations...");

    //wait for 10 block confirmations before verifying the transaction
    // @ts-ignore
    await votingSystemContract.waitForDeployment(10);
    await verify(votingSystemContract.target, []);
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
