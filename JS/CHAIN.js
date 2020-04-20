console.log("HELLO");
var SHA = require("crypto-js/SHA256");

// Block - TEXT
// HASH

let chain = [];

function new_block(transaction,previous_hash){
  let block = {};

  block.data = transaction;
  block.previous = previous_hash;
  block.hash = SHA(JSON.stringify(transaction)).toString();


  chain.push(block);
  return block;
}

let transaction = [5,-2,-3];

//SHA(file.name).toString();


new_block([],"START");

new_block(transaction,chain[0].hash);
