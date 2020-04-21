
let chain_view = ['div',{'id':'chain_view','class_add':['data_construct','grid']},[]];

let transaction_bin = ['div',{'id':'transaction_bin','class_add':['data_construct','grid']},[]];

let menu = [ button('ADD BLOCK','new_block([1,1,1]);show_chain()'), button('ADD TRANSACTION','transaction("sender", "receiver", "content", "time");console.log(bin.length)')]

let header = ['header',{'id':'header','class_add':['grid']},menu];

let home = ['div',{'id':'home','class_add':['grid']},[header,chain_view,transaction_bin]];

document.body.appendChild(dom(home));



function show_chain(){
  el("chain_view").textContent = "";
  chain.forEach(block_=>{
    append("chain_view",block(block_))
  })
}

show_chain()
