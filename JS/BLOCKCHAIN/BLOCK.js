// HT: We could reform the block creation process, in order allow for the block addition to a specific chains
//     at the time of creation. This way, a block function can be called on any data, and then a block
//     will be pushed to the chain.

class BLOCK {
              // A BLOCK consists of the changes being applied to an object
              constructor(data){
                this.data = data;
                this.nonce = 0;
                this.previous = 0;
                this.hash = 0;
                this.index = 0;
              }
}


module.exports = BLOCK;
