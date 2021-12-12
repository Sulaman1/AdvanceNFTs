const AdvanceCollectibles = artifacts.require("AdvanceCollectibles");
const LinkTokenInterface = artifacts.require("LinkTokenInterface");
//import truffle_config from '../../truffle-config.js';
const Web3 = require("web3")
const config = require("../../truffle-config.js");
const fund = require("../helpful_scripts");

module.exports = async callback => {
    try{
        const myNft = await AdvanceCollectibles.deployed()
        
        const link_address = await myNft.LinkToken();
        console.log("Chainlink Token Address: ", link_address);
        const link_token = await LinkTokenInterface.at(link_address);
        
        console.log('Funding contract:', myNft.address)
        const tx = await link_token.transfer(myNft.address, '10000000000000000000')
      
        callback(tx.tx)
      } 
      catch (err) {
        callback(err)
      }
}