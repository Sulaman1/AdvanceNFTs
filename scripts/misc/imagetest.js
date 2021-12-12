var ipfsAPI = require('ipfs-api')
var ipfs = ipfsAPI({ host: 'ipfs.infura.io', port:5001, protocol: 'https' });

const fs = require('fs');
const path = require("path");


module.exports = async callback => {

    image_path = './img/pug.png';
    image_path2 = '../../img/pug.png'
    var img = fs.readFileSync(path.join(__dirname, image_path2))
    console.log(img)
    var imghash
    var filename
    try {
        var res = await ipfs.add(img);
        if(res){
            imghash = res[0].hash;
        } 
    } catch(err) {
        console.log("error while uploading", err);
    }
    
    filename = path.basename(image_path2);
    uri = 'https://ipfs.io/ipfs/'+ imghash +'?filename='+ filename;

    console.log(uri)

  
callback(imghash)
}