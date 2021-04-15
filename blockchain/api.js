const express = require('express');

express.json();
express.urlencoded();

const app = express();

app.get('/blockchain', function(req, res){
    res.send('Hello world');
})

app.post('/transaction', function(req, res){
    console.log(req.body);    
    res.send(`The amount of the transaction is ${req.body.amount} bitcoin`);
})

app.get('/mine', function(req, res){
    res.send('Hello world');
})

app.listen(3000, function() {
    console.log('Listening on port 3000');
});