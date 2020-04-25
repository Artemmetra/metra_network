
let chain_view = ['div',{'id':'chain_view','class_add':['data_construct']},[]];


let transaction_bin = ['div',{'id':'transaction_bin','class_add':['data_construct']},[]];

let chain_page =  ['div',{'id':'chain_page','class_add':['hidden','page']},[

                    data_line("Chain View"),
                    container([collapse("New Packets"),collapsable([transaction_bin])]),
                    container([(collapse("Recorded Blocks")),collapsable([chain_view])])

                    ]];
