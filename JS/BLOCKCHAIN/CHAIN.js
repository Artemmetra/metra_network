///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// CHAIN //////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Moving the CHAIN to the main process to treat data receipt behind the BrowserWindow

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
global.mc = {};

global.bin = [];
function l(id){
  return main_chain[id];
}

const BLOCK = require('./BLOCK.js');
const TRX = require('./TRANSACTION.js');

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
                mc[this.id] = this;
              }
}

CHAIN.add_block(data){
  // Treat block creation
  // Verify the block to make sure it is acceptable
  // Then add to memory
  /*let block = new BLOCK(this, data, description);
  this.list.unshift(block.hash);
  this.blocks[block.hash] = block;*/

  //HT
  //chain.add_block(...) receives block data and packages the block with verification on its own
  //thus the block has to be
  //the block hash has to contain the block index as well as the transaction linear destruct of the data
  //the linear destruct can be implemented

  // TEST DATA
  if(CHAIN.process(data)){
    let new_block = new BLOCK(data);
    // SET KNOWN VALUES
    new_block.index = this.list.length;
    new_block.previous = this.list[0];
    // GENERATE NEW NONCE
    new_block.nonce = 0;
    // CALCULATE THE HASH
    new_block.hash = 0;
    this.list.unshift(new_block.hash);
    this.blocks[this.list[0]] = new_block;
    return this.list[0];
  }
    return false;
}

CHAIN.process(){
  // Run through the chain to make sure the latest version of the chain is being used

  return true;
}

CHAIN.getPrevious(){
  // Provide the hash of the latest block
    this.list[0];
}

CHAIN.length(){
  // Provides the current length of the chain
  //return Object.keys(this.blocks).length
  return this.length
}


module.exports = {CHAIN};
