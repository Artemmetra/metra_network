console.log("HELLO");

//Crypro Library requirement
var SHA = require("crypto-js/SHA256");


//Objects stored in the chain - blocks
let chain = [];


//creates a new block
function new_block(data,previous_hash){
  let block = {};

  block.data = data;
  block.previous = previous_hash;
  block.hash = SHA(JSON.stringify(data) + block.previous).toString();

//push the new block to the chain array
  chain.push(block);
  return block;
}

//get the info of the latest block
function getLatestBlock(){
  return chain[chain.length-1];
}


let data = [5,-2,-3];

//MAIN:

new_block([],"START");

new_block(data,chain[0].hash);
