import { editTable } from "./modules/editTable";
import { libraryArray } from "./modules/libraryArray";
import { formDOM } from './modules/form';

const form = document.querySelector('form');
const addBook = document.getElementById('addbook');
const toggle = document.querySelector('.toggle input');

const main = (() => {
    //localStorage.clear();
    //console.log(localStorage);

    const formHandler = () => {
        formDOM.toggleForm();
    };

    const readToggleHandler = () => {
        let onOff = toggle.parentNode.querySelector('.onoff');
        onOff.textContent = toggle.checked ? 'Read' : 'Not read';
    }

    const submitHandler = (event) => {
        event.preventDefault();
        editTable.appendTable([formDOM.makeNewBook()]);
        libraryArray.appendArr(formDOM.makeNewBook());
        formDOM.clearInput();
        formDOM.toggleForm();
    };

    addBook.addEventListener('click', formHandler); //leave on, do not disable.
    toggle.addEventListener('click', readToggleHandler); //read/ notread toggle
    form.addEventListener('submit', submitHandler);  //submit hides the form and prevents refresh

    async function init() {
        const library = await libraryArray.getArr();
        editTable.initTable(library);
    }

    init();

})();

export default main;









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