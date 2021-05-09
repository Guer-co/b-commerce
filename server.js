var http = require('http');
const Web3 = require('web3');

var server = http.createServer(function (req, res) {  
});

server.listen(5000); 

const fs = require('fs')
fs.createReadStream('./products_export_1.csv')
const Filestorage = require('@skalenetwork/filestorage.js');
const skaleNetwork = `https://eth-global-12.skalenodes.com:10584`;

async function upload(){
      let filestorage = new Filestorage("https://eth-global-12.skalenodes.com:10584");
      let account = "0xEA8474Fa18fF454ed6a69A86c76322edC982de02";
      let privateKey = "0x2a...";
      let file = "./a.txt";
      let path = "a.txt";
    fs.readFile(file, function(err, data) {
        if (err) throw err;
        const bytes = new Uint8Array(data);
        filestorage.uploadFile(
          account, 
          path, 
          bytes,
          privateKey
        ).catch(err => console.log(err.message) );
     });
    }    

    upload();


    async function getFiles(storagePath){
        const web3Provider = new Web3.providers.HttpProvider(
            "https://eth-global-12.skalenodes.com:10584"
        );
        let web3 = new Web3(web3Provider);
        let filestorage = new Filestorage(web3, true);
        let account = "0xEA8474Fa18fF454ed6a69A86c76322edC982de02";
        let files = await filestorage.listDirectory(storagePath).catch(err => console.log(err.message) );
        console.log(files);
      }
      
      getFiles("EA8474Fa18fF454ed6a69A86c76322edC982de02")

//const csv = require('csv-parser')
//const fs = require('fs')
//const results = [];
//fs.createReadStream('./products_export_1.csv')
//.pipe(csv())
//.on('data', (data) => results.push(data))
//.on('end', () => {
//    console.log(results);
//    //create new json file and store it
//});