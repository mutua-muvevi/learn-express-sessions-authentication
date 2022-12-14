const crypto = require('crypto');
const hash = crypto.createHash('sha256');
const fs = require('fs');
const encrypt = require('./encrypt');
const decrypt = require('./decrypt');

const myData = {
  firstName: 'Joseph',
  lastName: 'Sam',
  socialSecurityNumber: 'NO NO NO.  Never put personal info in a digitally \
  signed message since this form of cryptography does not hide the data!'
};

// String version of our data that can be hashed
const myDataString = JSON.stringify(myData);

// Sets the value on the hash object: requires string format, so we must convert our object
hash.update(myDataString);

// Hashed data in Hexidecimal format
const hashedData = hash.digest('hex');
console.log("HASHING ONE", hashedData)

const senderPrivateKey = fs.readFileSync(__dirname + '/private_key.pem', 'utf8');

const signedMessage = encrypt.encryptWithPrivateKey(senderPrivateKey, hashedData);

// This is not how we will send data ppackage because it might be too large which may slow down our application
// JWT jsonwebtokens will help us here
const packageOfDataToSend = {
    algorithm: "sha256",
    originalData: myData,
    signedAndEncryptedData: signedMessage
};

module.exports.packageOfDataToSend = packageOfDataToSend