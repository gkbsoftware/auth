var jsSHA = require("jssha");

require('dotenv').load();

var shaObj = new jsSHA("SHA-1", "TEXT");
shaObj.setHMACKey(process.env.SECRET_KEY, "TEXT");
shaObj.update("password");
var hmac = shaObj.getHMAC("HEX");

console.log(hmac);
