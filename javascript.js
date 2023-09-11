const myLibrary = [];

function Book(title, author, num_pages, have_read) {
    this.title = title;
    this.author = author;
    this.num_pages = num_pages;
    this.have_read = have_read;
    this.info = function () {
        return `${title} by ${author}, ${num_pages} pages, ${have_read ? 'read' : 'not read yet'}`;
    };
}

function addBookToLibrary(book) {
    myLibrary.push(book);
}

for (const book of myLibrary) {

}

const book1 = new Book("Dummy Book 1", "Dum Dum1", 100, false);
const book2 = new Book("Dummy Book 2", "Dum Dum2", 200, true);
const book3 = new Book("Dummy Book 3", "Dum Dum3", 300, false);

addBookToLibrary(book1);
addBookToLibrary(book2);
addBookToLibrary(book3);

const addBtn = document.querySelector(".addBtn");
const addDialog = document.querySelector(".addDialog");

addBtn.addEventListener("click", () => {
    addDialog.showModal();
});