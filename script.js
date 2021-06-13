const addBook = document.getElementById('addbook');
const controller = new AbortController();

addBook.addEventListener('click', () => {
    createForm();
}, { signal: controller.signal} );

function toggleForm(div) {
    if (div.style.display === "none") {
      div.style.display = "flex";
      return false;
    } else {
      div.style.display = "none";
      return true;
    }
  }




function createForm(){
    const container = document.querySelector('.container');

    if (document.querySelector('form')){ //if the form element exists, we only toggle it
        toggleForm(container);
        return;
    }
    const form = document.createElement('form');

    let title = createTextInput('title');

    let author = createTextInput('author');

    let pages = createTextInput('pages');

    let readToggle = createToggleSwitch();

    let submitBtn = document.createElement('button');
    submitBtn.setAttribute('type', 'button');
    submitBtn.setAttribute('id', 'submitbtn');
    submitBtn.textContent = 'Add Book';

    container.appendChild(form);

    //form.append(document.createElement("br"));

    form.appendChild(title[0]);
    form.appendChild(title[1]);
    
    form.appendChild(author[0]);
    form.appendChild(author[1]);

    form.appendChild(pages[0]);
    form.appendChild(pages[1]);

    form.appendChild(readToggle);
    form.appendChild(submitBtn);

    //read/notread toggle
    const toggle = document.querySelector('.toggle input');

    toggle.addEventListener('click', () => {
        const onOff = toggle.parentNode.querySelector('.onoff');
        onOff.textContent = toggle.checked ? 'Read' : 'Not read';
    });

    const submit = document.querySelector('#submitbtn');
    console.log(submit);

    submit.addEventListener('click', () => {toggleForm(container)});
}

function createToggleSwitch(){

    /*
    <label class="toggle">
      <span class="onoff">OFF</span>
      <input type="checkbox"/>
      <span class="slider round"></span>
    </label>
    */

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
    input.setAttribute('type', 'text');
    input.setAttribute('id', str);
    input.setAttribute('name', str);

    return [label, input];
}

// function createLineBreaks(num){
//     let arr = [];
//     for (let i=0; i<num; i++){
//         let linebreak = document.createElement('label');
//         arr.push(linebreak);
//     }
//     return arr;
// }

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

//console.log(createLineBreaks(4));

let myLib = [];

const books = [
    book1 = {
        title: 'x',
        author: 'D',
    },
    book2 = {
        title: 'hi',
        author: 'world',
    }
];

const Book = function(title, author, pages, read){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = function(){
        return `${title} by ${author}, ${pages} pages, ${read}`;
    }
};

//All of your book objects are going to be stored in a simple array
//so add a function to the script (not the constructor) 
//that can take user’s input and store the new book objects into an array. 

function addBookToLib(){
    let book = prompt("Please enter the book title, author, number of pages and if you have finished reading it", "Harry Potter");
}

function looper(arr){
    for (let i=0; i< arr.length; i++){
        for (keys in arr[i]){
            console.log(arr[i][keys]);
        }
    }
}




