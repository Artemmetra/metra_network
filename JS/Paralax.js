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
    //console.log(element);
    let result = document.createElement(element[0]);
    parameter(result,element[1]);

    element[2].forEach(child=>{
      result.appendChild(dom(child));
    })

    return result;
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

function el(id){
  return document.getElementById(id);
}

function append(parent,child){
  el(parent).appendChild(dom(child));
}
