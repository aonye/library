let myLib = books;

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




