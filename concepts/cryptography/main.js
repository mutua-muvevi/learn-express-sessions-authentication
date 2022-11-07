const fs = require('fs');
const encrypt = require('./encrypt');
const decrypt = require('./decrypt');

const publicKey = fs.readFileSync(__dirname + '/public_key.pem', 'utf8');

const data = "Secret infromation here"

// Stores a Buffer object
const encryptedMessage = encrypt.encryptWithPublicKey(publicKey, data);

// If you try and "crack the code", you will just get gibberish
console.log("Crypto encrypt", encryptedMessage.toString());

const privateKey = fs.readFileSync(__dirname + '/private_key.pem', 'utf8');

const decryptedMessage = decrypt.decryptWithPrivateKey(privateKey, encryptedMessage);

// Convert the Buffer to a string and print the message!
console.log("Crypto decrypt",decryptedMessage.toString())