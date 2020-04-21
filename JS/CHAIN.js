console.log("HELLO");

//Crypro Library requirement
var SHA = require("crypto-js/SHA256");
const fs = require('fs');

/*
function load_file_JSON(path,qx){
  if (fs.existsSync(path)) {
    data = fs.readFileSync(path, 'utf8');
    qx(JSON.parse(data));
  }else{
    qx(false);
  }
}
*/

//  Check if chain exists in file

//  if exists load from file

//  else initiate
//  Objects stored in the chain - blocks
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


//string

//TRANSACTION:
//TIME, SENDER CONTENT RECEIVER

// Object = sender, receiver, content, time


let bin = [];
let limit = 10;

function transaction (sender, receiver, content, time){
  let transaction = {sender: sender, receiver: receiver, content: content, time: time};

  transaction.hash = SHA(JSON.stringify(transaction)).toString();
  bin_push(transaction);
  console.log(transaction);
}




function bin_push(transaction){
  //  Receives object.
  //  Checks for available space in bin.
  //  If available => add object. Else => create new block.

  if (bin.length + 1 < limit){
    bin.push(transaction);
    console.log("Adding to bin");
  } else {
    console.log("Creating new block");
    new_block(JSON.stringify(bin));
    bin = [transaction];
    show_chain();
  }


}



//MAIN:

new_block(data,chain[0].hash);
new_block([-5,2,3],chain[0].hash);
