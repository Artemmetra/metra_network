console.log("HELLO");
var SHA = require("crypto-js/SHA256");

// Block - TEXT
// HASH

function new_block(transaction){
  let block = {};

  block.data = transaction;
  block.previous = //hash of the pervious block;
  block.hash = "";



  return block;
}

let tr = [5,-2,-3];

//SHA(file.name).toString();
