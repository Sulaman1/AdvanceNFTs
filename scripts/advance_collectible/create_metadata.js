require("dotenv").config();
const fs = require('fs');
const helpFun = require("../helpful_scripts");
const AdvanceCollectibles = artifacts.require('AdvanceCollectibles')

var ipfsAPI = require('ipfs-api')
var ipfs = ipfsAPI({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' });

const path = require("path");


const metadataTemple = {
    "name": "",
    "description": "",
    "image": "",
    "attributes": [
        {
            "trait_type": "Strength",
            "value": 100
        }
    ]
};

//enum Breed{PUG, SHIBA_INU, ST_BERNARD}

module.exports = async callback => {

    console.log("Started Creating Metadata...")
    const advanceCollectible = await AdvanceCollectibles.deployed()
    length = await advanceCollectible.tokenCounter();
    console.log("length: ", length)
    tokenId = 0
    while (tokenId < length) {
        console.log("token id: ", tokenId)
        console.log('Let\'s get the overview of your character + 1 ' + tokenId + ' of ' + length)
        characterMetadata = metadataTemple;

        const breed = await advanceCollectible.gettokenIdToBreed(tokenId);
        console.log("My Dog Breed Num Is: ", breed);

        let breedName = helpFun.get_breed(breed)
        console.log("My Dog Breed Is: ", breedName);

        tokenId++
        characterMetadata['name'] = breedName;
        if (fs.existsSync('metadata/' + characterMetadata['name'].toLowerCase().replace(/\s/g, '-') + '.json')) {
            console.log('The Metadata file ' + characterMetadata['name'] + ' Exists ')
            continue
        }

        characterMetadata['description'] = 'An adorable ' + breedName + ' pup';

        let image_to_upload;

        //For setting the env variable "export UPLOAD_IPFS=true"...
        console.log("IPFS ready : ", process.env.UPLOAD_IPFS)
        if (process.env.UPLOAD_IPFS) {
            image_path = '../../img/' + breedName.toLowerCase() + '.png';
            image_to_upload = await upload_to_ipfs(image_path)

            console.log("Returned URI : ", image_to_upload);
            characterMetadata.image = image_to_upload;
            console.log("METADATA with uri : ", characterMetadata);

            filename = 'metadata/' + characterMetadata['name'].toLowerCase().replace(/\s/g, '-')
            let data = JSON.stringify(characterMetadata)
            fs.writeFileSync(filename + '.json', data)

            await upload_to_ipfs('../../' + filename + '.json');
        }

        // filename = 'metadata/' + characterMetadata['name'].toLowerCase().replace(/\s/g, '-')
        // let data = JSON.stringify(characterMetadata)
        // fs.writeFileSync(filename + '.json', data)
    }



    async function upload_to_ipfs(file_path) {
        //image_path2 = '../../img/pug.png'
        console.log("Started Uploading to IPFS...", file_path)

        var img = fs.readFileSync(path.join(__dirname, file_path))
        console.log(img)
        var imghash
        var filename
        try {
            var res = await ipfs.add(img);
            if (res) {
                imghash = res[0].hash;
            }
        } catch (err) {
            console.log("error while uploading", err);
        }

        filename = path.basename(file_path);
        uri = 'https://ipfs.io/ipfs/' + imghash + '?filename=' + filename;

        console.log(uri)
        return uri;
    }

    //{"Name":"pug.png","Hash":"QmPQAkiHwT3AnzKWKAqww4JvoVYLP1dh9Z11Rj6vBa4TBc","Size":"8645"}
    //curl -X POST -F file=@img/pug.png http://localhost:5001/api/v0/add

    function upload_to_ipfs2(filePath) {
        console.log("File Path: ", filePath)

        let data = new FormData();
        console.log("DataF : ", data)
        data.append("file", fs.createReadStream(filePath));

        console.log("Data : ", data);

        ipfs_url = "http://localhost:5001";

        const res = axios.post(ipfs_url + "/api/v0/add", data, {
            maxContentLength: "Infinity",
            headers: {
                "Content-Type": `multipart/form-data; boundary=${data._boundary}`
            },
        });
        console.log("Response Data : ", res.data);
    }

    function upload_to_ipfs3(filePath) {
        console.log("function image Path: ", filePath)
        fs.readFile(filePath, 'utf8', (err, data) => {
            console.log("Data : ", data)
            ipfs_url = "http://localhost:5001";

            fetch(ipfs_url + "/api/v0/add", data)
                .then(function (response) {
                    return response.json();
                })
                .then(function (myJson) {
                    document.querySelector("#ipText").innerHTML = myJson.ip;
                })
                .catch(function (error) {
                    console.log("Error: " + error);
                });

            response = request.post(ipfs_url + "/api/v0/add", files = { "file": data })
            console.log("Response: ", response.JSON())
        })
    }

    callback(advanceCollectible)
}
