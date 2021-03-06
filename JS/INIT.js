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


let menu = ['div',{'id':'header_menu'}, [ button('x','menu_buttons("x");',["header_button"]),
                                        button('min','menu_buttons("min");',["header_button"]),
                                        button('max','menu_buttons("max");',["header_button"]),]];

let draggable = ['div',{'id':'draggable'},[]];

let header = ['header',{'id':'header','class_add':['grid']},[draggable,menu]];






let home = ['div',{'id':'home','class_add':['grid']},[header, home_page ,transaction_page,chain_page,timeline_page]];

let left_menu = ['div',{'id':'left_menu','class_add':['grid']},[

                button('⋈','toggle("home_page");',["main_menu_button"]),
                button('▶','toggle("chain_page");',["main_menu_button"]),
                button('✎','toggle("transaction_page");',["main_menu_button"]),
                button('☀','toggle("timeline_page");',["main_menu_button"]),
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
  //refresh('chain_view', main_chain[0], block);
  //refresh('transaction_bin', bin, trx);

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
function init(){
  document.body.appendChild(dom(page));
}
m('init','');
animate();
