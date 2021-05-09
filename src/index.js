import React, { useState, useEffect } from 'react';
//import { Route,BrowserRouter  } from 'react-router-dom';
import ReactDOM from 'react-dom';
import { Button,TextField, Dialog,DialogTitle,DialogActions,Grid,FormControl,Select,MenuItem,Backdrop,CircularProgress,Container} from '@material-ui/core';
import './App.css';
//import App from './App';
import Web3 from 'web3';
import { GUER_ABI,GUER_ADDRESS } from './config';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import "fontsource-barlow"
import "fontsource-barlow-condensed"
import CoinExchange from './images/exchange.png'
import Web3Modal from "web3modal";
import Torus from "@toruslabs/torus-embed";
require('dotenv').config()

const Filestorage = require('@skalenetwork/filestorage.js');
const skaleNetwork = `https://eth-global-12.skalenodes.com:10584`;
const IPFS = require('ipfs-http-client');


const providerOptions = {
    torus: {
      package: Torus, 
      options: {
        networkParams: {
          host: "https://localhost:8545", 
          chainId: 1337, 
          networkId: 1337
        },
        config: {
          buildEnv: "development" 
        }
      }
    }
  };

const web3Modal = new Web3Modal({
    network: "mainnet", // optional
    cacheProvider: true, // optional
    providerOptions // required
  });
  

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

const theme = createMuiTheme({
  palette: {
      type: "light"
  },
});

function Index(props) {
const [guer, setGuer] = useState('');
const [loading, setLoading] = useState(false);
const [mynetwork, setMynetwork] = useState('');
const [myaccount, setMyaccount] = useState('');
const [mybalance, setMybalance] = useState('');
const [nftinfo, setNftinfo] = useState();
const [mynft, setMynft] = useState();

const [web3, setWeb3] = useState('');
const [logo, setLogo] = useState();
const [company, setCompany] = useState();
const [companydescription, setCompanydescription] = useState();
const [hero, setHero] = useState();
const [product1image,setProduct1image] = useState();
const [product1title,setProduct1title] = useState();
const [product1description,setProduct1description] = useState();
const [product1price,setProduct1price] = useState();
//const [product1item,setProduct1item] = useState();
const [product2image,setProduct2image] = useState();
const [product2title,setProduct2title] = useState();
const [product2description,setProduct2description] = useState();
const [product2price,setProduct2price] = useState();
//const [product2item,setProduct2item] = useState();
const [product3image,setProduct3image] = useState();
const [product3title,setProduct3title] = useState();
const [product3description,setProduct3description] = useState();
const [product3price,setProduct3price] = useState();
//const [product3item,setProduct3item] = useState();
const [theme,setTheme] = useState();
const [modalproducttitle, setModalproducttitle] = useState('');
const [modalproductimage, setModalproductimage] = useState('');
const [modalproductdescription, setModalproductdescription] = useState('');
const [modalproductprice, setModalproductprice] = useState('');
const [typedstoreaddress, setTypedstoreaddress] = useState('');
const [selectedstoreaddress, setSelectedstoreaddess] = useState('QmW8DyNE3fiaXNSasYsRduksTVQoARcuWyXTxx4n13VBAh');
const [ethprice, setEthprice] = useState('');
const [useethprice, setUseethprice] = useState(false);
const [fullscreenload, setFullscreenload] = useState(false);
const [openconnectmodal, setOpenconnectmodal] = useState(false);
const [openhelpmodal, setOpenhelpmodal] = useState(false);
const [openstoresmodal, setOpenstoresmodal] = useState(false);
const [openbuymodal, setOpenbuymodal] = useState(false);
const [openproductmodal, setOpenproductmodal] = useState(false);
const [web3test, setWeb3test] = useState(0);
//const [name, setName] = useState('');
//const [email, setEmail] = useState('');
const [mobile, setMobile] = useState('');
//const [companyemail,setCompanyemail] = useState();
//const [companyaddress,setCompanyaddress] = useState();
//const [companyphone,setCompanyphone] = useState();

const classes = useStyles();

const web3Check = async () => {
    if (window.ethereum) {
        window.ethereum.autoRefreshOnNetworkChange = false;
        try {
            await web3Modal.connect();
            //const provider = await web3Modal.connect();
            //await window.ethereum.enable()
            setWeb3test(1)
        } catch (error) {
            alert("You need to allow access to your metamask to use the app.");
        }
    }
}

const createNft = async () =>{
        if (window.ethereum) {
            window.ethereum.autoRefreshOnNetworkChange = false;
            try {
                await window.ethereum.enable()
            } catch (error) {
                alert("You need to allow access to your metamask to use the app.");
            }
        }
        setLoading(true);
        guer.methods.createNFT('.', '.', '.', '.').send({
            from: myaccount
        })
        .then(function(result){
            console.log(result);
            window.location.reload(false);
        }).catch(function(error){
            console.log(error);
    });
    setLoading(false);
};

const buyProduct = async () => {
    setLoading(true);
    web3.eth.sendTransaction({
        from:myaccount, to:`${process.env.PUBLICKEY}`, value: web3.utils.toWei((modalproductprice/ethprice).toString(), "ether")
    })
    .on('receipt', function(receipt){
        fetch('https://cloudflare-ipfs.com/ipfs/' + 'QmPyqNiyvU7AczhJnMof8San4juUGeLM1aGZAVK97MhK84')
          .then(resp => resp.blob())
          .then(blob => {
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.style.display = 'none';
            a.href = url;
            a.download = 'your-guer-purchased-file.jpg';
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);    
          })
    })
    .on('error', function(error){
        alert('youdidntpay!');
        console.log(error);
    });

    setLoading(false);
};

