var outputElement = document.getElementById('output_csv');
var title_data    = new Array();
var date_data     = new Array();
var link_data     = new Array();
var date          = new Date();
let flag;
const title_csv   = 1;
const date_csv    = 2;
const link_csv    = 3;

function create_Array(data,flag){
    if(flag==title_csv){
        create_book_title_array(data);
    }else if(flag == date_csv){
        create_book_date_array(data);
    }else if(flag == link_csv){
        create_book_link_array(data);
    }
}

function get_csv_data(data_path,flag) {
    console.log(flag);
    var request = new XMLHttpRequest();
    request.addEventListener('load',()=>{
        create_Array(request.responseText,flag)
    });
    request.open('GET', data_path, true);
    request.send();
}



function create_book_title_array(csv_title_data) {
    var tmp = csv_title_data.split('\n');
    for (var i = 0; i < tmp.length; i++) {
        title_data[i] = tmp[i];
    }
}

function create_book_date_array(csv_date_data) {
    var tmp = csv_date_data.split('\n');
    for (var i = 0; i < tmp.length; i++) {
        date_data[i] = tmp[i];
    }
}

function create_book_link_array(csv_link_data) {
    var tmp = csv_link_data.split('\n');
    for (var i = 0; i < tmp.length; i++) {
        link_data[i] = tmp[i];
    }
    disp_html();
}

function disp_html() {
    var all_data_of_book = new Array();
    for (var i = 0; i < title_data.length - 1; i++) {
        all_data_of_book.push([title_data[i], date_data[i], link_data[i]]);
        console.log(all_data_of_book[i]);
    }
    var tb = document.getElementById('view_info');
    tb.classList.add('clearfix');
    tb.setAttribute('id', 'view_info');
    var title_th = document.createElement('th');
    var date_th = document.createElement('th');
    title_th.textContent = '書籍名';
    date_th.innerHTML = '発売日';
    tb.appendChild(title_th);
    tb.appendChild(date_th);
    var title = document.getElementById('section_title');
    title.innerHTML = date.getFullYear() + '年' + (date.getMonth() + 1) + '月のコミック新刊一覧';
    for (var i = 0; i < all_data_of_book.length; i++) {
        var row = tb.insertRow(-1);
        var cell = row.insertCell(-1);
        var text = document.createTextNode(all_data_of_book[i][0]);
        var cell02 = row.insertCell(-1);
        var text_of_cell02 = document.createTextNode(all_data_of_book[i][1]);
        var link = document.createElement('a');
        link.setAttribute('href', all_data_of_book[i][2]);
        link.appendChild(text);
        cell.appendChild(link);
        cell02.appendChild(text_of_cell02);
        row.appendChild(cell);
        row.appendChild(cell02);
        outputElement.appendChild(tb);
    }
}

get_csv_data('data/Comic/output.csv',title_csv);
get_csv_data('data/Comic/output_date.csv',date_csv);
get_csv_data('data/Comic/output_link.csv',link_csv);