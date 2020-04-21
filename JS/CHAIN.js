console.log("HELLO");

//Crypro Library requirement
var SHA = require("crypto-js/SHA256");


//Objects stored in the chain - blocks
let chain = [{data:[],hash:"NONE",previous:"START"}];


//creates a new block
function new_block(data){
  let block = {};

  block.data = data;
  block.previous = getLatestBlock().hash;
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

//bin
var limit = 10;
var number= 0;

//string

//TRANSACTION:
//TIME, SENDER CONTENT RECEIVER

// Object = sender, receiver, content, time


let bin = [];

function transaction (sender, receiver, content, time){
  let transaction = {sender: sender, receiver: receiver, content: content, time: time};

  transaction.hash = SHA(JSON.stringify(transaction)).toString();
  bin.push(transaction);
  return transaction;
}



function bin_push(transaction){
  //Receives object.
  // Checks for available space in bin.
  if (bin.length<limit){
    bin.push(transaction);
  }
  else{
    new_block(bin);
    bin = [];
  }
  //If available => add object. Else => create new block.

}



//MAIN:

new_block(data,chain[0].hash);
new_block([-5,2,3],chain[0].hash);
