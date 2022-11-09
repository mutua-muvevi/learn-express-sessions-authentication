const base64url = require("base64url");
const crypto = require("crypto")
const fs = require("fs");

const signatureFunction = crypto.createSign("RSA-SHA256");
const verifyFunction = crypto.createVerify("RSA-SHA256")

// issuance of jwt

const headerObj = {
    alg: 'RS256',
    typ: 'JWT'
};

const payloadObj = {
    sub: '1234567890',
    name: 'John Doe',
    admin: true,
    iat: 1516239022
};

const headerObjString = JSON.stringify(headerObj);
const payloadObjString = JSON.stringify(payloadObj);

const base64UrlHeader = base64url(headerObjString);
const base64UrlPayload = base64url(payloadObjString);

// take the hash value of these two and put it in the jwt string, the first two items
signatureFunction.write(base64UrlHeader + "." + base64UrlPayload)
signatureFunction.end();

const PRIVATE_KEY = fs.readFileSync(__dirname +"/private_key.pem", "utf8")
const signatureBase64 = signatureFunction.sign(PRIVATE_KEY, "base64")

// nodejs crypto package reads base64 not base64Url encoding 
const signatureBase64Url = base64url.fromBase64(signatureBase64)
console.log("SIGNATURE BASE URL ::::", signatureBase64Url)


// end of issuance

// verification part

const token = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTUxNjIzOTAyMn0.O1NFpcy05XQBSNDo6iVETt3zwBi2tbr68fZPM1ybPUjB65M4v7x8YXY6ZbvPpUiuE9QUN6fZFQjrkl9CtvHXzOdBpVDzWlaIPqqEPKG57SHfFqT4JnBuGJnGJCt9QMp5EaMnO_DgizQlSoJ_atv1Azkc4qeYWWRRWGJm7CTl8cyGd_Gdyu6-2qSGE-AGtGjI0dXhFJguZjYyAbaKOzSPX8Vy3rYhk7Yu8WZJ-nQCMFlrEHO7vgqjJVd-i4dugeGrttmz-SOY9lA2DkL7XPnKemoXbH0ruU_R42FOFlZnlWqezwAcRntLaNeXSwROhDmjsLRfofoeVKPJHx2DLS3JYLRN4_M1-M2i8ed_REsyfaFkXlQsKiVL_nRqIUGmS9dGJdXACrkaCaPFirpO-KAyF51VoG48CTng8QmY8-OnMs33s2A7EgOR-LABcDXLuSszXnNFKqOXkaKomC0oyrLz1evkdPR5eNeYCy8GUru_EFHr9ev32wrYmO2w1nFSKicSSIZVSmSyqfk6nQ8wykdRJYf5-9MjJSEr61PT4YXfkzLubug57v-is1AZ85Sh_fg1k3m41v68G9RcOrIK4iQ-T1kDw8Ml-x03ZAq75BxKy7rpWpuaEhZ2IukoHAq2ExhCClJ13uWDfMQnCs1K3tvX47myqAXkjSiaW1okDEXkux8"

// getting parts of jwt token and assigning them to variables
const tokenParts = token.split(".")

const headerInBase64UrlFormat = tokenParts[0];
const payloadInBase64UrlFormat = tokenParts[1];
const signatureInBase64UrlFormat = tokenParts[2];

verifyFunction.write(headerInBase64UrlFormat + "." + payloadInBase64UrlFormat);
verifyFunction.end()

// crypto library accepts base64 encoding that is why we are transforming the signature back to base664
const jwtSignatureBase64 = base64url.toBase64(signatureInBase64UrlFormat)

// obtain the public key
const PUBLIC_KEY = fs.readFileSync(__dirname +"/public_key.pem", "utf8")

// verifying the signature
const isSignatureValid = verifyFunction.verify(
	PUBLIC_KEY,
	jwtSignatureBase64,
	"base64"
)

console.log("is signature valid ::::", isSignatureValid);