const{Worker, parentPort, workerData}                 = require('worker_threads');
const info                                            = workerData;
const cliProgress                                     = require('cli-progress');

let data_array = workerData[2].split("");
let times = 1000;
let hash = "";
let hash_array = [];
let len = data_array.length;
let found = 0;
let closest = [info[0],info[1],info[2]];
let nonce = 0;
let start_time = Date.now();
let inc = Math.floor(times/100);

for (var i = 0; i < times; i++) {
  nonce = JSON.stringify({NONCE:Math.floor(Math.random()*Math.pow(10,10)),DATA:"Testing transaction data"});
  let new_hash = SHA(nonce.toString()).toString();
  if(!(hash==new_hash)){
    hash = new_hash;
    hash_array = hash.split("");
      found = 0;
      let j = 0;
      while(hash_array[j]==data_array[j]){found++;j++;}
      if(found>data_array.length){b1.update(times);}
      if(closest[0]<found){closest = [found, nonce, workerData[2]];}
  }
}
parentPort.postMessage(closest);
