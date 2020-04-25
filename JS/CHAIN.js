//Crypro Library requirement
var SHA = require("crypto-js/SHA256");
const fs = require('fs');

// Overhead is the latest calculation of the transactions on the network.
// It represents the current state of the network and can be calculated out of the data in the blocks.
// Every set ammount of blocks, the overhead is saved as a new block and represents a savepoint in the chain.
// Each new instance that is downloading the block has to calculate the overhead and communicate its hash tree
// through the network for review.

let overhead  = {};


// Each new SECTION or FUNCTION is created with its own new chain id, meaning that it is a chain of its own
// the user downloads blocks and builds these chains on the machine constructing them to memory
// every time the chain has to be updated, the mainchain will contain a trancastion with the new block for
// said sub-chain for verification.



let chain = [];
let bin = [];
let limit = 10;

//  Check if CHAIN.met exists as file
load_file_JSON("DATA/CHAIN.met",(data)=>{
   if(data){
     chain = data;
   } else{
     chain = [{data:[],hash:"NONE",previous:"START"}];
     save_JSON_to(chain, "CHAIN.met","DATA/");
   }
});

//  Check if BIN.met exists as file
load_file_JSON("DATA/BIN.met",(data)=>{
   if(data){
     bin = data;
   } else{
     save_JSON_to(chain, "BIN.met","DATA/");
   }
});


// This function is unfinished
function load_multiple(array_of_files_to_load){
  array_of_files_to_load.forEach(file=>{

  })

}

//  if exists load from file

//  else initiate
//  Objects stored in the chain - blocks


//creates a new block
function new_block(data){
  let block = {};

  block.data = data;
  block.previous = getLatestBlock().hash;
  block.hash = SHA(JSON.stringify(data) + block.previous).toString();

//push the new block to the chain array
  chain.unshift(block);
  save_JSON_to(chain, "CHAIN.met","DATA/");
}

//get the info of the latest block
function getLatestBlock(){
  return chain[0];
}


//bin


//string

//TRANSACTION:
//TIME, SENDER CONTENT RECEIVER

// Object = sender, receiver, content, time




function transaction (name, data_1, data_2, data_3, time){
  let transaction = {name: name, data_1: data_1, data_2: data_2, data_3: data_3, time: time};

  transaction.hash = SHA(JSON.stringify(name + time)).toString();
  bin_push(transaction);
  console.log(transaction);
}




function bin_push(transaction){
  //  Receives object.
  //  Checks for available space in bin.
  //  If available => add object. Else => create new block.
  bin.push(transaction);
  if (bin.length + 1 < limit){
    console.log("Adding to bin");
  } else {
    console.log("Creating new block");
    new_block(JSON.stringify(bin));
    bin = [];
  }

  save_JSON_to(bin, "BIN.met","DATA/");
}



//MAIN:
