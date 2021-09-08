import { Book } from './Book';

const form = document.querySelector('form');

const formDOM = (() => {

    function toggleForm() {
        const style = window.getComputedStyle(form).display;
        if (style === "none") {
            form.style.display = "flex";
            return style;
        }
        else {
            form.style.display = "none";
            return style;
        }
    }

    function makeNewBook() {
        const titleField = document.getElementById('title');
        const authorField = document.getElementById('author');
        const pagesField = document.getElementById('pages');
        const toggleText = document.querySelector('.onoff');
        return new Book(titleField.value, authorField.value, pagesField.value, toggleText.textContent);
    }

    function clearInput() {
        form.reset();
        const toggleText = document.querySelector('.onoff');
        toggleText.textContent = 'Not read';
        //the text changes based on a ternary operator in the toggle click event
        //so we need to manually reset it
    }
    return { clearInput, makeNewBook, toggleForm };
})();

export { formDOM };