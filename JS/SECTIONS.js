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

let data_line = function(data_) {
  return ['div',{
                  'class_add':['data_line'],
                  'textContent':data_,
                },[]];
}
