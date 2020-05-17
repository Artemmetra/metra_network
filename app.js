const menuTemp = [];
const electron = require('electron');
const url = require('url');
const path = require('path');
const { ipcMain } = require('electron');
const readline = require('readline');

// Crypro Library requirement
global.SHA = require("crypto-js/SHA256");
const {CHAIN} = require('./JS/BLOCKCHAIN/CHAIN.js');
const main_chain = mc;
// CHAIN functions for ipcMAIN
const fx = require('./JS/FX/FX.js');

const { app, BrowserWindow, Menu} = electron;

let mainWindow;
// On app load
app.on('ready', function() {
  mainWindow = new BrowserWindow({ icon:'IMAGES/IDEAS/icon_type.jpg', webPreferences: {nodeIntegration: true}, minWidth: 600, minHeight: 800, frame: false});
  mainWindow.webContents.openDevTools()
  mainWindow.loadURL(url.format({
    // The index.html could be constructed on the app.js side and simply sent out. No need to have an index.html file
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true,
  }));
  mainWindow.on('closed', ()=>{
    mainWindow = null;
  })
  const mainMenu = Menu.buildFromTemplate(menuTemp);
  Menu.setApplicationMenu(mainMenu);
});

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IPC MAIN FUNCTIONS /////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

ipcMain.on('m', (event, arg) => {
  try{
    if(Object.keys(fx).includes(arg.fx)){
                                        event.returnValue = fx[arg.fx](arg.data);
                                      }else{
                                        console.log("\nRequest for " + arg.fx + " received at: " + Date.now());
                                        console.log(arg.fx  + ": No such function");
                                      }
  }
  catch(e){
    console.log("Error in ipcMaim message reception process:\n",e);
  }
})



///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// CHAIN BUILDING /////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Memory object contains the current state of all the objects tracked
// Just like the main chain, the memory object should be stored to the file system for load
let memory = {};
let processing = [];
let quarantine = [];


// From the data saved in the CHAIN.mn file, build the library of chains that are tracked.

// Each chain should have the hash of the block where it originated, so that the users system could look through the chain
// starting at the initializing block.

// All tracked chains have to be dropped to system as JSON files for storing and modification.

// Perhaps completed blocks could be saved to system as files and accessed when needed.

// A hash table should specify in which block which transaction is located.

// Within a block, a transaction modifying a specific block has to contain the hash of the chain as first element, the hash of the last element
// the entry type and the data stored.

// All operations are completed by the main-chain fx processor, the sub-chains function have to be completed using the fx processor.
// Additions of new function to the main chain modifies the code of the running program and force the program to restart, while
// modifications to the sub-chain functions utilizes already loaded functions and allows the program to remain uninterupted.

// On each load, the chain receives all the latest blocks and processes them

// if a followed sub-chain has been updated, the update function stores the transaction based on the hash of the target sub-chain and stores it to memory, then flushes the file to system.


function update_object(hash,block){
      try {

        // In order to simplify the process of treating transactions, the creation of the followed sub-chain can be done directly in the update_object function

        // Read whether the chain exists in memory
        if(!Object.keys(main_chain).includes(hash)){
                                                  // A new chain is created and the hash is added to the follow parameter of the main chain
                                                  new CHAIN({}, [], hash, '', '');

        }

        // If the chain already exists, we log its new block to the chain
        main_chain[hash].add_block(block.data);

        // Send the processing a request to treat and update the current state in the memory object
        processing.push([hash]);

      } catch (e) {

        console.log(e);

      } finally {

        // If the block has not been properly treated, the chain has to be quarantined and set for recalculation
        quarantine.push(hash);
      }

}





//update_object(SHA('test').toString(),{data:'hh',description:"This is a test block",hash:SHA('test_block').toString()});
//update_object(SHA('test').toString(),{data:'gg',description:"This test block is an new addition to an existing block",hash:SHA('test_block_2').toString()});


// Ok so we can add blocks and chains based on the transaction requests in the main_chain.


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// WEBSOCKET CONNECTION ///////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Next step is to simulate an addition to the main_chain, in such a way that while the program is functioning, it received a new block on timeout and adds it to the main_chain, it then verifies
// the new block and reads it for new transactions. Within these transactions, we should test the creation of a new chain and a modification to an existing chain.

/*
var W3CWebSocket = require('websocket').w3cwebsocket;
var client = new W3CWebSocket('ws://localhost:8080/', 'echo-protocol');
client.onerror = function() {
    console.log('Connection Error');
};
client.onopen = function() {
    console.log('WebSocket Client Connected');
    // Communicate client hash to server;
    client.send(JSON.stringify({TYPE: 'LOGIN', CONTENT: SHA("SOME_HASH").toString()}));
    connected();
};
client.onclose = function() {
    console.log('echo-protocol Client Closed');
};
client.onmessage = function(e) {
    if (typeof e.data === 'string') {
        console.log("Received: '" + e.data + "'");
    }
};
*/


// We are now going to generate fictional blocks to see if the server node can push all missing blocks
// by asking to subit the last block on chain hash

// We will generate a fake block with hash and send it to the server every 10 seconds
// then the program will close the connection and delete all blocks except the first block and reconnect to the server

// First we send just random data and ask the server to save it
function connected(){
  //let block_hash = create_share(["Some data","Some other data"]);
  //client.send(JSON.stringify({TYPE: 'LAST_BLOCK', CONTENT: {LAST: main_chain.getPrevious(), BLOCK: main_chain[0]}}));
}


function create_share(block_data){
  return main_chain['0'].add_block(block_data,"test");
}
