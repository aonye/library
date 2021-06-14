const table = document.querySelector('tbody');
const addBook = document.getElementById('addbook');

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

let gotBook1 = new Book('A Game of Thrones', 'George R.R. Martin', '694', 'Not Read');
let gotBook2 = new Book('A Clash of Kings', 'George R.R. Martin', '768', 'Not Read');

let myLib = [gotBook1, gotBook2];

addBook.addEventListener('click', () => {
    createForm();
});


// delButton.addEventListener('click', (event) => {
//     console.log(event.target);
// });

// for (var key in gotBook1){
//     if(gotBook1.hasOwnProperty(key))
//     console.log(key, gotBook1[key]);
// }

//localStorage.clear();
console.log(localStorage);

initializeTable();

document.querySelectorAll('#delbtn').forEach((node) => {
    node.addEventListener('click', (event) => {
    let del = event.target;
    let tableRow = getNthParent(del, 2);
    let title = tableRow.firstChild.textContent;
    delFromLibArr(title);
    delFromTable(tableRow);
  });
});




function initializeTable(){
    let library = JSON.parse(localStorage.getItem('libArray'));
    if (!library) {
    library = myLib;
    }
    // console.log(library);
    // console.log(library.length);
    appendTable(library);
}

function makeDelButton(){
    let td = document.createElement('td');
    let button = document.createElement('button');
    button.setAttribute('type', 'button');
    button.setAttribute('id', 'delbtn');
    button.textContent = 'Delete';

    td.append(button); //wrap button in table data to embed
    return td;
}

function delFromLibArr(title){
    let library = JSON.parse(localStorage.getItem('libArray'));
    if (!library) {
    library = myLib;
    }
    let index = library.findIndex((book) => book["title"] === title);
    library.splice(index,1);
    //console.log(library);
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
                data.textContent = library[i][key];
                row.append(data);
                }
            }
        let btn = makeDelButton();
        row.append(btn);
        table.append(row);
    }
}

function appendLibArr(obj){
    let library = JSON.parse(localStorage.getItem('libArray'));
    if (!library) {
    library = myLib;
    }
    library.push(obj);
    console.log(library);
    localStorage.setItem('libArray', JSON.stringify(library));
}

function createForm(){
    const container = document.querySelector('.container');

    if (document.querySelector('form')){ 
        //if form exists, toggle form when reclicking '+'
        toggleForm(container);
        return;
    }
    const form = document.createElement('form');

    let title = createTextInput('title');
    let author = createTextInput('author');
    let pages = createTextInput('pages');
    let readToggle = createToggleSwitch();
    let submitBtn = document.createElement('button');
    submitBtn.setAttribute('type', 'submit');
    submitBtn.setAttribute('id', 'submitbtn');
    submitBtn.textContent = 'Add Book';

    container.appendChild(form);
    form.appendChild(title[0]);
    form.appendChild(title[1]);
    form.appendChild(author[0]);
    form.appendChild(author[1]);
    form.appendChild(pages[0]);
    form.appendChild(pages[1]);
    form.appendChild(readToggle);
    form.appendChild(submitBtn);

    let titleField = document.getElementById('title');
    let authorField = document.getElementById('author');
    let pagesField = document.getElementById('pages');

    //read/notread toggle
    const toggle = document.querySelector('.toggle input');
    let onOff = toggle.parentNode.querySelector('.onoff');

    toggle.addEventListener('click', () => {
        onOff.textContent = toggle.checked ? 'Read' : 'Not Read';
    });

    //submit button hides the form
    const submit = document.querySelector('#submitbtn');

    submit.addEventListener('click', () => {
        let tempObj = new Book(titleField.value, authorField.value, pagesField.value, onOff.textContent);
        appendTable([tempObj]);
        appendLibArr(tempObj);
        clearInput(toggle, onOff);
        toggleForm(container);
    });
}

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


function toggleForm(div){
    if (div.style.display === "none") {
      div.style.display = "flex";
      return false;
    } else {
      div.style.display = "none";
      return true;
    }
}

function clearInput(checkbox, toggleText){
    document.querySelector('form').reset();
    toggleText.textContent = checkbox.checked ? 'Read' : 'Not Read';
    //the text is based on a ternary operator in the toggle click event
    //so we need to manually reset it
    return;
}

function createToggleSwitch(){
    const label = document.createElement('label');
    label.classList.add('toggle');

    const spanText = document.createElement('span');
    spanText.classList.add('onoff');
    spanText.textContent = "Not read";

    const input = document.createElement('input');
    input.setAttribute('type', 'checkbox');

    const spanSlider = document.createElement('span');
    spanSlider.classList.add('slider');
    spanSlider.classList.add('round');
    
    label.appendChild(spanText);
    label.append(input);
    label.appendChild(spanSlider);
    return label;
}

function createTextInput(str){
    let tempStr = str.toLowerCase();
    let tempArr = tempStr.split('');
    tempArr[0] = tempArr[0].toUpperCase();
    let capitalized = tempArr.join('');

    const label = document.createElement('label');
    label.setAttribute('for', str);
    label.textContent = capitalized;

    const input = document.createElement('input');
    if (capitalized==='Pages'){
        input.setAttribute('type', 'number');
        input.setAttribute('max', 9999);
        input.setAttribute('min', 1);
    }
    else {
        input.setAttribute('type', 'text');
    }
    input.setAttribute('id', str);
    input.setAttribute('name', str);
    //input.setAttribute('required', ""); //set up validation before readding

    return [label, input];
}

function changeSwitchTextContent(div){
    console.log(div.textContent);
    if (div.textContent==='Not read'){
        div.textContent='Read';
        return;
    }
    else {
        div.textContent='Not read';
        return;
    }
}

function getNthParent(elem, n) {
    return n === 0 ? elem : getNthParent(elem.parentNode, n - 1);
}

//All of your book objects are going to be stored in a simple array
//so add a function to the script (not the constructor) 
//that can take user’s input and store the new book objects into an array. 





