const ethers = require("ethers");
const tokenABI = require("./abi").abi;
var provider, tokenContract, signerAddress; 
var tokenContractAddress = '0x9909e71d8a4d36a69C028bE8f7f1dB51B48498b7';

require('dotenv').config();

// INTITIALIZE WEB3
const initializeWeb3 = async () => {
  try {
    var url = process.env.PROVIDER; //""
    provider = new ethers.providers.JsonRpcProvider(url);
  } catch (error) {
    //console.log(":: INITIALIZE_WEB3 :: ERROR :: \n", error);
    return;
  }
};
// INITIALIZE TOKEN CONTRACT
const initializeTokenContract = async (signer) => {
  try {
    tokenContract = new ethers.Contract(tokenContractAddress, tokenABI, signer);
    signerAddress = signer.address;
  } catch (error) {
    //console.log(":: INITIALIZE_TOKEN_CONTRACT :: ERROR :: \n", error);
    return;
  }
};

// INITIALIZE SIGNER
const initializeSigner = async (email) => {
  try {

    //console.log(":asfsafsd", process.env.PRIVATE_KEY, provider)
    let wallet = new ethers.Wallet(
        process.env.PRIVATE_KEY,
        provider
    );
    //console.log("WALLET ::", process.env.PRIVATE_KEY);
    let walletSigner = wallet.connect(provider);
    //console.log("SIGNER ::", walletSigner);
    return walletSigner;
  } catch (error) {
    //console.log(":: INITIALIZE_SIGNER :: ERROR :: \n", error);
    return;
  }
};

// CREATE NFT
const uploadURI = async (URI, id) => {
    try {
      let promises = await Promise.all([
        initializeWeb3(),
        initializeTokenContract(await initializeSigner())
      ]);

      const productURI = await tokenContract.productURI(URI, id);
    //   console.log("sdgasfasfa", productURI)

    } catch (error) {
      console.log(":: CREATE_NFT :: ERROR :: ", error);
      return {
        status: false,
        data: {
          data: "Internal Server Error"
        }
      };
    }
  };

  uploadURI("ndvgrdthj",000000);

module.exports = {
initializeWeb3,
initializeSigner,
initializeTokenContract,
uploadURI
}