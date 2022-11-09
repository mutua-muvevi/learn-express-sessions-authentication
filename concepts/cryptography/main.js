const fs = require('fs');
const encrypt = require('./encrypt');
const decrypt = require('./decrypt');

const publicKey = fs.readFileSync(__dirname + '/public_key.pem', 'utf8');

const someObject = {
	username: "Joe",
	email: "Bash"
}

const data = JSON.stringify(someObject);

// Stores a Buffer object
const encryptedMessage = encrypt.encryptWithPublicKey(publicKey, data);

// If you try and "crack the code", you will just get gibberish
console.log("ENCRYPTION", encryptedMessage.toString());

const privateKey = fs.readFileSync(__dirname + '/private_key.pem', 'utf8');

const decryptedMessage = decrypt.decryptWithPrivateKey(privateKey, encryptedMessage);

// Convert the Buffer to a string and print the message!
console.log("DECRYPTION",decryptedMessage.toString())