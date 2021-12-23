const AdvanceCollectibles = artifacts.require('AdvanceCollectibles')
const helpFun = require('../helpful_scripts');
const Web3 = require("web3");

const dogMetadataDic = {
    "PUG": "https://ipfs.io/ipfs/QmR96XrhYvvj5ioguaVJmyFnrPHh417Zd3Jb9pGPZkadmv?filename=pug.json",
    "SHIBA_INU": "    https://ipfs.io/ipfs/QmUjQoBaQ39nupA8EW9PifghxYtJu1jqC2CQetYkVEudQW?filename=shiba_inu.json",
    "ST_BERNARD": "https://ipfs.io/ipfs/QmT2RMm3wSXU6itjmtvojzAqm1tvUv59spQ2qby4jGm7dd?filename=st_bernard.json"
}
const OPENSEA_FORMAT = "https://testnets.opensea.io/assets/"

module.exports = async callback => {
    const ACcontract = await AdvanceCollectibles.deployed();
    const tokens = await ACcontract.tokenCounter();
    console.log("number of tokens deployed : ", tokens);

    for (let token = 0; token < tokens; token++) {

        const breed = helpFun.get_breed(await ACcontract.tokenIdToBreed(token))
        console.log("Breed : ", breed);

        const URI = await ACcontract.tokenURI(token)
        const exists = URI.startsWith("https://")
        console.log("URI : ", URI)
        if (!exists) {
            console.log("Setting TokenURI of " + token + " And URI " + dogMetadataDic[breed] + "...");

            await setTokenuri(token, ACcontract, dogMetadataDic[breed])
        }
        else {
            console.log("We have already set the tokenURI of ", token)
        }
    }

    async function setTokenuri(token, contract, uri) {
        let myAccounts = await web3.eth.getAccounts();
        let dev = myAccounts[0];
        console.log("Dev Account: ", dev);

        const res = await contract.setTokenURI(token, uri, { from: dev });
        console.log("Result : ", res)
        const contractAdd = await contract.address;
        console.log("contract Address : ", contractAdd)

        console.log("Great!!! you can now see your NFT at " + OPENSEA_FORMAT + contractAdd + "/" + token);
        console.log("Please be patient, wait for 20 mins and hit 'refresh metadata' button")

    }
    callback(tokens)
}