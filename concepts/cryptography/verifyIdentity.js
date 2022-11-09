const crypto = require("crypto");
const fs = require("fs");
const decrypt = require("./decrypt");

// the data that we are receiving from the sender
const { packageOfDataToSend } = require("./signMessage");

// crypto.createHash takes in two arguements algorithm and option
const hash = crypto.createHash(packageOfDataToSend.algorithm);

// fetching the public key in our case it is in the "/public_key.pem"
const publicKey = fs.readFileSync(__dirname + "/public_key.pem", "utf8");

// geting the hashed value of the data we exported in packageOfDataToSend.data
const decryptedMessage = decrypt.decryptWithPublicKey(publicKey, packageOfDataToSend.signedAndEncryptedData);

// turn the decryptedMessage to a string value to be used in our function
const decryptedMessageHex = decryptedMessage.toString()

// look for our origininal ddata hashed value
const hashOfOriginal = hash.update(JSON.stringify(packageOfDataToSend.originalData));
const hashOfOriginalHex = hash.digest("hex");

// now we compare the data that we have manually hashed [hashOfOriginalHex] to the one we receive [decryptedMessageHex]
if(hashOfOriginalHex === decryptedMessageHex){
	console.log("Success, data has not be tempered with and thee sender is valid")
} else {
	console.log("Error: Someone has tempered with our data or the sender is not valid")
}