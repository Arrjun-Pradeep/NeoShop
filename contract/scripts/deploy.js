const hre = require("hardhat");

async function main() {

  const Payment = await hre.ethers.getContractFactory("Payment");
  const payment = await Payment.deploy();
  await payment.deployed();
  console.log(":: PAYMENT :: ", payment.address);
  
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });