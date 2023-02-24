const myLibrary = [];

// Constructor
function Book(title, author, pages, bookRead) {
    this.Title = title;
    this.Author = author;
    this.Pages = pages;
    this.bookRead = bookRead;
}

function addBookToLibrary(book) {
    myLibrary.push(book);
}
function getBookIndex(bookName) {
    let index = -1;
    for (let i = 0; i < myLibrary.length; i += 1) {
        if (myLibrary[i].Title === bookName) {
            index = i;
        }
    }
    return index;
}

function changeStatus(bookName) {
    const index = getBookIndex(bookName);
    if (index > -1) {
        const status = myLibrary[index].bookRead;
        if (status === 'already read') {
            myLibrary[index].bookRead = 'not yet read';
        } else {
            myLibrary[index].bookRead = 'already read';
        }
    }
}
function getAmountOfBooks() {
    return myLibrary.length;
}

function removeFromLibrary(bookName) {
    const index = getBookIndex(bookName);
    if (index > -1) {
        myLibrary.splice(index, 1);
    } else {
        console.log('Not found');
    }
}

const firstBook = new Book('The Hunger Games', 'Someone', 200, 'already read');
addBookToLibrary(firstBook);

function createCard(book) {
    const newCard = document.createElement('div');
    newCard.classList.add('card');
    newCard.setAttribute('data-name', book.Title);
    const bookProperties = Object.values(book);
    const bookKeys = Object.keys(book);
    for (let i = 0; i < bookProperties.length; i += 1) {
        const text = document.createElement('div');
        text.innerHTML += `${bookKeys[i]}: ${bookProperties[i]}`;
        newCard.appendChild(text);
    }
    const buttonContainer = document.createElement('div');
    buttonContainer.classList.add('buttonContainer');
    const button1 = document.createElement('Button');
    button1.textContent = 'Remove';
    button1.classList.add('removeButton');
    const button2 = document.createElement('Button');
    button2.textContent = 'Change Read Status';
    button2.classList.add('changeStatus');
    buttonContainer.appendChild(button1);
    buttonContainer.appendChild(button2);
    newCard.appendChild(buttonContainer);
    return newCard;
}

function displayLibrary() {
    const numBooks = document.getElementById('currentItems');
    numBooks.innerHTML = (getAmountOfBooks());
    const bookshelf = document.getElementById('container');
    bookshelf.innerHTML = '';
    for (let i = 0; i < myLibrary.length; i += 1) {
        bookshelf.appendChild(createCard(myLibrary[i]));
    }
}
displayLibrary();

document.getElementById('container').addEventListener('click', (event) => {
    const bookName = `${event.target.parentNode.parentNode.getAttribute('data-name')}`;
    if (event.target.className === 'removeButton') {
        removeFromLibrary(bookName);
    } else if (event.target.className === 'changeStatus') {
        changeStatus(bookName);
    }
    displayLibrary();
});

const form = document.getElementById('newBook');
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const bookName = document.getElementById('bookName').value;
    const author = document.getElementById('bookAuthor').value;
    const numberpages = document.getElementById('numberOfPages').value;

    const readValues = document.getElementsByName('read');
    let readValue;
    for (let i = 0; i < readValues.length; i += 1) {
        if (readValues[i].checked) {
            readValue = readValues[i].value;
        }
    }

    console.log(readValues[0].value);
    const newBook = new Book(bookName, author, numberpages, readValue);
    console.log(newBook);
    myLibrary.push(newBook);
    displayLibrary();
});

// Validate form - all inputs must be filled
// Get all input fields from the form
const inputs = form.querySelectorAll('input');
form.addEventListener('submit', (e) => {
    e.preventDefault() // Prevents the default submission behaviour

    let formValid = true;

    // Loop through all inputs and check if each input is filled
    inputs.forEach((input) => {
        // If an element is not valid
        if (!input.reportValidity()) {
            formValid = false;
        }

        if (formValid) {
            console.log('Form Success!');
            form.reset();
        }
    })
})
