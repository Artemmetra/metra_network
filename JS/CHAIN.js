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



class CHAIN {
              // A CHAIN consists of a series of blocks used to construct the current state of an object
              constructor(blocks, bin, id, description, parameters){
                this.blocks = blocks;
                this.bin = bin;
                this.description = description;
                this.parameters = parameters;
                this.length = this.blocks.length;
                this.id = id;
                this.list = [];

                main_chain[this.id] = this;

              }

              add_block(data,description){
                // Treat block creation
                // Verify the block to make sure it is acceptable
                // Then add to memory
                let block = new BLOCK(this, data, description);
                this.list.unshift(block.hash);
                this.blocks[block.hash] = block;
              }

              process(){
                // Run through the chain to make sure the latest version of the chain is being used
              }

              getPrevious(){
                // Provide the hash of the latest block
                  this.list[0];
              }

              length(){
                // Provides the current length of the chain
                //return Object.keys(this.blocks).length
                return this.length
              }




}

class BLOCK {
              // A BLOCK consists of the changes being applied to an object
              constructor(chain, data, description){
                this.data = data;
                this.description = description;
                this.previous = chain.getPrevious();
                this.position = chain.length;
                this.hash = SHA(JSON.stringify(this.data) + JSON.stringify(this.previous)).toString();
              }
}


let main_chain = {};


function l(id){
  return main_chain[id];
}


// Sub-chains are recorded into the main_chain as parameters, and can be saved to memory this way

let bin = [];
let limit = 10;

//  Check if CHAIN.met exists as file
load_file_JSON("DATA/CHAIN.met",(data)=>{
   if(data){
    Object.keys(data).forEach(c=>{
        // Becasue JSON only saves the parameters of an object, we will reinitiate the CHAIN object with the parameters at start
        // this implies that all of the blocks need to be readded separately if ever we start adding functionality to the blocks directly
        let chain = data[c];
        new CHAIN(chain.blocks, chain.bin, chain.id, chain.description, chain.parameters);
    })
     //main_chain = data;
   } else{
     new CHAIN({},[],"0","MAIN CHAIN",[],[]);
     save_JSON_to(main_chain, "CHAIN.met","DATA/");
   }
});

//  Check if BIN.met exists as file
load_file_JSON("DATA/BIN.met",(data)=>{
   if(data){
     bin = data;
   } else{
     save_JSON_to(bin, "BIN.met","DATA/");
   }
});


//creates a new block
function new_block(data){
  let block = {};

  block.data = data;
  block.previous = getLatestBlock().hash;
  block.hash = SHA(JSON.stringify(data) + block.previous).toString();

//push the new block to the chain array
  main_chain[0].unshift(block);
  save_JSON_to(main_chain[0], "CHAIN.met","DATA/");
}

//get the info of the latest block
function getLatestBlock(){
  return main_chain[0][0];
}




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
