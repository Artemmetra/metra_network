const { ipcRenderer } = require('electron')

//MAIN:
let main_chain = {};
let fx = {};

fx.init = (data)=>{
  main_chain = data.chain;
  init();
  return main_chain;
}

let m = (qx, data)=>{
  let responce = ipcRenderer.sendSync('m', {fx:qx,data:data});
  return fx[responce.fx](responce.data);
}



ipcRenderer.on('m', (event, arg) => {
  try{
    if(Object.keys(fx).includes(arg.fx)){
                                        event.returnValue = fx[arg.fx](arg.data);
                                      }else{
                                        console.log(arg.fx  + ": No such function");
                                      }
  }
  catch(e){
    console.log(e);
  }
})
