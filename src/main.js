const Web3 = require("web3");
const ethers = require("ethers");
const ethProvider = require("eth-provider");
const { EVMcrispr } = require("@commonsswarm/evmcrispr");

const dao = "0x9a8B8BBb6Aa82550de6613989292f256420fa6Db";

const run = async () => {
  // we use 'eth-provider' so frame works as expected
  // unfortunatly it returns an web3 provider so we wrap this again
  // to make it work with ethers
  const provider = new ethers.providers.Web3Provider(
    new Web3(ethProvider())._provider
  );
  const signer = provider.getSigner();
  const crispr = new EVMcrispr(signer, 4);

  await crispr.connect(dao);

  await crispr.forward([
    crispr.installNewApp("agent:reserve"),
    crispr.addPermission(["token-manager", "agent:reserve", "TRANSFER_ROLE"]),
    { path: ["token-manager", "voting"] },
  ]);
};

run()
  .then(() => process.exit(0))
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
