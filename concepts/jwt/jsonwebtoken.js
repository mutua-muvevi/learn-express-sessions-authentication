const jwt = require('jsonwebtoken');
const fs = require('fs');

const PUBLIC_KEY = fs.readFileSync(__dirname + '/public_key.pem', 'utf8');
const PRIVATE_KEY = fs.readFileSync(__dirname + '/private_key.pem', 'utf8');

const payloadObj = {
    sub: '1234567890',
    name: 'John Doe',
    admin: true,
    iat: 1516239022
};

const signedJWT = jwt.sign(payloadObj, PRIVATE_KEY, { algorithm: 'RS256'});
console.log("SIGNED JWT", signedJWT)

jwt.verify(signedJWT, PUBLIC_KEY, { algorithms: ['RS256'] }, (err, payload) => {
    console.log(payload);
});