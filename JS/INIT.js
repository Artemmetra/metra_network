///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Removing loading ANIMATION

el('loader').parentNode.removeChild(el('loader'));

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// PAGE SECTIONS


let chain_view = ['div',{'id':'chain_view','class_add':['data_construct']},[]];

let transaction_view = ['div',{'id':'transaction_view','class_add':['data_construct','grid']},
                              [
                                  data_entry_line("Name:","transaction_name"),
                                  data_entry_line("Type:","transaction_type"),
                                  data_entry_line("Parameters:","transaction_parameters"),
                                  data_entry_line("Children:","transaction_children"),
                                  button("SEND","transaction_send();",["button"])
                              ]
                        ];
let preview = ['div',{'id':'preview','class_add':['grid']},[]];

let transaction_preview = p(
                            top_bottom("4fr 1fr",[preview,button('Preview','console.log("Preview");preview_paralax()',["button"])]),
                            {'id':'transaction_preview'}
                          );


let transaction_entry = ['div',{'id':'transaction_entry', 'class_add':['grid']},[transaction_view,transaction_preview]];

let transaction_bin = ['div',{'id':'transaction_bin','class_add':['data_construct']},[]];

let menu = ['div',{'id':'header_menu'}, [ button('x','menu_buttons("x");',["header_button"]),
                                        button('min','menu_buttons("min");',["header_button"]),
                                        button('max','menu_buttons("max");',["header_button"]),]];

let draggable = ['div',{'id':'draggable'},[]];

let header = ['header',{'id':'header','class_add':['grid']},[draggable,menu]];

let login_menu = ['div',{'id':'login_menu'},[
                  // text on top

                  // Username entry

                  // Password entry

                  // Submit button

]];

let home_page =  ['div',{'id':'home_page','class_add':['grid','page']},[login_menu]];

let chain_page =  ['div',{'id':'chain_page','class_add':['hidden','grid','page']},[transaction_bin,chain_view]];

let transaction_page = ['div',{'id':'transaction_page','class_add':['hidden', 'grid','page']},[transaction_entry]];



let home = ['div',{'id':'home','class_add':['grid']},[header, home_page ,transaction_page,chain_page]];

let left_menu = ['div',{'id':'left_menu','class_add':['grid']},[

                button('⋈','toggle("home_page");',["main_menu_button"]),
                button('▶','toggle("chain_page");',["main_menu_button"]),
                button('✎','toggle("transaction_page");',["main_menu_button"]),
]];

let page = ['div',{'id':'page','class_add':['grid']},[left_menu,home]];



///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// PAGE ANIMATION

function refresh(element_id,source,type){
          el(element_id).textContent = "";
          source.forEach(sub_el=>{
            append(element_id,type(sub_el))
          })

}

function animate(){
  refresh('chain_view',chain,block);
  refresh('transaction_bin',bin,trx);

  /*setTimeout(function () {
    animate();
  }, 10000);*/
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// PAGE INITIALIZATION

document.body.appendChild(dom(page));
animate();
