let button = function(text,onclick) {
  return ['div',{
                  'class_add':['button'],
                  'textContent':text,
                  'onclick':onclick
                },[]];
}

let block = function(block_) {
  return ['div',{
                  'class_add':['block'],
                },[data_line(block_.hash),data_line(block_.previous),data_line(block_.data)]];
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
                  'class_add':['data_line'],
                  'textContent':data_,
                },[]];
}


let textarea = function(id){
  return ['textarea',{
                  'class_add':['textarea'],
                  'id':id
                },[]];
}

let data_entry_line = function(title,id){
  return ['div',{
                  'class_add':['data_entry_line','grid'],
                },[data_line(title),textarea(id)]];

}
