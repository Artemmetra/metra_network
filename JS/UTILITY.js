const {remote} = require('electron');


function load_file_JSON(path,qx){
  if (fs.existsSync(path)) {
    let data = fs.readFileSync(path, 'utf8');
    qx(JSON.parse(data));
  }else{
    qx(false);
  }
}

function save_JSON_to(to_save, file_name,location) {
  fs.writeFile(location+file_name, JSON.stringify(to_save), (err) => {
          if (err) {
          console.log(err);
          } else {}
  });
}



function transaction_send(){
  date = new Date();
  transaction(
              el("transaction_name").value,
              el("transaction_type").value,
              el("transaction_parameters").value,
              el("transaction_children").value,
              Date.now()
             );
}


function preview_paralax(){
  // Load a new paralax object from the transaction view and add it to the preview box
  // ! The preview box should be later replaced with new electron window, so that is has its own dev tools
  el('preview').childNodes.forEach(ch=>{
                                        ch.parentNode.removeChild(ch);
                                  });

  try{
  let type = el("transaction_type").value;
  let parameters = JSON.parse("{"+el("transaction_parameters").value+"}");
  let children = JSON.parse("["+el("transaction_children").value+"]");

  let child = [type,parameters,children]

  append("preview",child)

  }catch(e){console.log(e)}

}


// Toggle display between pages of the app
function toggle(page){
  let pages = document.getElementsByClassName("page");
  for (var i = 0; i < pages.length; i++) {
      pages[i].classList.add("hidden");
      el(page).classList.remove("hidden");
    }
}


// Header Menu buttons actions
function menu_buttons(type){
let window = remote.getCurrentWindow();
  switch (type) {
    case "x":
      window.close();
      break;
    case "min":
      window.minimize();
      break;
    case "max":
      window.maximize();
      break;
    default:
  }
}

// Toggle hidden on the child of parent that has collapsable class
function collapse_(target){
  target.parentNode.childNodes.forEach(child=>{
    if(child.classList.contains("collapsable"))
      {
        //child.process();
        child.classList.toggle('hidden');
      }
  })
}
