const {v1: uuidv1} = require('uuid');
const Blockchain = require('./blockchain');
const express = require('express');

const nodeAddress = uuidv1().split('-').join('');

const bitcoin = new Blockchain();

const app = express();
app.use(express.json());
app.use(express.urlencoded());


app.get('/blockchain', function(req, res){
    res.send(bitcoin);
});

app.post('/transaction', function(req, res){ 
    const blockIndex = bitcoin.createNewTransaction(req.body.amount, req.body.sender, req.body.recipient);
    res.json({note: `Transaction will be added in block ${blockIndex}`});
});

app.get('/mine', function(req, res){
    const lastBlock = bitcoin.getLastBlock();

    const previousBlockHash = lastBlock['hash']; 

    const currentBlockData = {
        transactions: bitcoin.pendingTransactions,
        index: lastBlock['index'] + 1
    };

    const nonce = bitcoin.proofOfWork(previousBlockHash, currentBlockData);
    
    const blockHash = bitcoin.hashBlock(previousBlockHash, currentBlockData, nonce);

    const newBlock = bitcoin.createNewBlock(nonce, previousBlockHash, blockHash);

    res.json({
        note: 'New block mined successfully',
        block: newBlock
    });

    bitcoin.createNewTransaction(2, "00", nodeAddress);
});

app.listen(3000, function() {
    console.log('Listening on port 3000');
});