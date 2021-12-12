const AdvanceCollectibles = artifacts.require("AdvanceCollectibles");
const LinkTokenInterface = artifacts.require("LinkTokenInterface");
//import truffle_config from '../../truffle-config.js';
const Web3 = require("web3")
const config = require("../../truffle-config.js");
const fund = require("../helpful_scripts");
//const fund_collectible = require("../advance_collectible/fund_collectible");

//const web3 = new Web3("http://127.0.0.1:8545")
//const web3 = new Web3('https://kovan.infura.io/v3/c5a0caa6b6bc4b9783e5ef0f055aa538');

// let link_token = await LinkTokenInterface(tokenAddress)

module.exports = async callback => {
    console.log("hello crypto");
    let myAccounts = await web3.eth.getAccounts();
    let dev = myAccounts[0];
    console.log("Dev Account: ", dev);

    try {
      const ac = await AdvanceCollectibles.deployed()
  
      const tokenAddress = await ac.LinkToken()
      console.log("Chainlink Token Address: ", tokenAddress)
     
      const link_token = await LinkTokenInterface.at(tokenAddress)
      console.log('LINK_TOKEN: ', link_token)
      
      console.log('Funding contract:', ac.address)
      const tx = await link_token.transfer(ac.address, '10000000000000000000', {"from" : dev});
      console.log(tx)
      //const tx = await token.transfer(ac.address, payment)
      callback(tx.tx)
    } catch (err) {
      callback(err)
    }
}



// module.exports = async callback => {
//     console.log("hello crypto");
//     //let net = await web3.eth.net.getNetworkType();
//     console.log(web3.utils.toChecksumAddress(config.networks.kovan.vrf_coordinator));
//     console.log(config.networks.kovan.keyhash);
    
//     let myAccounts = await web3.eth.getAccounts();
//     console.log(myAccounts)
//     let dev = myAccounts[0];
    
//     // let netid = await web3.eth.net.getId();
    
//     // let advance_collectible = await deployer.deploy(
//     //     AdvanceCollectibles, 
//     //     web3.utils.toChecksumAddress(config.networks.kovan.vrf_coordinator), 
//     //     web3.utils.toChecksumAddress(config.networks.kovan.link_token), 
//     //     config.networks.kovan.keyhash, 
//     //     {from: dev}
//     //     );


//     AdvanceCollectibles.deployed();

//     fund_advance_collectible(advance_collectible)
//     return advance_collectible;
// };


// async function fund_advance_collectible(nft_contract){
//     console.log("IN FUND ADVANCE FUNCTION");
//     let myAccounts = await web3.eth.getAccounts();
//     let dev = myAccounts[0];

//     let link_token = LinkTokenInterface(
//         web3.utils.toChecksumAddress(config.networks.kovan.link_token)
//     )
//     link_token.transfer(nft_contract, 1000000000000000000, {"from" : dev});
// }