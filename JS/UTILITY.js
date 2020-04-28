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

// This function is unfinished
function load_multiple(array_of_files_to_load){
  array_of_files_to_load.forEach(file=>{

  })

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


// Toggle display between pages of the app
function toggle(page){
  let pages = document.getElementsByClassName("page");
  for (var i = 0; i < pages.length; i++) {
      pages[i].classList.add("hidden");
      el(page).classList.remove("hidden");
    }
    if(page =="transaction_page")el("draggable").textContent = "Creation Page";
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
