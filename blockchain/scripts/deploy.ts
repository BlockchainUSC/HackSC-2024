import { ethers } from "hardhat";

async function main () {
  // We get the contract to deploy
 const crowdfund = await ethers.deployContract("Voting");

 console.log('Deploying Contract...');
 //Program waits until counter is deployed before moving onto next line of code
 await crowdfund.waitForDeployment();

 //prints the countract's target, its address on the blockchain
console.log(`Crowdfund deployed to: ${crowdfund.target}`);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });