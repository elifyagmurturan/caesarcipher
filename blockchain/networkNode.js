const port = process.argv[2];
const {v1: uuidv1} = require('uuid');
const Blockchain = require('./blockchain');
const express = require('express');
const rp = require('request-promise');

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

app.post('/register-and-broadcast-node', function(req, res){
    const newNodeUrl = req.body.newNodeUrl;
    if(bitcoin.networkNodes.indexOf(newNodeUrl) == -1){
        bitcoin.networkNodes.push(newNodeUrl);
    }
    bitcoin.networkNodes.forEach(networkNodeUrl => {
        const requestOptions = {
            uri: networkNodeUrl + '/register-node',
            method: 'POST',
            body: newTransaction,
            json: true
        };
        regNodesPromises.push(rp(requestOptions));
    });
    Promise.all(regNodesPromises).then(data => {
        const bulkRegisterOptions = {
            uri: newNodeUrl + '/register-nodes-bulk',
            method: 'POST',
            body: {allNetworkNodes: [...bitcoin.networkNodes, bitcoin.currentNodeUrl]},
            json: true
        }
    })
    return rp(bulkRegisterOptions).then(data => {
        res.json({note: 'New Node registered with network successfully'});
    });
});

app.post('/register-node', function(req, res){
    const newNodeUrl = req.body.newNodeUrl;
    const nodeNotAlreadyPresent = (bitcoin.networkNodes.indexOf(newNodeUrl) == - 1);
    const notCurrentNode = (bitcoin.currentNodeUrl !== newNodeUrl);
    if(nodeNotAlreadyPresent && notCurrentNode){
        bitcoin.networkNodes.push(newNodeUrl);
    }
    res.json({note: 'New Node registered successfully.'});

});

app.post('/register-nodes-bulk', function(req, res) {
	const allNetworkNodes = req.body.allNetworkNodes;
	allNetworkNodes.forEach(networkNodeUrl => {
		const nodeNotAlreadyPresent = bitcoin.networkNodes.indexOf(networkNodeUrl) == -1;
		const notCurrentNode = bitcoin.currentNodeUrl !== networkNodeUrl;
		if (nodeNotAlreadyPresent && notCurrentNode) {
            bitcoin.networkNodes.push(networkNodeUrl);
        }
	});

	res.json({ note: 'Bulk registration successful.' });
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
    console.log(`Listening on port ${port}`);
});