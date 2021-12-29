const express = require("express");
const router = express.Router();
const BlockDataModel = require("../models/block");
const TXDataModel = require("../models/tx");

const Web3 = require('web3');
const web3 = new Web3("https://mainnet.infura.io/v3/a4f1407dc85d47329d64aec36d5a5553");







  /******************************************************/
 /**                     Get Block                    **/
/******************************************************/
router.get("/block", async(req, res) => {
    const block = await web3.eth.getBlock(13873539)
    console.log("transactions[0]");
    console.log(block.transactions.length);

    await new BlockDataModel({
        gasLimit: block.gasLimit,
        gasUsed: block.gasUsed,
        logsBloom: block.logsBloom,
        receiptsRoot: block.receiptsRoot,
        sha3Uncles: block.sha3Uncles,
        parentHash: block.parentHash,
        difficulty: block.difficulty,
        extraData: block.extraData,
        miner: block.miner,
        mixHash: block.mixHash,
        number: block.number,
        timestamp: block.timestamp,
        transactionsRoot: block.transactionsRoot,
        uncles: block.uncles,
        hash: block.hash,
        nonce: block.nonce,
        size: block.size,
        stateRoot: block.stateRoot,
        totalDifficulty: block.totalDifficulty,
        totalTransactions: block.transactions.length
    })
    .save()
    .then((tx) => {
        console.log("------------- tx ------------- ");
        console.log(tx);
        saveTX(block)
    }).catch((err) => {
        console.log(err);
        return res.json({"Error": err.message})
    });
     
          
    async function saveTX(block){
        console.log("saveTX");
        // console.log(block);
        
        let promises = []
        const timeOut = async (tx, index) => {
            return new Promise( async (resolve, reject) => {
                console.log(index);
                const TX = await web3.eth.getTransaction(tx)
                .then( async(txData) => {
                    console.log(txData);
                    await new TXDataModel({
                        type: txData.type,
                        blockNumber: txData.blockNumber,
                        from: txData.from,
                        to: txData.to,
                        gasPrice: txData.gasPrice,
                        r: txData.r,
                        s: txData.s,
                        v: txData.v,
                        input: txData.input,
                        transactionIndex: txData.transactionIndex,
                        blockHash: txData.blockHash,
                        gas: txData.gas,
                        hash: txData.hash,
                        nonce: txData.nonce,
                        value: txData.value
                    })
                    .save()
                    .then((result) => {
                        resolve(`tx: ${index} added`);
                    }).catch((err) => {
                        console.log(` ----------------- err => ${index} ----------------- `);
                        console.log(err);
                    });
                }).catch((err) => {
                    console.log(err);
                    reject("Something went wrong")
                });
            })
        }
        
        
        await BlockDataModel.updateOne({number: block.number}, {status: "InProgress"})
        .exec()
        .then(() => {
            block.transactions?.forEach((TX, i) => {
                promises.push(timeOut(TX, i+1)); 
            });

        }).catch((err) => {
            console.log(err);
            return res.json({"Error": err.message})
        });
        console.log("--------- updated ------------");
    


        Promise.all(promises)
        .then( async response => {
            console.log("-------------------------response-------------------------");
            console.log(response);
            await BlockDataModel.updateOne({number: block.number}, {status: "complete"})
            .exec()
            .then((result) => {
                res.send("Done!!!")
            }).catch((err) => {
                res.json({err})
            });
        }).catch(err => console.log(err))
      
    }

    // res.send("Done")
})





module.exports = router;