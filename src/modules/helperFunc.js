const getNthParent = (elem, n) => {
    return n === 0 ? elem : getNthParent(elem.parentNode, n - 1);
};

export { getNthParent };