const fs = require('fs');

function load_file_JSON(path,qx){
  if (fs.existsSync(path)) {
    data = fs.readFileSync(path, 'utf8');
    qx(JSON.parse(data));
  }else{
    qx(false);
  }
}
