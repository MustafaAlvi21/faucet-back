const express = require("express")
const router = express.Router()

const Tx = require('ethereumjs-tx').Transaction;
const Common = require('ethereumjs-common')

const Web3 = require('web3');
const web3 = new Web3(process.env.myRPC);

const basicAuth = require('basic-auth');

const faucetDataModel  = require("../models/allTX");

const moment = require("moment");




/*  ---------------------------------------------  */
/*                   Basic Auth                    */
/*  ---------------------------------------------  */
const auth = function (req, res, next) {
    var user = basicAuth(req);
    if (!user || !user.name || !user.pass) {
      res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
      res.sendStatus(401);
      return;
    }
    if (user.name === 'admin' && user.pass === 'password') {
      next();
    } else {
      res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
      res.sendStatus(401);
      return;
    }
}

        console.log("file access");


/*  ---------------------------------------------  */
/*                     GET TX                      */
/*  ---------------------------------------------  */
router.get("/getTX", async(req, res) => {
    const latest  = await web3.eth.getBlockNumber()
    const balance = await web3.eth.getBalance(process.env.SENDER_ACCOUNT)

        console.log("TX route");
    
    count  =  await faucetDataModel.find( {} ).count()

    faucetDataModel.find({}, {})
    .sort({_id: -1})
    .limit(5)
    .then((result) => {
        console.log(result);
        console.log(latest);
        return res.json({result, count: count*10, balance, blockNumber: latest})
    }).catch((err) => {
        console.log(err);
    });
})




/*  ---------------------------------------------  */
/*                   Send Amount                   */
/*  ---------------------------------------------  */
router.post("/send-amount", async(req, res) => {

    const privKey = Buffer.from(process.env.PRIVATE_KEY, 'hex');

    const addressFrom = process.env.SENDER_ACCOUNT;
    const addressTo = req.body.receiver;

    await faucetDataModel.find( {wallet: addressTo}).sort({_id: -1}).limit(1)
    .then((result) => {
        console.log(result);

        a1 = Date.now()
        a2 =  result.length > 0 ? result[0].dateTime : 0
        console.log(a2);
        a3 = ( (a1-a2) / 60000).toFixed()
        // a3 = a3 == 0 ? 100 : a3;
        console.log("a3 => ", a3);

        if((result.length > 0 && a3 >= 5) || (result.length == 0 && a3 >= 0) ){

            web3.eth.getTransactionCount(addressFrom, (err, txCount) => {    
                const common = Common.default.forCustomChain('mainnet', {
                    name: 'bnb',
                    networkId: 159,
                    chainId: 159
                }, 'petersburg');

                const txObject = {
                    nonce: web3.utils.toHex(txCount),
                    to: addressTo,
                    value: web3.utils.toHex(web3.utils.toWei('10', 'ether')),
                    gasLimit: web3.utils.toHex(700000),
                    gasPrice: web3.utils.toHex(web3.utils.toWei('10', 'gwei')),
                };

                const tx = new Tx(txObject,  {common});
                tx.sign(privKey);

                const serializedTrans = tx.serialize();
                const raw = '0x' + serializedTrans.toString('hex');

                web3.eth.sendSignedTransaction(raw, (err, txHash) => {
                    if(txHash != null){
                        console.log('txHash:', txHash)
                        const myTX = new faucetDataModel({
                            wallet : addressTo,
                            dateTime : Date.now(),
                            ip : ""
                        })
                        .save()
                        .then((result) => {
                            console.log(result);
                            return res.json("Transaction done!!!")
                        }).catch((err) => {
                            console.log(err);
                            return res.json("Error occurs!!!")
                        });
                    }
                    if(err != null){
                        console.log('err:', err)
                    }
                });
            });

        }  else {
            res.json({error: "You are graylisted, please come later."})
        }

    }).catch((err) => {
        console.log(err);
    });
})



var get_ip = require('ipware')().get_ip;

// app.use(function(req, res, next) {
//      var ip_info = get_ip(req);
//      console.log(ip_info);
//      // { clientIp: '127.0.0.1', clientIpRoutable: false }
//      next();
// });

router.get("/get-ip", (req, res) => {

    var ip_info = get_ip(req);
    console.log(ip_info);

    res.json(ip_info)
})
module.exports = router;