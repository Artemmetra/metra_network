const WebSocket = require('ws')
const fs = require('fs')
const wss = new WebSocket.Server({ port: 8080 })
// keep let for now and change to const once the load has been fixed to add instead of replace
const users = {};
let user_keys = [];
let chain = [];

// WS connection node serves as a relay for WebRTC connections
// a minimization function has to communicate with the other nodes and als the clients to ping known nodes
// in order to minimize the network latency at all times


// CREATE AND LOAD BLOCKS OF THE CHAIN AS AN ARRAY
// NO CHAIN OPERATIONS ARE DONE ON THE NODE

// Load all the necessary files to memory
// NEXT VERSION: Add workers to multiload
function load_file_JSON(path,qx){
  if (fs.existsSync(path)) {
    try {
      data = fs.readFileSync(path, 'utf8');
      qx(JSON.parse(data));
    } catch (e) {
      fs.unlinkSync(path);
      qx(false);
    }
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


load_file_JSON("CHAIN.mn",(data)=>{
  console.log('LOADING CHAIN.mn');
   if(data){
     chain = data;
   } else{
     save_JSON_to(chain, "CHAIN.mn","");
   }
});

/*load_file_JSON("USER_KEYS.mn",(data)=>{
    console.log('LOADING USER_KEYS.mn');
   if(data){
     user_keys = data;
   } else{
     save_JSON_to(user_keys, "USER_KEYS.mn","");
   }
});*/

// NEXT CHANGE: Use workers to free the main process
// Create multiple backups, in case server dies in the middle of a save
function animate(){
  console.log(`${Date.now()}\tBackup initiated`);
    save_JSON_to(chain, "CHAIN.mn","");
    /*save_JSON_to(user_keys, "USER_KEYS.mn","");*/

    setTimeout(function () {
      animate();
    }, 60000);
}

animate()


wss.on('connection', ws => {
  console.log('\nUSER CONNECTION INITIATED')


  ws.on('message', message => {
  let data = null
  let TYPE;
  try {
    data = JSON.parse(message)
    TYPE =  data.TYPE;
	//console.log(message);
  } catch (error) {
    console.error('Invalid JSON', error)
    data = {}
  }

	switch(TYPE){

		case 'LOGIN':
							let CONTENT =  data.CONTENT;
							ws.id = CONTENT;

							console.log(`Received message => ${TYPE} && ${CONTENT}`)

							if(users[CONTENT]){
							console.log('RETURNING USER')
							users[CONTENT].connection = ws;
							users[CONTENT].online = true;
							sendTo(ws, {TYPE: 'LOGIN', CONTENT: "WELLCOME BACK"})

							}else{
							console.log('NEW USER')
							user_keys.push(CONTENT);
							sendTo(ws, {TYPE: 'LOGIN', CONTENT: "NEW USER ADDED"})
              save_JSON_to(user_keys, "USER_KEYS.mn","");
							}

							NOTIFY_PEERS(CONTENT,'LOGIN');

		break;

		case 'CANDIDATE':

							//	SEND CANDIDATE TO THE OTHER PEER
							//  CHECK IF PEER EXISTS
							if(users[data.PEER]){
								console.log('FORWARDING CANDIDATE FROM ',ws.id," TO ", data.PEER);
								sendTo(users[data.PEER].connection, { TYPE: 'CANDIDATE', CANDIDATE: data.CANDIDATE, PEER: ws.id	});
							}
		break;

		case 'CANDIDATE_RESPONCE':

							//	SEND CANDIDATE TO THE OTHER PEER
							//  CHECK IF PEER EXISTS
							if(users[data.PEER]){
								console.log('FORWARDING CANDIDATE FROM ',ws.id," TO ", data.PEER);
								sendTo(users[data.PEER].connection, { TYPE: 'CANDIDATE_RESPONCE', CANDIDATE: data.CANDIDATE, PEER: ws.id	});

							}
		break;

		case 'OFFER':

							console.log('\nReceived OFFER from ',ws.id,' TO CONNECT TO ',data.PEER);
							if(users[data.PEER]){
								sendTo(users[data.PEER].connection, { TYPE: 'OFFER', OFFER: data.OFFER, PEER: ws.id	});
							}else{


							}
							/*
							user_keys.forEach(key=>{

								if(key!=ws.id){
									if(users[key].online){

										console.log(ws.id," CAN CONNECT TO ",key);
										users[ws.id].peer = users[key].connection;
										console.log(ws.id," new peer added ",users[ws.id].peer.id);

										setTimeout(function () {

										}, 1000);

									}

								}

							})*/



		break;

		case "ANSWER":
							console.log('\nATTEMPTING TO CONNECT', data.PEER, ' TO ', ws.id,'\n');
							if(users[data.PEER]){
							sendTo(users[data.PEER].connection, {
																		  TYPE: 'ANSWER',
																		  ANSWER: data.ANSWER,
																		  PEER: ws.id
																	 	});
							};

		break;

		default:
					console.log("MESSAGE TYPE INCORRECT");
		break;


	}




  })

  ws.on('close', () => {
	  if(users[ws.id]){users[ws.id].online = false;}
		console.log(`User => ${ws.id} DISCONNECTED`);
  })
})

function sendTo(target, content){
	try{target.send(JSON.stringify(content));}catch(error){console.log(error)};

}

function NOTIFY_PEERS(ID,TYPE){

		switch(TYPE){
			case 'LOGIN':
							console.log(user_keys);
			     			user_keys.forEach(key=>{
								if(key!=ID){
									if(users[key].online){
															// INFORM THE PEERS THAT THE INITIATING USER IS ONLINE
															sendTo(users[key].connection, {
																					TYPE: 'USER',
																					USER: {	ID: ID,  ONLINE: true }
															})


															// INFORM THE INITIATING USER THAT THE PEER IS ONLINE
															sendTo(users[ID].connection, {
																					TYPE: 'USER',
																					USER: {	ID: key,  ONLINE: true }
															})

															// REQUEST CONNECTIONS FROM THE USERS ONLINE
															sendTo(users[key].connection, {
																					TYPE: 'OFFER_REQUEST',
																					PEER: ID
															})


									}
								}
							})
			break;
		}

};

console.log("WebSocket RUNNING at port: 8080");
