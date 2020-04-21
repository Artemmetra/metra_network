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
          case "class_remove":
                            parameters[key].forEach(cl=>{
                              element.classList.remove(cl);
                            })
            break;
          case "class_add":
                            parameters[key].forEach(cl=>{
                              element.classList.add(cl);
                            })
            break;
          case "textContent":
                            element.textContent = parameters[key];
            break;
          default:
                            element.setAttribute(key,parameters[key]);
          break;
        }
      })
}

function el(id){
  return document.getElementById(id);
}

function append(parent,child){
  el(parent).appendChild(dom(child));

}
