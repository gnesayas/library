const myLibrary = [];

class Book {
  constructor(title, author, numPages, haveRead) {
    this.title = title;
    this.author = author;
    this.numPages = numPages;
    this.haveRead = haveRead;
  }

  info() {
    return `${title} by ${author}, ${numPages} pages, ${
      haveRead ? "read" : "not read yet"
    }`;
  }

  toggleRead() {
    this.haveRead = !this.haveRead;
  }
}

function addBookToLibrary(title, author, numPages, haveRead) {
  const book = new Book(title, author, numPages, haveRead);
  myLibrary.push(book);
}

function displayBooks() {
  const container = document.querySelector(".container");
  container.replaceChildren();
  for (let i = 0; i < myLibrary.length; i++) {
    const book = myLibrary[i];

    const card = document.createElement("div");
    card.classList.add("card");

    const titleParagraph = document.createElement("p");
    titleParagraph.classList.add("title");
    titleParagraph.textContent = book.title;
    card.appendChild(titleParagraph);

    const authorParagraph = document.createElement("p");
    authorParagraph.classList.add("author");
    authorParagraph.textContent = `by ${book.author}`;
    card.appendChild(authorParagraph);

    const cardFooter = document.createElement("div");
    cardFooter.classList.add("cardFooter");
    const pagesParagraph = document.createElement("p");
    pagesParagraph.textContent = `Pages: ${book.numPages}`;
    cardFooter.appendChild(pagesParagraph);
    const haveReadParagraph = document.createElement("p");
    haveReadParagraph.textContent = book.haveRead
      ? "Have read"
      : "Not read yet";
    cardFooter.appendChild(haveReadParagraph);
    card.appendChild(cardFooter);

    const cardFooterButtons = document.createElement("div");
    cardFooterButtons.classList.add("cardFooter");
    const removeButton = document.createElement("button");
    removeButton.dataset.key = i;
    removeButton.textContent = "Remove Book";
    removeButton.addEventListener("click", (e) => {
      myLibrary.splice(e.target.dataset.key, 1);
      displayBooks();
    });
    cardFooterButtons.appendChild(removeButton);
    const toggleReadButton = document.createElement("button");
    toggleReadButton.dataset.key = i;
    toggleReadButton.textContent = "Toggle Read";
    toggleReadButton.addEventListener("click", (e) => {
      const bookToToggle = myLibrary[e.target.dataset.key];
      bookToToggle.toggleRead();
      displayBooks();
    });
    cardFooterButtons.appendChild(toggleReadButton);
    card.appendChild(cardFooterButtons);

    container.appendChild(card);
  }
}

const addBtn = document.querySelector(".addBtn");
const cancelBtn = document.querySelector(".cancelBtn");
const confirmBtn = document.querySelector(".confirmBtn");

const addDialog = document.querySelector(".addDialog");

const titleInput = document.querySelector("#title");
const errortitle = document.querySelector("#errortitle");
const authorInput = document.querySelector("#author");
const errorauthor = document.querySelector("#errorauthor");
const pagesInput = document.querySelector("#pages");
const errorpages = document.querySelector("#errorpages");
const yesRadio = document.querySelector("#yes");
const noRadio = document.querySelector("#no");

titleInput.addEventListener("input", (event) => {
  if (titleInput.validity.valid) {
    errortitle.textContent = "";
    errortitle.className = "error";
  } else {
    showError(titleInput, errortitle);
  }
});

authorInput.addEventListener("input", (event) => {
  if (authorInput.validity.valid) {
    errorauthor.textContent = "";
    errorauthor.className = "error";
  } else {
    showError(authorInput, errorauthor);
  }
});

pagesInput.addEventListener("input", (event) => {
  if (pagesInput.validity.valid) {
    errorpages.textContent = "";
    errorpages.className = "error";
  } else {
    showError(pagesInput, errorpages);
  }
});

function showError(inputElement, errorElement) {
  if (inputElement.validity.valueMissing) {
    errorElement.textContent = "You need to enter a value here.";
  } else if (inputElement.validity.rangeUnderflow) {
    errorElement.textContent = "Pages number cannot be negative!";
  }
  errorElement.className = "error active";
}

let confirmed = false;

addBtn.addEventListener("click", () => {
  addDialog.showModal();
});

cancelBtn.addEventListener("click", () => {
  errortitle.textContent = "";
  errortitle.className = "error";
  confirmed = false;
  addDialog.close();
});

confirmBtn.addEventListener("click", (event) => {
  event.preventDefault();
  if (
    !titleInput.validity.valid ||
    !authorInput.validity.valid ||
    !pagesInput.validity.valid
  ) {
    alert("Please enter a valid input for all fields");
  } else {
    confirmed = true;
    addDialog.close();
  }
});

addDialog.addEventListener("close", () => {
  if (confirmed) {
    addBookToLibrary(
      titleInput.value,
      authorInput.value,
      pagesInput.value,
      yesRadio.checked ? true : false
    );
    displayBooks();
  }
  titleInput.value = "";
  authorInput.value = "";
  pagesInput.value = "";
  yesRadio.checked = false;
  noRadio.checked = false;
});
