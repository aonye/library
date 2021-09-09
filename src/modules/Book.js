class Book {
    constructor(title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }
    info() {
        return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read}`;
        //add a new book or reload the page -> update myLib;
    }
}

const bookConverter = {
    toFirestore: (book) => {
        return {
            title: book.title,
            author: book.author,
            pages: book.pages,
            read: book.read,
        };
    },
    fromFirestore: (snapshot, options) => {
        const data = snapshot.data(options);
        return new Book(data.title, data.author, data.pages, data.read);
    }
};

// Book.prototype.info = function () {
//     ;
// };

// function Book(title, author, pages, read){
//     this.title = title;
//     this.author = author;
//     this.pages = pages;
//     this.read = read;
// };

export { Book, bookConverter };