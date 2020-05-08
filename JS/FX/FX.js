let fx = {};

fx.log = ()=>{
  let responce = {};
  responce.data = "Received at:" + Date.now();
  responce.fx = 'log';
  console.log("Ping at: "  + Date.now());
  return responce;
};

// REWORK INIT SO THAT THE CHAIN IS NOT RELOADED EACH TIME THE INIT FUCNTION IS CALLED,
// BUT RETURNS THE CHAIN VALUE IF IT HAS ALREADY BEEN ACCESSED

fx.init = ()=>{
  let responce = {};
                          //  Check if CHAIN.mn exists as file
                          ("DATA/CHAIN.mn",(data)=>{
                             if(data){
                              Object.keys(data).forEach(c=>{
                                  // Becasue JSON only saves the parameters of an object, we will reinitiate the CHAIN object with the parameters at start
                                  // this implies that all of the blocks need to be readded separately if ever we start adding functionality to the blocks directly
                                  let chain = data[c];
                                  new CHAIN(chain.blocks, chain.bin, chain.id, chain.description, chain.parameters);
                              })

                             } else{
                               new CHAIN({},[],"0","MAIN CHAIN",[],[]);
                               save_JSON_to(mc, "CHAIN.mn","DATA/");
                             }
                          });

                          //  Check if BIN.mn exists as file
                          ("DATA/BIN.mn",(data)=>{
                             if(data){
                               bin = data;
                             } else{
                              // save_JSON_to(bin, "BIN.mn","DATA/");
                             }
                          });

  responce.data = {chain: mc, bin: bin};
  responce.fx = 'init';

  return responce;
}


module.exports = fx;
