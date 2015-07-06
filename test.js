var jsSHA = require("jssha");

var shaObj = new jsSHA("SHA-512", "TEXT");
var hash = shaObj.getHash("HEX");



console.log(hash);
