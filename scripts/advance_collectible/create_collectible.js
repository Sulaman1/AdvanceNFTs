const AdvanceCollectiblesCont = artifacts.require("AdvanceCollectibles");
//import truffle_config from '../../truffle-config.js';
const Web3 = require("web3")
const config = require("../../truffle-config.js");
const helpFun = require("../helpful_scripts");
const HDWalletProvider = require('@truffle/hdwallet-provider');

//Changed to Rinkeby
const kovanurl = 'https://rinkeby.infura.io/v3/c5a0caa6b6bc4b9783e5ef0f055aa538'
const AdvanceCollectibles = require('../../build/contracts/AdvanceCollectibles.json');

const sleep = (milliseconds) => {
    console.log("Sleeping...")
    return new Promise(resolve => setTimeout(resolve, milliseconds))
}

module.exports = async callback => {

    const priKey = 'b8ed812a73ca25905a534c4afc5b0f5ba2b387727cf73e4700fe843dcb7971b6';
    console.log("Pri Key: ", priKey);

    const provider = new HDWalletProvider(priKey, kovanurl);      
    const web3 = new Web3(provider);
    
    console.log("hello crypto create collectible");
    let myAccounts = await web3.eth.getAccounts();
    console.log(myAccounts)
    const network = await web3.eth.net.getNetworkType();
    
    console.log("network: ", network);
    const networkId = await web3.eth.net.getId();
    console.log("networkId: ", networkId);
    const AdvanceCollectiblesData = await AdvanceCollectibles.networks[networkId];
    const contAdd = AdvanceCollectiblesData.address;
    console.log("Contract Address: ", contAdd)
    const advanceCollectible = new web3.eth.Contract(AdvanceCollectibles.abi, AdvanceCollectiblesData.address);
    const dev = myAccounts[0];
    console.log("Dev Account: ", dev);
    //const fromAdd = await web3.utils.toChecksumAddress('0xAaa25FB3d2b4617793Fa58fC1881F4bb76E6bd62');
    const oldV = await advanceCollectible.methods.checkEx().call();
    console.log("Old Value: ", oldV);
    
    const receipt = await advanceCollectible.methods.check4("next collectibles").send({from: dev});
    let transactionReceipt = null
    while (transactionReceipt == null) { // Waiting expectedBlockTime until the transaction is mined
        console.log("TransactionHash : ", receipt.transactionHash)
        transactionReceipt = await web3.eth.getTransactionReceipt(receipt.transactionHash);
        //await sleep(expectedBlockTime)
    }
    
    console.log("First Sleep Over");
    
    const newV = await advanceCollectible.methods.checkEx().call();
    console.log("New Value: ", newV);

    const results = await advanceCollectible.getPastEvents(
        'RequestCollectible',
       {
            fromBlock: 0,
            toBlock: 'latest'
        }
    )
    console.log("Event Result : ", results)
    
    //   await advanceCollectible.events.RequestCollectible({fromBlock: 0})
    //   .on('data', event => console.log("Second Event", event));

    const requestId = results[0].returnValues.requestId;
    console.log("TxEvents: ", receipt)
    console.log("Results: ", results);
    console.log("Request Id: ", requestId);
    
  //  await sleep(5000);
    
    const tokenId = await advanceCollectible.methods.getrequestIdToTokenId(requestId).call();
    console.log("Token Id: ", tokenId);
    const breed = await advanceCollectible.methods.gettokenIdToBreedStr(tokenId).call();
    console.log("Breed is: ", breed);
    // const myDogBreed = helpFun.get_breed(breed);
    // console.log("MY Dog Breed ISSS: ", myDogBreed);

    
    callback(receipt.tx)

    // const tx2 = await advance_collectible.createCollectible("The Chainlink Knight");
    // // const tx2 = await advance_collectible.createCollectible("The Chainlink Elf")
    // // const tx3 = await advance_collectible.createCollectible("The Chainlink Wizard")
    // // const tx4 = await advance_collectible.createCollectible("The Chainlink Orc")
 
    // console.log("TRANSACTION: ", tx2)
}