const handleClose = () => {
    setOpenconnectmodal(false);
    setOpenbuymodal(false);
    setOpenstoresmodal(false);
    setOpenhelpmodal(false);
    setOpenproductmodal(false);
};

const handleToggle = () => {
    setFullscreenload(!fullscreenload);
};

const handleCurrency = () => {
    setUseethprice(!useethprice);
};

const uploadJson = async (e) => {
    const data = {"company": "PLACEHOLDER STORE",
    "companynamedescription": "ITS A PLACEHOLDER STORE",
    "companydescription": "Hi. I'm a placeholder. The default information you see on this site before you click 'Select Store' at the top right and choose a decentralized storefront to visit.",
    "companyemail": "mast@guer.co",
    "companyphone": "555-555-5555",
    "companyaddress": "5 Lido Beach Way Isla Paradiso<br/> Panama City<br/> Panama",
    "logo": "QmTN7jbXKSBdUcecMXAksMAweHSnQYicyhrRwJNn1uwzgh",
    "hero": "QmREpdvD4fpSxAZDeAUj6SDLhq6tCeRopM225iEQU9qYWU",
    "smalllogo": "QmTN7jbXKSBdUcecMXAksMAweHSnQYicyhrRwJNn1uwzgh",
    "favicon": "QmTN7jbXKSBdUcecMXAksMAweHSnQYicyhrRwJNn1uwzgh",
    "aboutimage": "QmWBUPgkgpGMaSi9fn85KssDaGikcxPggrg8dkNXqce2rf",
    "contactimage": "QmWBUPgkgpGMaSi9fn85KssDaGikcxPggrg8dkNXqce2rf",
    "product1pic": "QmbDBAKsZaWQHcCLvMn3bJhHSR8zAmtTNqsry6fnmNJfPE",
    "product1title": "Product#1",
    "product1description": "This is the first product I am offering, it costs $10",
    "product1price": "10",
    "product2pic": "QmbDBAKsZaWQHcCLvMn3bJhHSR8zAmtTNqsry6fnmNJfPE",
    "product2title": "Product#2",
    "product2description": "This is the first product I am offering, it costs $20",
    "product2price": "12",
    "product3pic": "QmbDBAKsZaWQHcCLvMn3bJhHSR8zAmtTNqsry6fnmNJfPE",
    "product3title": "Product#3",
    "product3description": "This is the first product I am offering, it costs $30",
    "product3price": "8",
    "theme":"light"
    }

    const readydata = JSON.stringify(data);
    const ipfs = new IPFS({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' })
    const upload = await ipfs.add(readydata);
    };

if (web3 === ''){
    setWeb3(new Web3(Web3.givenProvider));
}

async function upload(event, specificDirectory=''){


    event.preventDefault();
    const web3Provider = new Web3.providers.HttpProvider(
        skaleNetwork
    );
    let web3 = new Web3(web3Provider);
    let filestorage = new Filestorage(web3, true);
    let privateKey = ``;
    let account = `0xEA8474Fa18fF454ed6a69A86c76322edC982de02`;
    let file = document.getElementById('files').files[0];
    let reader = new FileReader();
    let bytes;

    //await filestorage.reserveSpace('0xEA8474Fa18fF454ed6a69A86c76322edC982de02', 1000000)


    reader.onload = async function(e) {
      const arrayBuffer = reader.result
      bytes = new Uint8Array(arrayBuffer);
      console.log(account);
      console.log(file.name);
      console.log(bytes);
      console.log(privateKey);
      await filestorage.uploadFile(account, file.name, bytes, '').catch(err => console.log(err.message) );

    };
    reader.readAsArrayBuffer(file);

  }


async function getFiles(storagePath){
    //create web3 connection
    const web3Provider = new Web3.providers.HttpProvider(skaleNetwork);
    let web3 = new Web3(web3Provider);
    let filestorage = new Filestorage(web3, true);
    let account = `0xEA8474Fa18fF454ed6a69A86c76322edC982de02`;
    let files = await filestorage.listDirectory(storagePath).catch(err => console.log(err.message) );
    console.log('files');
    console.log(files);
  }
  const storagePath = `EA8474Fa18fF454ed6a69A86c76322edC982de02`;
  getFiles(storagePath);


  async function downloadFileToDesktop(storagePath) {
    //create web3 connection
    const web3Provider = new Web3.providers.HttpProvider(
        skaleNetwork
    );
    let web3 = new Web3(web3Provider);
    //get filestorage instance
    let filestorage = new Filestorage(web3, true);
    await filestorage.downloadToFile(storagePath);
  }

  async function downloadFileToVariable(storagePath) {
    //create web3 connection
    const web3Provider = new Web3.providers.HttpProvider(
        skaleNetwork
    );
    let web3 = new Web3(web3Provider);
    //get filestorage instance
    let filestorage = new Filestorage(web3, true);
    let file = await filestorage.downloadToBuffer(storagePath);
    file = 'data:image/png;base64,' + file.toString('base64');
  }

  async function createDirectory(directoryPath) {
    const web3Provider = new Web3.providers.HttpProvider(skaleNetwork);
    let web3 = new Web3(web3Provider);
    let filestorage = new Filestorage(web3, true);
    let privateKey = `${process.env.PRIVATEKEY}`;
    let account = `${process.env.PUBLICKEY}`;
    console.log('createdirectory');
    await filestorage.createDirectory(account, directoryPath, privateKey).catch(err => console.log(err.message) );
}

const uploadFile = async () => {
console.log('upload');
    const ipfs = new IPFS({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' })
    const file = document.getElementById("data_file").files[0];
    const upload = await ipfs.add(file);
    console.log(upload);
}

const getStoreData = async (address) => {
    if (address.length > 5) {
        let fileaddress = '';
        if (address.startsWith("Q") && (address.length > 40)) {
            setTypedstoreaddress('');
            fileaddress = address;
            console.log(fileaddress);
        }
        else if (address.length > 4 && address.length < 30)  {
            web3.eth.ens.getAddress('ethereum.eth').then(function (address) {
                console.log("address of ens :" + address);
                if (address.length > 1){
                fileaddress = address;
                }
                else {
                    alert ('no store associated with ens address');
                    return false;
                }
            })
        }
        else {
            console.log(address);
            fileaddress = await guer.methods.doGetMarketplaceJson(address).call({from:myaccount});
            console.log(fileaddress);
            if (fileaddress === '') {
                alert("sorry, that account has no store");
                fileaddress = 'QmXzcrZNauW8Bue2qq6KgNzupGGunp3SE3EBMkuZn2gUgd';
                console.log(fileaddress);
            }
        }
        setLoading(true);
        fetch("https://cloudflare-ipfs.com/ipfs/" + fileaddress)
        .then(res => res.json())
        .then(
            (result) => {
                setCompany(result.company);
                setHero(result.hero);
                //setCompanyemail(result.companyemail);
                setCompanydescription(result.companydescription);
                //setCompanyaddress(result.companyaddress);
                //setCompanyphone(result.companyphone);
                setProduct1image(result.product1pic);
                setProduct1title(result.product1title);
                setProduct1price(result.product1price);
                setProduct1description(result.product1description);
                setProduct2image(result.product2pic);
                setProduct2title(result.product2title);
                setProduct2price(result.product2price);
                setProduct2description(result.product2description);
                setProduct3image(result.product3pic);
                setProduct3title(result.product3title);
                setProduct3price(result.product3price);
                setProduct3description(result.product3description);
                setLogo(result.logo);
                setTheme(result.theme);
            })
        setLoading(false);
    }
}

useEffect(() => {
    if (typedstoreaddress === '' && selectedstoreaddress === 'QmW8DyNE3fiaXNSasYsRduksTVQoARcuWyXTxx4n13VBAh')
    {
    fetch("https://cloudflare-ipfs.com/ipfs/QmW8DyNE3fiaXNSasYsRduksTVQoARcuWyXTxx4n13VBAh")
    .then(res => res.json())
    .then(
        (result) => {
            setCompany(result.company);
            setHero(result.hero);
            //setCompanyemail(result.companyemail);
            setCompanydescription(result.companydescription);
            //setCompanyaddress(result.companyaddress);
            //setCompanyphone(result.companyphone);
            setProduct1image(result.product1pic);
            setProduct1title(result.product1title);
            setProduct1price(result.product1price);
            setProduct1description(result.product1description);
            setProduct2image(result.product2pic);
            setProduct2title(result.product2title);
            setProduct2price(result.product2price);
            setProduct2description(result.product2description);
            setProduct3image(result.product3pic);
            setProduct3title(result.product3title);
            setProduct3price(result.product3price);
            setProduct3description(result.product3description);
            setLogo(result.logo);
            setTheme(result.theme);
        })
    }
    const getEthPrice = async () => {
        if (ethprice === '') {
        await fetch('https://api.coingecko.com/api/v3/coins/ethereum', {method:"GET",headers:{'Access-Control-Allow-Origin':'*','Content-Type': 'application/json'}})
        .then((resp) => resp.json())
        .then(resp => {setEthprice(resp['tickers'][0].last);console.log(resp['tickers'][0].last)});
        }
    }
    const loadEthereumData = async () => {
        if (myaccount === '' && web3.currentProvider.isMetaMask === true) {
            console.log(`${process.env.REACT_APP_SKALENETWORK}`)
            setFullscreenload(true);
            const network = await web3.eth.net.getNetworkType();
            setMynetwork(network);
            const account = await web3.eth.getAccounts();
            if (account.length > 0 || account[0]) {
            setMyaccount(account[0]);
            const balance = await web3.eth.getBalance(account[0]);
            setMybalance(balance);
            const guerABI = await new web3.eth.Contract(GUER_ABI, GUER_ADDRESS);
            setGuer(guerABI);
            //console.log(account[0]);
            const nftArray = await guerABI.methods.getUserNFTs().call({from:account[0]});
            console.log(nftArray);

            if (nftArray.length > 0) {
                const nftinfoblock = await guerABI.methods.getNFTInfo(nftArray[0]).call({from:account[0]});
                setMynft(nftinfoblock[0]);
                return true;
            }
            return false;
            }
        }
        }
    getEthPrice();
    loadEthereumData();
    setFullscreenload(false);
},[web3,myaccount,mynft,modalproducttitle,loading,web3test,ethprice,selectedstoreaddress,typedstoreaddress]);

return(
    <Container maxWidth="md" className="App main-background">
    <header className="App-header">
          <Backdrop className={classes.backdrop} open={fullscreenload} onClick={handleClose}>
            <CircularProgress color="inherit" />
          </Backdrop>
        <Grid container  style={{backgroundColor:'white'}}>
            <Grid item sm={3} style={{textAlign: 'left'}}>
                <a href="/" style={{color:'white'}} >
                    <img alt="logo" style={{maxHeight:'200px',margin:'10px'}} src={logo ? "https://cloudflare-ipfs.com/ipfs/" + logo : "https://cloudflare-ipfs.com/ipfs/QmTN7jbXKSBdUcecMXAksMAweHSnQYicyhrRwJNn1uwzgh"}/>
                </a>
            </Grid>
            <Grid item sm={6} style={{display: "flex",verticalAlign:'middle',alignItems: 'center',margin:'10px'}}>
                <h1 style={{display:"inline-block",verticalAlign:'middle',textAlign:'center',margin:'auto',color:'#1D3557'}}>{company ? company : "PLACEHOLDER STORE"}</h1>
            </Grid>
            <Grid item sm={2} style={{verticalAlign:'middle',alignItems: 'right',margin:'10px', textAlign: 'right'}}>
                <div>
                <Button className="pulse" style={{backgroundColor:'#1D3557',border:'1px solid white', borderRadius:'8px',padding:'5px 20px',width:'150px',color:'white'}} onClick={() => setOpenstoresmodal(true)}>SELECT STORE</Button>
                </div>
                <br/>
                <div>
                <Button style={{backgroundColor:'#1D3557',border:'1px solid white', borderRadius:'8px',padding:'5px 20px',width:'150px',color:'white'}} onClick={() => {web3Check();setOpenconnectmodal(true)}}>{nftinfo ? "CONNECTED" : "CONNECT"}</Button>
                </div>
                <br/>
                <div>
                <Button style={{backgroundColor:'#1D3557',border:'1px solid white', borderRadius:'8px',padding:'5px 20px',width:'150px',color:'white'}} onClick={() => setOpenhelpmodal(true)}>LEARN MORE</Button>
                </div>

            </Grid>
        </Grid>
    </header>
        <div style={{textAlign:"center"}}>
        <Grid container spacing={1}>
            <Grid container spacing={1} style={{backgroundColor:'#1D3557',margin:'0px',border:'2px solid gray'}}>
                <Grid item sm={3} style={{color:'white'}}><h5>Home</h5></Grid>
                <Grid item sm={3} style={{color:'white'}}><h5>About Us</h5></Grid>
                <Grid item sm={3} style={{color:'white'}}><h5>Contact Us</h5></Grid>
                <Grid item sm={3} style={{color:'white'}}><h5>Shop</h5></Grid>
            </Grid>
            <Grid item sm={12} style={{backgroundColor:'#fff'}}>
                <img alt="hero" style={{maxHeight:'450px',width:'90%'}} src={hero ? "https://cloudflare-ipfs.com/ipfs/" + hero : "https://cloudflare-ipfs.com/ipfs/QmREpdvD4fpSxAZDeAUj6SDLhq6tCeRopM225iEQU9qYWU"} />
            </Grid>
        </Grid>
        <Grid container spacing={1} style={{backgroundColor:'#fff'}}>
            <Grid item sm={12}>
                <hr />
            </Grid>
        </Grid>
        <Grid container spacing={1} justify="center"  style={{backgroundColor:'#fff'}}>
            <Grid item sm={6} style={{textAlign:'left'}}>
                <h2 className="subheader">SHOP</h2>
            </Grid>
            <Grid item sm={6} style={{textAlign:'right'}}>
                <h5 title="Not complete yet" style={{marginRight:'30px',marginTop:'5px',color:'#707070'}}>{'See All >'}</h5>
            </Grid>
        </Grid>
        <Grid container spacing={1} style={{backgroundColor:'#fff'}}>
            <Grid item sm={4}>
                <div  className="productdiv">
                    <img alt="prod1" className="productimage" onClick={
                    () => {setModalproducttitle(product1title);setModalproductimage(product1image);setModalproductdescription(product1description);setModalproductprice(product1price);setOpenproductmodal(true)}}
                    src={product1image ? "https://cloudflare-ipfs.com/ipfs/" + product1image : "https://cloudflare-ipfs.com/ipfs/QmbDBAKsZaWQHcCLvMn3bJhHSR8zAmtTNqsry6fnmNJfPE"}/>
                    <div className="productheader">
                    <h5>{product1title ? product1title : "Product#1"}</h5>
                    </div>
                    <p className="productdescription">{product2description ? product2description : "This is the first product I am offering, it costs $10"}</p>
                    <div className="productfees">
                        <img alt="coinexchange" src={CoinExchange} style={{width:'30px',display:'table-cell'}} onClick={() => handleCurrency()}/>
                        <span className="productprice">{product1price ? !useethprice ? "USD $" + product1price : "ETH " + (product1price/ethprice).toFixed(6) : "FREE"}</span>
                        <button className="buybutton" 
                            onClick={() => {setModalproducttitle(product1title);setModalproductimage(product1image);setModalproductdescription(product1description);setModalproductprice(product1price);setOpenbuymodal(true)}}
                        >BUY</button>
                    </div>
                </div>
            </Grid>
            <Grid item sm={4}>
                <div  className="productdiv">
                    <img alt="prod2" className="productimage" onClick={
                    () => {setModalproducttitle(product2title);setModalproductimage(product2image);setModalproductdescription(product2description);setModalproductprice(product2price);setOpenproductmodal(true)}}
                    src={product2image ? "https://cloudflare-ipfs.com/ipfs/" + product2image : "https://cloudflare-ipfs.com/ipfs/QmbDBAKsZaWQHcCLvMn3bJhHSR8zAmtTNqsry6fnmNJfPE"}/>
                    <div className="productheader">
                    <h5>{product2title ? product2title : "Product#2"}</h5>
                    </div>
                    <p className="productdescription">{product2description ? product2description : "This is the first product I am offering, it costs $20"}</p>
                    <div className="productfees">
                        <img alt="coinexchange" src={CoinExchange} style={{width:'30px',display:'table-cell'}} />
                        <span className="productprice">{product2price ? !useethprice ? "USD $" + product2price : "ETH " + (product2price/ethprice).toFixed(6) : "FREE"}</span>
                        <button className="buybutton" 
                            onClick={() => {setModalproducttitle(product2title);setModalproductimage(product2image);setModalproductdescription(product2description);setModalproductprice(product2price);setOpenbuymodal(true)}}
                        >BUY</button>
                    </div>
                </div>
            </Grid>
            <Grid item sm={4}>
                <div  className="productdiv">
                    <img alt="prod3" className="productimage" onClick={
                    () => {setModalproducttitle(product3title);setModalproductimage(product3image);setModalproductdescription(product3description);setModalproductprice(product3price);setOpenproductmodal(true)}}
                    src={product3image ? "https://cloudflare-ipfs.com/ipfs/" + product3image : "https://cloudflare-ipfs.com/ipfs/QmbDBAKsZaWQHcCLvMn3bJhHSR8zAmtTNqsry6fnmNJfPE"}/>
                    <div className="productheader">
                    <h5>{product3title ? product3title : "Product#3"}</h5>
                    </div>
                    <p className="productdescription">{product3description ? product3description : "This is the first product I am offering, it costs $30"}</p>
                    <div className="productfees">
                        <img alt="coinexchange" src={CoinExchange} style={{width:'30px',display:'table-cell'}} />
                        <span className="productprice">{product3price ? !useethprice ? "USD $" + product3price : "ETH " + (product3price/ethprice).toFixed(6) : "FREE"}</span>
                        <button className="buybutton" 
                            onClick={() => {setModalproducttitle(product3title);setModalproductimage(product3image);setModalproductdescription(product3description);setModalproductprice(product3price);setOpenbuymodal(true)}}
                        >BUY</button>
                    </div>
                </div>
            </Grid>
        </Grid>
            <Grid container spacing={1} style={{backgroundColor:'#fff'}}>
                <Grid item sm={12}>
                    <hr />
                </Grid>
            </Grid>
            <Grid container spacing={1} justify="center" style={{backgroundColor:'#fff'}}>
                <Grid item sm={9} style={{textAlign:'left'}}>
                    <h2 className="subheader">{company ? company : "Mini Profile for Company"}</h2>
                </Grid>
                <Grid item sm={3} style={{textAlign:'right'}}>
                    <h5 title="Not complete yet" style={{marginRight:'30px',color:'#707070'}}>{'FULL PROFILE >'}</h5>
                </Grid>
            </Grid>
            <Grid container spacing={1} className="companydescriptionblock"  style={{marginBottom:'4px'}}>
                <Grid item sm={9} className="companydescription">
                    <p >{companydescription ? companydescription : "Hi. I'm a placeholder. The default information you see on this site before you click 'Select Store' at the top right and choose a decentralized storefront to visit."}</p>
                </Grid>
                <Grid item sm={3} className="companydescriptionimg">
                    <img alt="logo" src={logo ? "https://cloudflare-ipfs.com/ipfs/" + logo : "https://cloudflare-ipfs.com/ipfs/QmWBUPgkgpGMaSi9fn85KssDaGikcxPggrg8dkNXqce2rf"} />
                </Grid>
            </Grid>
            <Grid item xs={6} className="center">
                <div className="file-field input-field">
                    <input
                        accept="image/*"
                        id="data_file"
                        multiple
                        type="file"
                        style={{display:'none'}}
                    onChange={upload}
                    />
                    <label htmlFor="data_file">
                    <Button className="main-buttons" component="span">
                        <div>Add Files</div>
                    </Button>
                    </label>

                </div>
            </Grid>
            <Grid item xs={6} className="center">
                <div className="file-field input-field">
                    <Button className="main-buttons" component="span"
                    onClick={() => uploadJson()}>
                        <div>UploadJSON</div>
                    </Button>
                      <Button color="primary">Primary</Button>
                      <Button color="secondary">Secondary</Button>
                </div>
                <input onChange={(e) => upload(e)} 
type="file" id="files" / >

            </Grid>
        </div>        

        <Dialog
            fullWidth
            open={openconnectmodal}
            onClose={handleClose}
            PaperProps={{
                style: {
                backgroundImage: "linear-gradient(90deg, #0071bc, #0c2356)",
                color:'white'
                },
            }}
            >
            {mynft === undefined ? <>
                <DialogTitle style={{padding:'20px',textAlign:'center'}}>Register your account on GUER</DialogTitle>
                <div style={{paddingBottom:'10px'}}>Your Ethereum Address:<br/>{myaccount}</div><br/>
                    <br/>
                    <div style={{paddingBottom:'10px'}}>By registering your Ethereum address on GUER, you can start storing your personal data, photos, and favorites on your own personal NFT.<br/>You can interact with and adjust your NFT here: <a style={{color:'white',textDecoration:'underline'}} href="https://skale.guer.co" target="_blank" rel="noreferrer">app.guer.co</a></div><br/>
                    <div id="status">{loading ? 'Creating Account' : ''}</div>
                <DialogActions>
                <Button onClick={() => handleClose()} color="primary">
                    Cancel
                </Button>
                <Button id="submit" onClick={() => {alert('create - link to wizard/dashboard')}} color="primary" disabled={loading}>
                    {loading ? "Uploading..." : "Create!"}
                </Button>
                </DialogActions>
            </>
            : 
                <>
                    <Grid container spacing={2}>
                        <Grid item sm={9} style={{verticalAlign:'middle',alignItems: 'center'}}>
                            <DialogTitle style={{padding:'20px',textAlign:'center'}}>Your connection info</DialogTitle>
                            <p>ETH Address: {myaccount}</p>
                            <p>GUER NFT: {nftinfo}</p>
                            <p>Network: {mynetwork === 'private' ? 'SKALE/Private' : mynetwork}</p>
                            <p>Connected To: {company ? company : 'n/a'}</p>
                            <hr/>
                            <p><i>Coming Soon... Saving favorite Stores, order history, and more</i></p>

                        </Grid>
                        <Grid item sm={3} style={{verticalAlign:'middle',alignItems: 'center'}}>
                            <br/><br/><br/><br/>
                            <p>BALANCE</p>
                            <div>ETH {web3 ? web3.utils.fromWei(mybalance, 'ether') : 'n/a'}<hr/>USD {'$x.xx'}</div>
                            {/*
                            <br/><br/><br/><br/>

                            <FormControlLabel control={<Checkbox name="checkedC" />} label="Remember this Store" />
                            */}
                        </Grid>
                    </Grid>
                    <DialogActions>
                    <Button onClick={() => handleClose()} >
                        Close
                    </Button>
                    </DialogActions>
                </>
            }
        </Dialog> 

        <Dialog
            fullWidth
            open={openstoresmodal}
            onClose={handleClose}
                    PaperProps={{
                        style: {
                        backgroundImage: "linear-gradient(90deg, #0071bc, #0c2356)",
                        color:'white'
                        },
                    }}
            >
            {!nftinfo ? <>
            <DialogTitle style={{padding:'20px',textAlign:'center',fontSize:'3em'}}>SELECT STOREFRONT</DialogTitle>
            <Grid container spacing={2}>
                <Grid item sm={9} style={{verticalAlign:'middle',alignItems: 'center',textAlign:'center'}}>
                    <FormControl style={{color:'white'}}>
                    <Select value={selectedstoreaddress} style={{width:'400px',color:'white'}}
                        onChange={(e) => {setSelectedstoreaddess(e.target.value)}}
                    >
                        <MenuItem value={'QmW8DyNE3fiaXNSasYsRduksTVQoARcuWyXTxx4n13VBAh'}>PlaceHolder Store</MenuItem>
                        <MenuItem value={'Qmf5GrrHyVjtDb6GnzpLsFZeV1NHMW71iEmRjoXZWXMibU'}>NautiDog.eth</MenuItem>
                        <MenuItem value={'Qmd47v24o6iE9X6GP3kwFSgwhh1vFS5Wr6hBT8dxX3sWNu'}>Cup Store.eth</MenuItem>
                        {/*
                        <MenuItem value={'QmeNRDppj6Yr9un7Qg2s8hDJW8g3rvms1TUoTx4SuNrgmS'}>PlaceHolder old.eth</MenuItem>
                        */}
                    </Select>
                    </FormControl>
                    <br/><br/>
                    <TextField disabled style={{paddingBottom:'10px',width:'400px',color:'white'}} id="outlined-basic" label="Paste a Store's Ethereum address (disabled)" value={typedstoreaddress} onChange={(e) => {setTypedstoreaddress(e.target.value)}}/>
                </Grid>
                <Grid item sm={3} style={{verticalAlign:'middle',alignItems: 'center',textAlign:'center'}}>
                <Button onClick={() => getStoreData(selectedstoreaddress)} style={{color:'white'}}>
                    Go
                </Button>
                {/*
                <br/><br/>
                <Button disabled onClick={() => getStoreData(typedstoreaddress)} style={{color:'white'}}>
                    Go
                </Button>
                */}
                </Grid>
            </Grid>
            <DialogActions>
            <Button onClick={() => handleClose()} style={{color:'white'}}>
                Close
            </Button>
            </DialogActions>
            </>
            : 
                <>
                <DialogTitle style={{padding:'20px',textAlign:'center'}}>Hello</DialogTitle>
                <div style={{paddingBottom:'10px'}}>Looks like you have registered your ethereum address already, nice!
                <br/>
                 <div style={{paddingBottom:'10px'}}>Your Ethereum Address:<br/>{myaccount}</div>
                <br/>
                <div style={{paddingBottom:'10px'}}>Network:<br/>{mynetwork}</div>
                <br/>
                <div style={{paddingBottom:'10px'}}>Balance:<br/>{web3 ? web3.utils.fromWei(mybalance, 'ether') : ''}</div>
                <br/>
                <br/><a style={{color:"white",fontSize:'125%',fontWeight:'bold'}} target="_blank" rel="noreferrer" href="https://skale.guer.co">Guer Account</a>
                </div>
                <DialogActions>
                <Button onClick={() => handleClose()} >
                    Close
                </Button>
                </DialogActions>
                </>
            }
        </Dialog> 

        <Dialog 
              PaperProps={{
                style: {
                  backgroundColor: '#457B9D',
                  color:'white'
                },
              }}
            fullWidth
            open={openbuymodal}
            onClose={handleClose}>
            <DialogTitle style={{padding:'20px',textAlign:'center'}}>BUY NOW</DialogTitle>
            <Grid item sm={12} style={{verticalAlign:'middle',alignItems: 'center'}}>
            <h3>{modalproducttitle}</h3>
            <div style={{display:'table',width:'100%'}}>
                <div style={{display:'table-row'}}>
                    <div style={{display:'table-cell'}}></div>
                    <div style={{display:'table-cell'}}>Product</div>
                    <div style={{display:'table-cell'}}>Price</div>
                    <div style={{display:'table-cell'}}>Quantity</div>
                </div>
                <div style={{display:'table-row',backgroundColor:'#1D3557',borderRadius:'5px',height:'100px',padding:'5px'}}>
                    <div style={{display:'table-cell'}}><img alt="productimg" src={"https://cloudflare-ipfs.com/ipfs/" + modalproductimage} style={{height:'100px'}}/></div>
                    <div style={{display:'table-cell',verticalAlign:'middle'}}>{modalproducttitle}</div>
                    <div style={{display:'table-cell',verticalAlign:'middle'}}>                        
                        <img alt="coinexchange" src={CoinExchange} style={{width:'20px'}} onClick={() => handleCurrency()}/>
                        <span className="productprice">{modalproductprice ? !useethprice ? "USD $" + modalproductprice : "ETH " + (modalproductprice/ethprice).toFixed(8) : "FREE"}</span>
                    </div>
                    <div style={{display:'table-cell',verticalAlign:'middle'}}>1</div>
                </div>
            </div>
                <p><strong>Your Information:</strong> {myaccount}</p>
                <p><strong>Network:</strong> {mynetwork}</p> 
                <p><strong>Currency:</strong> ETH</p>
                <p><strong>Balance:</strong> {web3 ? web3.utils.fromWei(mybalance, 'ether') : ''} ETH</p>
                <p><strong>Confirm Seller's Address:</strong>  {'0x1'}</p>
                <hr/>

                <p style={{float:'right'}}>Total:  {(modalproductprice/ethprice).toFixed(8)} ETH</p>
            </Grid>
            <DialogActions>
            <Button onClick={() => handleClose()} >
                Cancel
            </Button>
            <Button id="submit" onClick={() => {setLoading(loading);buyProduct()}}  disabled={loading}>
                {loading ? "...purchasing..." : "BUY"}
            </Button>
            </DialogActions>
        </Dialog> 

        <Dialog 
              PaperProps={{
                style: {
                  backgroundColor: '#457B9D',
                  color:'white'
                },
              }}
            fullWidth
            open={openproductmodal}
            onClose={handleClose}>
            <DialogTitle style={{padding:'20px',textAlign:'center'}}>Details</DialogTitle>
            <Grid item sm={12} style={{verticalAlign:'middle',alignItems: 'center'}}>
            <h3>{modalproducttitle}</h3>
            <div><img style={{width:'100%'}} alt="modalproductimg" src={"https://cloudflare-ipfs.com/ipfs/" + modalproductimage}/></div>
            <p className="productdescription">{modalproductdescription}</p>
            {modalproductprice ?
            <p>Price: USD $ {modalproductprice} / ETH : {(product1price/ethprice).toFixed(6)}</p>
            :
            <p>Free!</p>
            }
            <button className="buybutton" style={{float:'right'}}
                onClick={() => {;setOpenproductmodal(false);setModalproducttitle(modalproducttitle);setModalproductimage(modalproductimage);setModalproductdescription(modalproductdescription);setModalproductprice(modalproductprice).toFixed(8);setOpenbuymodal(true)}}
            >BUY</button>
            </Grid>
        </Dialog> 

        <Dialog
            fullWidth
            open={openhelpmodal}
            onClose={handleClose}>
            <DialogTitle style={{padding:'20px',textAlign:'center'}}>What's Going On Here??</DialogTitle>
                <div style={{fontSize:'1.25em'}}>We're glad you asked...there's a few cool things happening here! 
                <br/><br/>These demo "storefronts" are stateless, meaning they have no memory, and are completely neutral when you arrive. The storefront data and images are hosted entirely on IPFS, associated with a user's Guer NFT.
                <br/><br/> When you "Connect" to the site, you temporarily provide it access to information you control, not the other way around. 
                <br/><br/>These examples are also decentralized, meaning they're hosted across the network rather than a central server, and all the information (images, text, prices, contact info) is stored on decentralized databases and storage networks!
                <br/><br/><strong>This demo is run on the SKALE testnet, or information on how to connect your Metamask to SKALE, please see this link: <a style={{textDecoration:'underline'}} href="https://guer.co/users#skaleconnect" target="_blank" rel="noreferrer">guer.co/users</a> and click, "I'm in, Show me!"</strong>
                <br/><br/>If you'd like to learn more, check out our <a href="https://guer.substack.com/" rel="noreferrer" target="_blank">https://guer.substack.com/</a>, shoot us an e-mail <a href="mailto:info@guer.co">mailto:info@guer.co</a>, or visit our website: <a style={{color:'white',textDecoration:'underline'}} href="https://guer.co" target="_blank" rel="noreferrer">guer.co</a>
                <br/><br/><span style={{color:'red'}}>THIS IS A DEMONSTRATION ON A TESTNET. Please do not send real Ethereum, or provide any sensitive or private information, as they will most certainly be lost! </span>
                </div>
            <DialogActions>
            <Button onClick={() => handleClose()} >
                close
            </Button>
            </DialogActions>
        </Dialog>

        <Grid container spacing={1} style={{backgroundColor:"black",color:'white',textAlign:'center'}}>
            <Grid item sm={12}>
                {'Made with <3 in SF'}<br/>
                <a rel="noreferrer" style={{color:'white'}} href="https://guer.co" target="_blank" rel="nofollow">guer.co</a><br/>
                &copy; 2021
            </Grid>
        </Grid>
    </Container>
)}

export default Index;
ReactDOM.render(
    <ThemeProvider theme={theme}>
        <CssBaseline />
        <Index/>
    </ThemeProvider>,
    document.getElementById('root')
);