

let transaction_view = ['div',{'id':'transaction_view','class_add':['data_construct','grid']},
                              [
                                  data_entry_line("Name:","transaction_name"),
                                  data_entry_line("Type:","transaction_type"),
                                  data_entry_line("Parameters:","transaction_parameters"),
                                  data_entry_line("Children:","transaction_children"),
                                  data_entry_line("Input:","transaction_input"),
                                  button("SEND","transaction_send();",["button"])
                              ]
                        ];


let preview = ['div',{'id':'preview','class_add':['grid']},[]];

let transaction_preview = p(
                            top_bottom("4fr 1fr",[preview,button('Preview','console.log("Preview");preview_paralax()',["button"])]),
                            {'id':'transaction_preview'}
                          );

let transaction_entry = ['div',{'id':'transaction_entry', 'class_add':['grid']},[transaction_view]];



let transaction_page = ['div',{'id':'transaction_page','class_add':['hidden', 'grid','page']},[data_line("Creation Page"),transaction_entry,transaction_preview]];
