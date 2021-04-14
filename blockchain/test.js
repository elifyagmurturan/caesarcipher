const Blockchain = require('./blockchain')

const bitcoin = new Blockchain();
// // console.log(bitcoin);

// bitcoin.createNewBlock(3872, 'ASDFGHJKLQWERTYUI', '8432928xsd49482282f');
// // console.log(bitcoin);

// bitcoin.createNewBlock(3872, 'ASDFGHJKLQWERTYUI', '8432928xsd49482282f');
// // console.log(bitcoin);

// bitcoin.createNewTransaction(200, 'HELLOWORLD123', 'HASH1234567');
// // console.log(bitcoin);

// bitcoin.createNewBlock(25932, 'HELLOWORLD12345', 'HASH123456789');
// console.log(bitcoin);

const previousBlockHash = '5049525839538EEABC238C1D27C35692E11';
const currentBlockData = [
    {
        amount: 10,
        sender: '5893298EABCD71',
        recipient: '3EDC45677E9',  
    }  
]
const nonce = 50;
bitcoin.hashBlock(previousBlockHash, currentBlockData, nonce );
// console.log(bitcoin.hashBlock(previousBlockHash, currentBlockData, nonce));

console.log(bitcoin.proofOfWork(previousBlockHash, currentBlockData));