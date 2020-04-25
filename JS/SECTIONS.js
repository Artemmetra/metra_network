let fx_log = {
  log: function(){console.log(this)}
}

let button = function(text,onclick,add_class) {
  return ['div',{
                  'class_add':add_class,
                  'textContent':text,
                  'onclick':onclick
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
                },children];
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
                             ['grid-template-columns',ratio]
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
