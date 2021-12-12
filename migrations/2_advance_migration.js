const AdvanceCollectibles = artifacts.require("AdvanceCollectibles");

// //Kovan Network
// const vrf_coordinator = '0xdD3782915140c8f3b190B5D67eAc6dc5760C46E9';
// const link_token = '0xa36085F69e2889c224210F603D836748e7dC0088';
// const keyhash = '0x6c3699283bda56ad74f6b855546325b68d482e983852a7a82979cc4807b641f4';

//Rinkeby
const vrf_coordinator = '0xb3dCcb4Cf7a26f6cf6B120Cf5A73875B7BBc655B'
const link_token = '0x01be23585060835e02b77ef475b0cc51aa1e0709'
const keyhash = '0x2ed0feb3e7fd2022120aa84fab1945545a9f2ffc9076fd6156fa96eaff4c1311'



module.exports = async (deployer, network, [defaultAccount]) => {
    // hard coded for kovan
    if (network.startsWith('kovan')) {
      await deployer.deploy(AdvanceCollectibles, vrf_coordinator, link_token, keyhash)
      let ac = await AdvanceCollectibles.deployed()
    }
    else if (network.startsWith('rinkeby')) {
      await deployer.deploy(AdvanceCollectibles, vrf_coordinator, link_token, keyhash)
      let ac = await AdvanceCollectibles.deployed()
    } 
    else if (network.startsWith('mainnet')) {
      console.log("If you're interested in early access to Chainlink VRF on mainnet, please email vrf@chain.link")
    } else {
      console.log("Right now only rinkeby works! Please change your network to Rinkeby")
      // await deployer.deploy(DungeonsAndDragonsCharacter)
      // let dnd = await DungeonsAndDragonsCharacter.deployed()
    }
  }