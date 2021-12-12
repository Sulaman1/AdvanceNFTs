//const LinkTokenInterface = require("LinkTokenInterface.sol");
//const LinkTokenInterface = artifacts.require("LinkTokenInterface");
//import LinkTokenInterface from "../contracts/LinkTokenInterface.sol";
//import truffle_config from '../../truffle-config.js';
const Web3 = require("web3")
const config = require("../truffle-config")

//const web3 = new Web3("http://127.0.0.1:8545")
//const web3 = new Web3('https://kovan.infura.io/v3/c5a0caa6b6bc4b9783e5ef0f055aa538');


function get_breed(breed_number){
    console.log("BREED SCRIPT : ", breed_number)
    breed = {0: 'PUG', 1: 'SHIBA_INU', 2: 'ST_BERNARD'}
    return breed[breed_number];
}

module.exports = { get_breed };


// async function fund_advance_collectible(nft_contract){
//     console.log("IN FUND ADVANCE FUNCTION");
//     let myAccounts = await web3.eth.getAccounts();
//     let dev = myAccounts[0];

//     let link_token = LinkTokenInterface(
//         web3.utils.toChecksumAddress(config.networks.kovan.link_token)
//     )
//     link_token.transfer(nft_contract, 1000000000000000000, {"from" : dev});
// }

// module.exports = async (deployer, networks, accounts) => {
//     console.log("hello crypto");
//     let myAccounts = await web3.eth.getAccounts();
//     let dev = myAccounts[0];

//     let link_token = LinkTokenInterface(
//         web3.utils.toChecksumAddress(config.networks.kovan.link_token)
//     )
//     link_token.transfer();
//     console.log(web3.utils.toChecksumAddress(config.networks.kovan.vrf_coordinator));

// };