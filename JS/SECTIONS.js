let fx_log = {
  log: function(){console.log(this)}
}

let button = function(text,onclick,add_class) {
  return ['div',{
                  'textContent':text,
                  'onclick':onclick,
                  'class_add':add_class,
                }];
}




// Modify the block to make it cleaner for view and expandable for details
let block = function(block_) {
  return ['div',{
                  'class_add':['block'],
                },[
                    collapse(block_.hash),
                    collapsable([
                              data_line(block_.previous),
                              data_line(block_.data)
                            ])
                  ]
                ];
}

let collapse = function(text){

  return ['div',{
                  'class_add':['collapse'],
                  'onclick': 'collapse_(this)',
                  'textContent': text
                },[]];

}

let collapsable = function(children){
  return ['div',{
                  'class_add':['collapsable', 'hidden'],
                },
                children,
                {
                  "onclick":function(){console.log(this)},

                }];
}

let trx = function(transaction_) {
  return ['div',{
                  'class_add':['transaction','grid'],
                },[data_line(transaction_.hash),
                   data_line(transaction_.time),
                   data_line(transaction_.sender),
                   data_line(transaction_.receiver),
                   data_line(transaction_.content)]];
}

let data_line = function(data_) {
  return ['div',{
                  'class_add':['data_line','grid'],
                  'textContent':data_,
                },[]];
}


let textarea = function(id){
  return ['textarea',{
                  'class_add':['textarea'],
                  'id':id
                }];
}

let data_entry_line = function(title,id){
  return ['div',{
                  'class_add':['data_entry_line','grid'],
                },[data_line(title),textarea(id)]];

}

let top_bottom = function(ratio,children){
  return ['div',{
                  'class_add':['top_bottom','grid'],
                  'style':[
                             ['grid-template-rows',ratio]
                           ],
                },children];
}

let left_right = function(ratio,children){
  return ['div',{
                  'class_add':['left_right','grid'],
                  'style':[
                             ['grid-template-columns',ratio],
                             ['grid-gap','10px']
                           ],
                },children];
}

let input = function(type,id,placeholder){
  return ['input',{
                  'class_add':['input'],
                  'type':type,
                  'id':id,
                  'placeholder':placeholder
                }];
};


let input_w_label = function(type,id,placeholder,label){
  return p(container([

    ['input',{
                    'class_add':['title', 'transparent_input'],
                    'type':type,
                    'id':id,
                    'name':label,
                    'placeholder':placeholder
                  }],

    ['label',{
                    'class_add':['input_label'],
                    'for':label,
                    'textContent':label
                  }]

  ]),{"class_add":['transparent_group']})
}

dom(["style",".transparent_group",{
                                    'position'        : 'relative',
                                    'padding'         : '15px 0 0',
                                    'margin-top'      : '10px',
                                  },[]]);


dom(["style",".transparent_input",{
                                    'font-family'     : 'inherit',
                                    'width'           : '100%',
                                    'border'          : '0',
                                    'border-bottom'   : '2px solid var(--main-menu-complementary)',
                                    'outline'         : '0',
                                    'font-size'       : '0.8rem',
                                    'padding'         : '7px 0',
                                    'background'      : 'transparent',
                                    'transition'      : 'all 0.3s',
                                  },

                                  [
                                    ["::placeholder",{
                                     "color"          : "transparent",
                                   },[]],

                                    [":placeholder-shown",{
                                     "border-bottom"  : "2px solid var(--main-menu-color)",
                                   },[
                                                                                             [" ~ .input_label",{
                                                                                               "color"         : "var(--main-menu-color)",
                                                                                               "font-size"     : "0.8rem",
                                                                                               "cursor"        : "text",
                                                                                               "user-select"   : "none",
                                                                                               "top"           : "20px",
                                                                                            },[]],
                                   ]],

                                    [":required",{
                                     "box-shadow"     : "none",
                                   },[]],

                                    [":invalid",{
                                     "box-shadow"     : "none",
                                   },[]],


                                   [":focus",{
                                     "padding-bottom" : "6px",
                                     "border-width"   : "3px",
                                     "border-color"   : "var(--main-menu-color)",
                                  },[
                                                                                          [" ~ .input_label",{
                                                                                            "position"      : "absolute",
                                                                                            "top"           : "0",
                                                                                            "display"       : "block",
                                                                                            "transition"    : "0.2s",
                                                                                            "font-size"     : "0.8rem",
                                                                                            "color"         : "var(--main-menu-color)",
                                                                                         },[]],
                                  ]],


]]);

dom(["style",".input_label",{
                                      "position"      : "absolute",
                                      "top"           : "0",
                                      "display"       : "block",
                                      "transition"    : "0.2s",
                                      "font-size"     : "1rem",
                                      "color"         : "var(--main-bg-color)",
                                  },[]]);





/* /////////////////////////////////////////////////////////// */


let label = function (text){
  return ['label',{
                  'class_add':['label'],
                  'textContent':text,

                }];
}

let icon = function(text){
  return ['div',{
                  'textContent':text,
                  'class_add':['icon','grid'],
                }];
}

let container = function(children){
  return ['div',{
  },children];
}
