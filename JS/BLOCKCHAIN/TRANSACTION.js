// Sub-chains are recorded into the main_chain as parameters, and can be saved to memory this way
// HT: REMOVE / REWORK
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

  save_JSON_to(bin, "BIN.mn","DATA/");
}


class TRANSACTION {
              // A BLOCK consists of the changes being applied to an object
              constructor(chain, data, description){
                this.data = data;
                this.description = description;
                this.previous = chain.getPrevious();
                this.position = chain.length;
                this.hash = SHA(JSON.stringify(this.data) + JSON.stringify(this.previous)).toString();
              }
}

module.exports = TRANSACTION;
