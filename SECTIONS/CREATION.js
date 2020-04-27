// FUCNCTIONS:
//              (1) Name       should be hashed to see if it already exists
//              (2) Input      should create temporary variables for the use inside the object
//              (3) Type       should autocomplete the type based on  type library
//              (4) Parameters should allow addition of either custom or known Parameters
//                             * should look through known classes and suggest them


// parameter_name on change should generate a new parameter entry div

let remove_parameter     = p(button("-","",['add_parameter','remove_parameter', 'to_reveal']),{'onclick':'remove_child(this.parentNode)'});

let add_parameter        = nc(p(button("Add Parameter","",['add_parameter']),{'onclick':'new_parameter(this)'}),['to_reveal']);

let parameter_           = nc(left_right('40px 200px 1fr',[
                                                          remove_parameter,
                                                          input_w_label('text','','Parameter','Parameter'),
                                                          input_w_label('text','','Value','Value')]
                                                        ),['revealer','param_bin']);

let code_preview = ['div',{'id':'code_preview','class_add':['code_preview']},[]];

dom(['style','.code_preview',{
                              'margin-top': '100px',
                              'height': '400px',
                              'background-color': '#777777',
                              'padding':'10px',
                              'color': 'floralwhite',
},[]])


dom(['style','.revealer',{},[
                              [':hover > .to_reveal',{
                                                    'background': 'var(--main-menu-color)'
                              }]
]])

dom(['style','.to_reveal',{'background':'transparent'},[]])

dom(['style','.remove_parameter',{'margin':'38px auto'}]);

dom(['style','.add_parameter',{
                              /*'margin':'50px auto',*/
                              /*'width':'15px',*/
                              'text-align':'center',
                              'height':'26px',
                              'font-size':'x-large',
                              'padding':'0px 10px',
                              /*'background-color':"var(--main-menu-color)",*/
                              'user-select':'none',
                              'cursor':'pointer',
                              'transition': 'all 0.1s ease 0s',
                              'border-radius': '45px',
                              'color':'white'}, [
                                                  [':hover',{
                                                            'background-color':'var(--main-tetriary-color)',
                                                            'transform': 'translateY(-3px) translateX(-2px)',
                                                            'box-shadow': '2px 15px 20px rgba(32,160,109, 0.4)',

                                                          }]
                              ]])


function new_parameter(element){
  element.parentNode.insertBefore(dom(parameter_), element);
}

function remove_child(element){
  element.parentNode.removeChild(element);
}

let parameters_sub    = ['div',{'id':'parameters_sub','class_add':['grid','revealer']},[
                            parameter_,
                            add_parameter
                          ]
                        ];




let title_menu = ['div',{'class_add':['title_menu','flex']},[
                        data_line("Creation Page"),
                        button("SEND","transaction_send();",["button"]),
                        button('Preview','console.log("Preview");preview_paralax()',["button"])
                  ]];

let preview = ['div',{'id':'preview','class_add':['grid']},[]];

function preview_paralax(){
  // Load a new paralax object from the transaction view and add it to the preview box
  // ! The preview box should be later replaced with new electron window, so that is has its own dev tools
  el('preview').childNodes.forEach(ch=>{
                                        ch.parentNode.removeChild(ch);
                                  });

  try{
  let type = el("transaction_type").value;
  let name = el("transaction_name").value;
  let input = el("transaction_input").value;

  let param_bin = document.getElementsByClassName('param_bin');
  let params = "{";

  for (var i = 0; i < param_bin.length; i++) {
    params+= param_bin[i].childNodes[1].childNodes[0].value + ":" + param_bin[i].childNodes[2].childNodes[0].value;
    if(i!=param_bin.length-1){
       params+= ","
    }
  }
  params +="}";

  console.log(params);

  let parameters = JSON.parse(params);
  let children = JSON.parse("["+el("transaction_children").value+"]");

  let child = [type,parameters,children]

  el('code_preview').innerHTML = "let " + name +" = function(" + input + "){\nreturn "+JSON.stringify(child)+"\n;}";
  append("preview",child);

  }catch(e){console.log(e)}

}


let transaction_view  = ['div',{'id':'transaction_view','class_add':['data_construct']},
                              [
                                  input_w_label("text","transaction_name","Name","Name"),
                                  left_right("1fr 5fr",[
                                                          input_w_label("text","transaction_type","Type","Type"),
                                                          input_w_label("text","transaction_input","Input","Input"),
                                             ]),
                                  parameters_sub,
                                  left_right("1fr 1fr 1fr",[
                                                            data_line("Children:"),
                                                            button("Find","",[]),
                                                            button("Create","",[]),
                                                          ]),

                                  code_preview,
                                  preview,


                              ]
                        ];

let transaction_preview = p(
                            top_bottom("4fr 1fr",[preview]),
                            {'id':'transaction_preview'}
                          );

let transaction_entry = ['div',{'id':'transaction_entry', 'class_add':[]},[transaction_view]];



let transaction_page = ['div',{'style':[['grid-template-rows','40px 1fr']],'id':'transaction_page','class_add':['grid','page']},[title_menu,transaction_entry,transaction_preview]];
