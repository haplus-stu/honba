const outputElement:HTMLInputElement = <HTMLInputElement>document.getElementById('output_csv');
let title_data:Array<string> = new Array();
let date_data:Array<string>= new Array();
let link_data:Array<string>= new Array();
const date = new Date();

function get_title_csv_data(data_path:string) {
    const request = new XMLHttpRequest();
    request.addEventListener('load', () => {
        create_book_title_array(request.responseText);
    });
    request.open('GET', data_path, true);
    request.send();
}

function get_dete_csv_data(date_path:string) {
    const request = new XMLHttpRequest();
    request.addEventListener('load', () => {
        create_book_date_array(request.responseText);
    });
    request.open('GET', date_path, true);
    request.send();
}

function get_link_csv_data(date_path:string) {
    const request = new XMLHttpRequest();
    request.addEventListener('load', () => {
        create_book_link_array(request.responseText);
    });
    request.open('GET', date_path, true);
    request.send();
}

//タイトル配列作成関数
function create_book_title_array(csv_title_data:string) {
    let tmp = csv_title_data.split('\n');
    for (let i = 0; i < tmp.length; i++) {
        title_data[i] = tmp[i];
    }
}

//発売日配列作成関数
function create_book_date_array(csv_date_data:string) {
    let tmp = csv_date_data.split('\n');
    for (let i = 0; i < tmp.length; i++) {
        date_data[i] = tmp[i];
    }
}
//リンク配列作成関数
function create_book_link_array(csv_link_data:string) {
    let tmp = csv_link_data.split('\n');
    for (let i = 0; i < tmp.length; i++) {
        link_data[i] = tmp[i];
    }
    disp_html();
}


function disp_html() {

    let all_data_of_book = new Array();
    for (let i = 0; i < title_data.length-1; i++) {
        all_data_of_book.push([title_data[i], date_data[i],link_data[i]]);
		console.log(all_data_of_book[i]);
    }

    let tb = document.createElement('table');
    tb.classList.add('clearfix');
    tb.setAttribute('id', 'view_info');

    let title_th = document.createElement('th');
    let date_th = document.createElement('th');

    title_th.textContent = '書籍名';
    date_th.innerHTML = '発売日';
    tb.appendChild(title_th);
    tb.appendChild(date_th);

    let title:HTMLInputElement = <HTMLInputElement> document.getElementById('section_title');
    title.innerHTML = date.getFullYear() + '年' + (date.getMonth() + 1) + '月の新刊一覧';

    for (let i = 0; i < all_data_of_book.length; i++) {
        let row = tb.insertRow(-1);
        let cell = row.insertCell(-1);
        let text = document.createTextNode(all_data_of_book[i][0]);
        let cell02 = row.insertCell(-1);
        let text_of_cell02 = document.createTextNode(all_data_of_book[i][1]);
        let link = document.createElement('a');
        link.setAttribute('href',all_data_of_book[i][2]);
        
        link.appendChild(text);

        cell.appendChild(link);
        cell02.appendChild(text_of_cell02);
        row.appendChild(cell);
        row.appendChild(cell02);
        outputElement.appendChild(tb);
    }
}





get_title_csv_data('data/output.csv');
get_dete_csv_data('data/output_date.csv');
get_link_csv_data('data/output_link.csv');
