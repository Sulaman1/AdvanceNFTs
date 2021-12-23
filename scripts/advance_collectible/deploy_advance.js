const AdvanceCollectibles = artifacts.require("AdvanceCollectibles");
const LinkTokenInterface = artifacts.require("LinkTokenInterface");
const Web3 = require("web3")
//import truffle_config from '../../truffle-config.js';
//const config = require("../../truffle-config.js");
//const fund = require("../helpful_scripts");
//const fund_collectible = require("../advance_collectible/fund_collectible");

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
    const tx = await link_token.transfer(ac.address, '10000000000000000000', { "from": dev });
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