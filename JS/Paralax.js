//*//////////////////////////////////////////////////////////////////////////*//
/*///////////  Paralax
#////////////  By: Artem Chinkarouk
#////////////
#////////////
#////////////
*////////////


function dom(element){
//  Element consists of:
//                      (1) Element type;   Such as:  'input','div','a' et cetera.
//                      (2) Parameters;     Fed as:   {name:'name', id: 'id'...}.
//                      (3) Children;       Hierarchically from left to right: [El1,El2].
//                      (4) Functions;       Functions are binded to the dom element at birth
    //console.log(element);
    let result = document.createElement(element[0]);

    parameter(result,element[1]);

    if(element[2]!=null){
          element[2].forEach(child=>{
            result.appendChild(dom(child));
          })
    }

    if(element[3]!=null){
      // we can make the function into an object with pair title and function
          functions(result,element[3]);
    }


    return result;
}
function functions(element,functions_){
  //let keys = Object.keys(functions_);

  Object.keys(functions_).forEach(key=>{
    let function_ = functions_[key];
    switch (key) {
      // Load a recorded function from the chain library
      case "library":
                        element[function_] = fx_log[function_];
          break;
      // Load a custom function
      default:
                        element[key] = function_;

      break;
    };
  })

}


function parameter(element,parameters){
    let keys = Object.keys(parameters);

      Object.keys(parameters).forEach(key=>{
        let parameter = parameters[key];
        switch (key) {
          // Remove a class from a given element
          case "class_remove":
                            parameters[key].forEach(cl=>{
                              element.classList.remove(cl);
                            })
            break;

          // Add a class to a given element
          case "class_add":
                            parameters[key].forEach(cl=>{
                              element.classList.add(cl);
                            })
            break;

          // Add a specific style to a given element
          case "style":
                            parameters[key].forEach(style=>{
                              element.style[style[0]] = style[1];
                            })
            break;

          // Set the text content of the given element
          case "textContent":
                            element.textContent = parameters[key];
            break;

          // Treat all other attribute sets
          default:
                            element.setAttribute(key,parameters[key]);
          break;
        }
      })
}

function c(element,new_children){
  return element[1] = element[1].concat(new_children);
}

function p(element,new_parameters){
    Object.keys(new_parameters).forEach(key=>{
      element[1][key] = new_parameters[key];
    })
    return element;
}

function f(element,new_functions){
      if(element[2]!=null){
        if(element[3]!=null){
        return element[3] = element[3].concat(new_functions);
      }else{
        element[2] = {};
        return element[3] = element[3].concat(new_functions);
      }
    }
}

function el(id){
  return document.getElementById(id);
}

function append(parent,child){
  el(parent).appendChild(dom(child));
}



//*//////////////////////////////////////////////////////////////////////////*//

// The engine should have some method of function calling and handling

// Given that all update-data happens on the network, there should be
// a list of documents that are being tracked to see if the hash has changed

// Each dom element can have a binding passing self as its value
// functions can be recorded in the sections to provide functionality
// to the interaction
