import { Book } from './Book';
import { db, doc, getDoc, setDoc } from '../scripts';

const libraryArray = (() => {
    const gotBook0 = new Book('A Game of Thrones', 'George R.R. Martin', '694', 'Not read');
    const gotBook1 = new Book('A Clash of Kings', 'George R.R. Martin', '768', 'Not read');
    gotBook0.id = 'book0';
    gotBook1.id = 'book1';
    const bookData = {
        bookArr: JSON.stringify([gotBook0, gotBook1]),
    };
    const counter = 2;

    async function initLib() {
        const libraryStatus = doc(db, 'personalLib', 'info');
        await setDoc(libraryStatus, { count: counter }, { merge: true });
        await setDoc(doc(db, 'library', 'books'), bookData);
    };

    async function getArr() {
        let library = [];
        const personalLibRef = doc(db, 'personalLib', 'info');
        const PLSnap = await getDoc(personalLibRef);
        if (!(PLSnap.exists())) {
            await initLib();
            const docSnap = await getDoc(doc(db, 'library', 'books'));
            const data = await JSON.parse(docSnap.data().bookArr);
            library = [...data];
            console.log('in if statement');
        }
        else {
            const docSnap = await getDoc(doc(db, 'library', 'books'));
            const data = await JSON.parse(docSnap.data().bookArr);
            library = [...data];
            console.log('in else statement');
        }
        return library;
    }

    async function appendArr(obj) {
        const library = await getArr();
        let newLib = [...library];
        const newObj = { ...obj };
        const personalLibSnap = await getDoc(doc(db, 'personalLib', 'info'));
        let newCount = personalLibSnap.data().count;
        newObj.id = `book${newCount}`; //set id for deletion
        newCount++;
        newLib = [...newLib, newObj];
        await setDoc(doc(db, 'library', 'books'), { bookArr: JSON.stringify(newLib) });
        await setDoc(doc(db, 'personalLib', 'info'), { count: newCount })
        return;
        //localStorage.setItem('libArray', JSON.stringify(library));
    }

    async function delFromArr(id) {
        const library = await getArr();
        const newLib = library.filter((item) => item.id !== id);
        await setDoc(doc(db, 'library', 'books'), { bookArr: JSON.stringify(newLib) });
        return;
        // localStorage.setItem('libArray', JSON.stringify(library));
    }

    async function changeVal(newStatus, id) {
        const library = await getArr();
        const newLib = [...library];
        console.log(newLib);
        const index = newLib.findIndex((item) => item.id === id);
        newLib[index]['read'] = newStatus;
        await setDoc(doc(db, 'library', 'books'), { bookArr: JSON.stringify(newLib) });
        return;
        //localStorage.setItem('libArray', JSON.stringify(library));

    }
    return { getArr, delFromArr, appendArr, changeVal };
})();

export { libraryArray };