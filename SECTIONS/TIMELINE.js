
let time_entry =  function(id,icon_,timeline_title,timeline_content){
  return ['div',{
                  'id': id,
                  'class_add':['time_entry','grid'],
                  'style':[['grid-template-columns','1fr 8fr']]
                },[
                    // type icon

                                            icon(icon_),
                                            p(container([
                                                                      p(collapse(timeline_title),{'style':[['text-align','center']]}),
                                                                      collapsable(
                                                                                    [
                                                                                      data_line(timeline_content)
                                                                                    ]
                                                                                 )
                                                                  ]),{"class_add":['time_line_data_container']}),
                                            /*icon(icon_)*/

                    // container
                        //collapse title
                        //collapsable text


                ]];

}




let timeline_page =  ['div',{'id':'timeline_page','class_add':['hidden','grid','page']},[
                        data_line("PATCH NOTES TIMELINE"),
                        time_entry("time_entry_id","☑","timeline_title","content"),
                        time_entry("time_entry_id","☐","timeline_title","content"),
                        time_entry("time_entry_id","☐","timeline_title","content"),
                        time_entry("time_entry_id","☐","timeline_title","content"),
]];
