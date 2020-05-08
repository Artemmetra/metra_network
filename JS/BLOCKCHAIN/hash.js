const {Worker, isMainThread, parentPort, workerData}  = require('worker_threads');
const SHA                                             = require("crypto-js/SHA256");
const OS                                              = require("os");
const cpu_count                                       = OS.cpus().length;
const path                                            = require("path");
const worker_path                                     = path.resolve('ha$H_worker.js')
const fs                                              = require('fs');


// RECEIVE DATA + EXPECTED BLOCK ID
// CREATE WORKERS AND SPLIT WORKLOAD
// ONCE THE HASH IS FOUND, SAVE BLOCK TO MEMORY
// PUSH THE HASH BACK TO THE CHAIN

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



function ascii_to_hexa(str) {
                            	var arr1 = [];
                            	for (var n = 0, l = str.length; n < l; n ++){var hex = Number(str.charCodeAt(n)).toString(16); arr1.push(hex);}
                            	return arr1.join('');}
function m(variables){
                              console.log(`\n${variables}`);}


function return_hash(index,block_data){
                      let data_array = index.split("");
                      const hashify =  (data, results) => {
                            return new Promise(async (r,j)=> {
                              const result = await Promise.all( results.map(closest=>
                                                        new Promise( (res,rej) =>{const worker = new Worker(worker_path, {workerData: closest});
                                                                      worker.on('message',res);
                                                                      worker.on('error',rej);
                                                                      worker.on('exit',(code)=>{if(code!==0) rej(new Error(`Worker stopped with exit code: ${code}`));})
                                                      })));
                              temp = result;
                              r(result);})}


                      let results = [];
                      for (var i = 0; i < cpu_count; i++) {results.push([0,0,index]);}
                      let last = 0;
                      function solve(data, array){
                        results.forEach((item,i)=>{for(var k=0;k<i;k++){if(results[k][0]<item[0]){results[k]=item}}});
                        if(results[0][0]>last){last=results[0][0];save_JSON_to(results, `${SHA(index).toString()}.js`,"");}
                        hashify(data,results).then(contenders=>{results = contenders;if(contenders[0][0] < data.length){solve(index,contenders);}else{return JSON.parse(results[0][1]).NONCE}})}

                      load_file_JSON(`${SHA(index).toString()}.js`,(data)=>{if(data)results = data;})

  return solve(index,results);
}
