//*//////////////////////////////////////////////////////////////////////////*//
/*///////////  Paralax
#////////////  By: Artem Chinkarouk
#////////////
#////////////
#////////////
*////////////


function dom(element){
  switch (element[0]) {
      case "style":
      //  Style element consists of:
      //                      (1) Element type;   style
      //                      (2) Name;           Class name
      //                      (3) Direct;         Parameters applied directly to this class
      //                      (4) Children;       Parameters applied as children. (Created separately)

      let name = element[1];
      let direct = element[2];
      let style = document.createElement('style');
      style.type = 'text/css';
      style.setAttribute("id", name);
      // For the current test, this is ok, but for the actual process, direct has to be expresly built by the engine
      style.innerHTML = name + "{" + style_parse(direct) + "}";
      document.getElementsByTagName('head')[0].appendChild(style);

      if(element[3]!=null){
        let children = element[3];
        children.forEach(child=>{

            dom(["style", name + child[0], child[1], child[2]]);

        })
      }
      break;

      default:
      //  Element consists of:
      //                      (1) Element type;   Such as:  'input','div','a' et cetera.
      //                      (2) Parameters;     Fed as:   {name:'name', id: 'id'...}.
      //                      (3) Children;       Hierarchically from left to right: [El1,El2].
      //                      (4) Functions;      Functions are binded to the dom element at birth

                let result = document.createElement(element[0]);
                parameter(result,element[1]);
                if(element[2]!=null){
                      element[2].forEach(child=>{
                        result.appendChild(dom(child));
                      })
                }
                if(element[3]!=null){
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

function nc(element, new_classes){
  element[1]['class_add'] = element[1]['class_add'].concat(new_classes);
  return element;
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

function style_parse(styles){
  result = "";
  Object.keys(styles).forEach(key=>{
    result +=(key+":"+styles[key]+";");
  })
  return result;
}




console.log(document.getElementsByTagName('head')[0]);

//*//////////////////////////////////////////////////////////////////////////*//

// The engine should have some method of function calling and handling

// Given that all update-data happens on the network, there should be
// a list of documents that are being tracked to see if the hash has changed

// Each dom element can have a binding passing self as its value
// functions can be recorded in the sections to provide functionality
// to the interaction

// WHEN Paralax is moved to the server-side, the page will be passed as a dom element to the client

const SHA = require('crypto-js/SHA256');
class EL {
              constructor(name,type,inputs,parameters,children){
                this.name = name;
                this.type = type;
                this.inputs = inputs;
                this.parameters = parameters;
                this.children = children;
                this.hash = SHA([type,name].toString()).toString();
              }
}

// The ELK
