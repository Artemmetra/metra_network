let chain_view = ['div',{'id':'chain_view','class_add':['data_construct','grid']},[]];

let transaction_view = ['div',{'id':'transaction_view','class_add':['data_construct','grid']},
                              [
                                  data_entry_line("SENDER:","transaction_sender"),
                                  data_entry_line("RECEIVER:","transaction_receiver"),
                                  data_entry_line("CONTENT:","transaction_content"),
                                  button("SEND","transaction_send();")
                              ]
                        ];

let transaction_bin = ['div',{'id':'transaction_bin','class_add':['data_construct']},[]];

let menu = [ button('ADD BLOCK','new_block([1,1,1]);'),
             button('ADD TRANSACTION','transaction("sender", "receiver", "content", "time");')]

let header = ['header',{'id':'header','class_add':['grid']},menu];

let home = ['div',{'id':'home','class_add':['grid']},[header,transaction_view,transaction_bin,chain_view]];

document.body.appendChild(dom(home));



function show_chain(){
  el("chain_view").textContent = "";
  chain.forEach(block_=>{
    append("chain_view",block(block_))
  })
}

function show_transactions(){
  el("transaction_bin").textContent = "";
  bin.forEach(transaction_=>{
    append("transaction_bin",trx(transaction_))
  })
}




function transaction_send(){
  date = new Date();
  transaction(el("transaction_sender").value,
              el("transaction_receiver").value,
              el("transaction_content").value,
              Date.now()
             );
}


function animate(){
  show_chain();
  show_transactions();


  setTimeout(function () {
    animate();
  }, 1000);
}

animate();
