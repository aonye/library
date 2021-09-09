import { getNthParent } from "./helperFunc";
import { libraryArray } from "./libraryArray";

const table = document.querySelector('tbody');

const editTable = (() => {

    function initTable(arr) {
        appendTable(arr);
    }

    function makeReadButton(val, id) {
        let button = document.createElement('button');
        button.setAttribute('type', 'button');
        button.setAttribute('class', 'readbtn');
        button.textContent = val;
        button.addEventListener('click', () => { readBtnEventHand(button, id) });
        return button;
    }

    function makeDelButton() {
        let td = document.createElement('td');
        let button = document.createElement('button');
        button.setAttribute('type', 'button');
        button.setAttribute('class', 'delbtn');
        button.textContent = 'Delete';
        td.append(button); //wrap button in <tabledata> to embed
        button.addEventListener('click', delHandler);
        return td;
    }

    function readBtnEventHand(button, index) {
        button.textContent = button.textContent === 'Read' ? 'Not read' : 'Read'
        libraryArray.changeVal(button.textContent, index);
    }

    function delFromTable(node) {
        node.remove();
    }

    function appendTable(libArr) {
        const library = [...libArr];
        library.map((item) => {
            const row = document.createElement('tr');
            row.setAttribute('id', item.id);
            row.append(
                wrapInTDElem(item.title),
                wrapInTDElem(item.author),
                wrapInTDElem(item.pages),
                wrapInTDElem(makeReadButton(item.read, item.id)),
                makeDelButton()
            );
            table.append(row);
        });

        function wrapInTDElem(data) {
            const TD = document.createElement('td');
            TD.append(data);
            return TD;
        }
    }

    const delHandler = (event) => {
        let del = event.target;
        let tableRow = getNthParent(del, 2);
        libraryArray.delFromArr(tableRow.id);
        delFromTable(tableRow);
    };
    return { initTable, appendTable };
})();

export { editTable };


        // for (let i = 0; i < library.length; i++) {
        //     for (let key in library[i]) {
        //         if (library[i].hasOwnProperty(key)) {
        //             let btn;
        //             if (key === 'read') {
        //                 btn = makeReadButton(library[i][key], i);
        //                 data.append(btn);
        //             }
        //             else {
        //                 data.textContent = library[i][key];
        //             }
        //             row.append(data);
        //         }
        //     }
        //     let btn = makeDelButton();
        //     row.append(btn);
        //     table.append(row);
        //     addDeleteEvent();
        // }