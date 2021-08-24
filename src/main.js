const Web3 = require("web3");
const ethers = require("ethers");
const ethProvider = require("eth-provider");

tokenAddress = "0x68ea056d4fb87147a9a237c028b6b1476bf7b367";

const run = async () => {
  // we use 'eth-provider' so frame works as expected
  // unfortunatly it returns an web3 provider so we wrap this again
  // to make it work with ethers
  const provider = new ethers.providers.Web3Provider(
    new Web3(ethProvider())._provider
  );
  const signer = provider.getSigner();

  const token = new ethers.Contract(
    tokenAddress,
    ["function mint(address to, uint256 amount) public"],
    signer
  );
  await token.mint("0x" + "F".repeat(40), (1e18).toString());
};

run()
  .then(() => process.exit(0))
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
