const hre = require("hardhat");

async function getBalance(addresss){
  const balanceBigInt = await hre.ethers.provider.getBalance(addresss);
  return hre.ethers.utils.formatEther(balanceBigInt);
}

async function consoleBalances(addresses){
  let counter = 0;
  for(const address of addresses){
    console.log(`Address ${counter} balance : `, await getBalance(address));
    counter++;
  }
}

async function consoleMemos(memos){
  for( const memo of memos){
    const name = memo.name;
    const message = memo.message;
    const timestamp = memo.timestamp;
    const from = memo.from;

    console.log(`At ${timestamp}, name - ${name}, from - ${from}, message - ${message}`);
  }
}

async function main() {
   
  const [owner, from1, from2, from3] = await hre.ethers.getSigners();
  const chai = await hre.ethers.getContractFactory("chai");
  const contract = await chai.deploy();
  await contract.deployed();

  console.log(`Address of contract : `, contract.address);

  const addresses = [owner.address,from1.address,from2.address,from3.address];
  console.log(`Before buying chai`);
  await consoleBalances(addresses);

  const amount = {value: hre.ethers.utils.parseEther("1")};
  await contract.connect(from1).buyChai("rgHanks","Nice Chai",amount);
  await contract.connect(from2).buyChai("rgHanks","Nice Chai",amount);
  await contract.connect(from3).buyChai("rgHanks","Nice Chai",amount);

  console.log(`After buying chai`);
  await consoleBalances(addresses);


  const memos = await contract.getMemos();
  consoleMemos(memos);


}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
