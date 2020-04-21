//Crypro Library requirement
var SHA = require("crypto-js/SHA256");
const fs = require('fs');


function load_file_JSON(path,qx){
  if (fs.existsSync(path)) {
    let data = fs.readFileSync(path, 'utf8');
    qx(JSON.parse(data));
  }else{
    qx(false);
  }
}

function save_JSON_to(to_save, file_name,location) {
  fs.writeFile(location+file_name, JSON.stringify(to_save), (err) => {
          if (err) {
          console.log(err);
          } else {}
  });
}

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




function transaction (sender, receiver, content, time){
  let transaction = {sender: sender, receiver: receiver, content: content, time: time};

  transaction.hash = SHA(JSON.stringify(sender + receiver + content + time)).toString();
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
