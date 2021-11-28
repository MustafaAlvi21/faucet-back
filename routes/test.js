const express = require("express")
const router = express.Router()
// const auth = require('../config/auth');
// var basicAuth = require('basic-auth');

// const Web3 = require('web3');
// const abi = require("../build/abi");
// const Provider = require('@truffle/hdwallet-provider');
// const binanceRPC = process.env.BINANCE_PROVIDER;
// const contractAddress = process.env.B_CONTRACT;
// const address = process.env.SENDER_ACCOUNT;
// const privateKey = process.env.RRIVATE_KEY;



// /*  ---------------------------------------------  */
// /*                   Send Token                    */
// /*  ---------------------------------------------  */
// router.post("/send-bep20", auth, async(req, res) => {
//     const provider = new Provider(privateKey, binanceRPC); 
//     const web3 = new Web3(provider);
//     const myContract = new web3.eth.Contract(abi, contractAddress);
//     if(!req.body.receiver || req.body.receiver.length != 42 || req.body.receiver == "0x0000000000000000000000000000000000000000") return res.json("Invalid receiver address")
//     if(!req.body.tokens || parseInt(req.body.tokens) < 1) return res.json("Invalid token limit")
//     const receipt = await myContract.methods.transfer(req.body.receiver, parseInt(req.body.tokens)).send({from: address})
//     .then((result) => {
//         console.log(result);
//         return res.json(result);        
//     }).catch((err) => {
//         console.log(err);
//         return res.json(err);            
//     });
// })


// var Tx = require('ethereumjs-tx').Transaction;
// const Web3 = require('web3');
// const provider = new Web3.providers.HttpProvider("https://ropsten.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161");
// const web3 = new Web3(provider);

// const account1 = '0x8EdfC247F0B750Ca48909a33D52C5B3FBecB7536'; // Your account address 1
// //const account2 = '' // Your account address 2
// web3.eth.defaultAccount = account1;

// const privateKey1 = Buffer.from('eab55663c907d292039b4982901a55dd28364b0a103a5e52b0642a3a4f031440', 'hex');

// // const abi = [{"constant":false,"inputs":[{"name":"_greeting","type":"string"}],"name":"greet","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getGreeting","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"}];

// // const contract_Address = "0xcbe74e21b070a979b9d6426b11e876d4cb618daf";

// // const myContract = new web3.eth.Contract(abi, contract_Address);

// // const myData = myContract.methods.greet( "hello blockchain devs").encodeABI();

// web3.eth.getTransactionCount(account1, (err, txCount) => {
// // Build the transaction
//   const txObject = {
//     nonce:    web3.utils.toHex(txCount),
//     to:       "0x6aC646018d6c82c1e51836658F9ca95885443e1c",
//     value:    web3.utils.toHex(web3.utils.toWei('0', 'ether')),
//     gasLimit: web3.utils.toHex(2100000),
//     gasPrice: web3.utils.toHex(web3.utils.toWei('6', 'gwei')),
//     // data: myData  
//   }
//     // Sign the transaction
//     const tx = new Tx(txObject);
//     tx.sign("eab55663c907d292039b4982901a55dd28364b0a103a5e52b0642a3a4f031440");

//     const serializedTx = tx.serialize();
//     const raw = '0x' + serializedTx.toString('hex');

//     // Broadcast the transaction
//     const transaction = web3.eth.sendSignedTransaction(raw)
//     .then((result) => {
//         console.log(result);
//     }).catch((err) => {
//         console.log(err);
//     });
//     // , (err, tx) => {
//     //     console.log(tx)
//     // });
// });

module.exports = router;