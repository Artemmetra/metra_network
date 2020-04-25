

let user_login = function(text,onclick,add_class) {
  return ['div',{
                  'id':"user_login_box",
                  "class_add":['grid']
                },[

                  input("text","user_name","USERNAME"),
                  input("password","user_password","PASSWORD"),
                  left_right( "1fr 1fr", [
                                  button('UNLOCK','console.log("SUBMIT")',['submit_button']),
                                  button('SIGNUP','this.log',['submit_button'])
                              ])

              ]];
};

let login_menu = ['div',{'id':'login_menu'},[user_login()]];
