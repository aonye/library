const form = document.querySelector('form');
const addBook = document.getElementById('addbook');
const table = document.querySelector('tbody');
const toggle = document.querySelector('.toggle input');

function Book(title, author, pages, read){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
};

Book.prototype.info = function(){
    return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read}`;
};
//add a new book or reload the page -> update myLib;

let gotBook1 = new Book('A Game of Thrones', 'George R.R. Martin', '694', 'Not read');
let gotBook2 = new Book('A Clash of Kings', 'George R.R. Martin', '768', 'Not read');

let myLib = [gotBook1, gotBook2];

//localStorage.clear();
console.log(localStorage);

initializeTable();

addBook.addEventListener('click', () => {
    displayForm();
});

function retrieveLibArr(){
    let library = JSON.parse(localStorage.getItem('libArray'));
    if (!library) {
    library = myLib;
    }
    return library;
}

function initializeTable(){
    let library = retrieveLibArr();
    appendTable(library);
}

function makeDelButton(){
    let td = document.createElement('td');
    let button = document.createElement('button');
    button.setAttribute('type', 'button');
    button.setAttribute('id', 'delbtn');
    button.textContent = 'Delete';

    td.append(button); //wrap button in <tabledata> to embed
    return td;
}

function makeReadButton(val, index){
    let button = document.createElement('button');
    button.setAttribute('type', 'button');
    button.setAttribute('id', 'readbtn');
    button.textContent = val;

    button.addEventListener('click', () => {
        readBtnEventHand(button, index);
    });
    return button;
}

function readBtnEventHand(button, index){
    button.textContent = button.textContent === 'Read' ? 'Not read' : 'Read'
    changeLibVal(button.textContent, index);
}

function retrieveLibArr(){
    let library = JSON.parse(localStorage.getItem('libArray'));
    if (!library) {
    library = myLib;
    }
    return library;
}

function delFromLibArr(string){
    let library = retrieveLibArr();
    let index = library.findIndex((book) => book["title"] === string);
    library.splice(index,1);
    localStorage.setItem('libArray', JSON.stringify(library));
}

function changeLibVal(string, index){
    let library = retrieveLibArr();
    library[index]["read"] = string;
    //console.log(library[index]);
    localStorage.setItem('libArray', JSON.stringify(library));
}

function delFromTable(node){
    node.remove();
}

function appendTable(libArr) {
    let library = libArr;
    for (let i = 0; i < library.length; i++){
        let row = document.createElement('tr');
        //row.setAttribute('class', 'tablerow');
            for (let key in library[i]){
                if (library[i].hasOwnProperty(key)){
                let data = document.createElement('td');
                let btn;
                if (key==='read'){
                    btn = makeReadButton(library[i][key], i);
                    data.append(btn);
                }
                else {
                    data.textContent = library[i][key];
                }
                row.append(data);
                }
            }
        let btn = makeDelButton();
        row.append(btn);
        table.append(row);
    }
    addDeleteEvent();
}

function addDeleteEvent(){
    document.querySelectorAll('#delbtn').forEach((node) => {
        node.addEventListener('click', (event) => {
        let del = event.target;
        let tableRow = getNthParent(del, 2);
        let title = tableRow.firstChild.textContent;
        delFromLibArr(title);
        delFromTable(tableRow);
        });
    });
}

function appendLibArr(obj){
    let library = JSON.parse(localStorage.getItem('libArray'));
    if (!library) {
    library = myLib;
    }
    library.push(obj);
    localStorage.setItem('libArray', JSON.stringify(library));
}

function displayForm(){
    toggleForm();

    //read/ notread toggle
    toggle.addEventListener('click', () => {
        readToggleEventHand();
    });

    //submit hides the form and prevents refresh
    form.addEventListener('submit', (event) => {
        submitHandler(event);
    });
}

function readToggleEventHand(){
    let onOff = toggle.parentNode.querySelector('.onoff');
    onOff.textContent = toggle.checked ? 'Read' : 'Not read';
}

function toggleForm(){
    let style = window.getComputedStyle(form).display;
    if (style === "none") {
        form.style.display = "flex";
        return style;
    } 
    else {
      form.style.display = "none";
      return style;
    }
}

function clearInput(){
    form.reset();
    const toggleText = document.querySelector('.onoff');
    toggleText.textContent = 'Not read';
    //the text changes based on a ternary operator in the toggle click event
    //so we need to manually reset it
}

function getNthParent(elem, n) {
    return n === 0 ? elem : getNthParent(elem.parentNode, n - 1);
}

function submitHandler(event){
    event.preventDefault();
    let obj = createFormObj();
    appendTable([obj]);
    appendLibArr(obj);
    clearInput();
    toggleForm();
}

function createFormObj(){
    const titleField = document.getElementById('title');
    const authorField = document.getElementById('author');
    const pagesField = document.getElementById('pages');
    const toggleText = document.querySelector('.onoff');

    return tempObj = new Book(titleField.value, authorField.value, pagesField.value, toggleText.textContent);
}

// function createToggleSwitch(){
//     const label = document.createElement('label');
//     label.classList.add('toggle');

//     const spanText = document.createElement('span');
//     spanText.classList.add('onoff');
//     spanText.textContent = "Not read";

//     const input = document.createElement('input');
//     input.setAttribute('type', 'checkbox');

//     const spanSlider = document.createElement('span');
//     spanSlider.classList.add('slider');
//     spanSlider.classList.add('round');
    
//     label.appendChild(spanText);
//     label.append(input);
//     label.appendChild(spanSlider);
//     return label;
// }

// function createTextInput(str){
//     let tempStr = str.toLowerCase();
//     let tempArr = tempStr.split('');
//     tempArr[0] = tempArr[0].toUpperCase();
//     let capitalized = tempArr.join('');

//     const label = document.createElement('label');
//     label.setAttribute('for', str);
//     label.textContent = capitalized;

//     const input = document.createElement('input');
//     if (capitalized==='Pages'){
//         input.setAttribute('type', 'number');
//         input.setAttribute('max', 9999);
//         input.setAttribute('min', 1);
//     }
//     else {
//         input.setAttribute('type', 'text');
//     }
//     input.setAttribute('id', str);
//     input.setAttribute('name', str);
//     //input.setAttribute('required', ""); //set up validation before readding

//     return [label, input];
// }

// function changeSwitchTextContent(div){
//     console.log(div.textContent);
//     if (div.textContent==='Not read'){
//         div.textContent='Read';
//         return;
//     }
//     else {
//         div.textContent='Not read';
//         return;
//     }
// }


// function saveResponses(title, author, pages, read){
//     sessionStorage.setItem('title', title.value);
// 	sessionStorage.setItem('author', author.value);
//    	sessionStorage.setItem('pages', pages.value);
//     sessionStorage.setItem('read', read);
// }

// function pushToLibrary(lib){
//     let newLib = myLib;
//     let book = {
//         "title": sessionStorage.getItem("title"),
//         "author": sessionStorage.getItem("author"),
//         "pages": sessionStorage.getItem("pages"),
//         "read": sessionStorage.getItem("read"),
//     }
//     newLib.push(book);
//     return newLib;
// }

//old displayForm code

   // if (document.querySelector('form')){ 
    //     //if form exists, toggle form when reclicking '+'
    //     toggleForm(container);
    //     return;
    // }
    // const form = document.createElement('form');

    // let title = createTextInput('title');
    // let author = createTextInput('author');
    // let pages = createTextInput('pages');
    // let readToggle = createToggleSwitch();
    // let submitBtn = document.createElement('button');
    // submitBtn.setAttribute('type', 'button');
    // submitBtn.setAttribute('id', 'submitbtn');
    // submitBtn.textContent = 'Add Book';

    // container.appendChild(form);
    // form.appendChild(title[0]);
    // form.appendChild(title[1]);
    // form.appendChild(author[0]);
    // form.appendChild(author[1]);
    // form.appendChild(pages[0]);
    // form.appendChild(pages[1]);
    // form.appendChild(readToggle);
    // form.appendChild(submitBtn);