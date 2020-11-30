let myLibrary;
let formNew = document.querySelector('.form-new');
const ul = document.querySelector('ul');

document.addEventListener('click', e => {
  let targetElement = e.target
  let select = targetElement.className;
  switch (select) {
    case 'read':
      toggleRead(targetElement);
      break;
    case 'submit':
      e.preventDefault();
      addBookToLibrary();
      addListItem();
      formNew.reset();
      toggleDisplay(formNew);
      populateStorage();
      break;
    case 'new-book':
      toggleDisplay(formNew);
      break;
    case 'remove':
      removeBook(targetElement);
      populateStorage();
      break;
  }
})

function Book(title, author, pages, read) {
  this.title = title
  this.author = author
  this.pages = pages
  this.read = read
}

function addBookToLibrary() {
  let readStatus = document.querySelector('input[name="read"]:checked').value;
  book = new Book(formNew.elements[0].value, formNew.elements[1].value, formNew.elements[2].value, readStatus);
  myLibrary.push(book);
}

function displayBooks() {
  myLibrary.forEach((book) => {
    ul.appendChild(createListItem(book));
  })
  setDisplay();
}

function addListItem() {
  book = myLibrary[myLibrary.length - 1];
  ul.appendChild(createListItem(book));
  setDisplay();
}

function createListItem(book) {
  listItem = document.createElement('li');
  listItem.setAttribute('class', myLibrary.indexOf(book));
  listItem.appendChild(createBookText(book));
  listItem.appendChild(createRemoveButton());
  listItem.appendChild(createReadButton(book));
  return listItem;
}

function createBookText(book) {
  bookInfo = document.createElement('p');
  bookInfo.textContent = `${book.title} by ${book.author}, has ${book.pages} pages, and I have ${book.read} this book`;
  return bookInfo;
}

function createRemoveButton() {
  remove = document.createElement('button');
  remove.setAttribute('class', 'remove');
  remove.textContent = 'Remove book'
  return remove;
}

function createReadButton(book) {
  readButton = document.createElement('button');
  readButton.setAttribute('class', 'read');
  changeReadText(readButton, book.read == 'read')
  return readButton;
}

function toggleRead(button) {
  changeReadText(button, button.textContent == 'Mark as read');
}

function changeReadText(button, condition) {
  button.textContent = (condition) ? 'Mark as unread' : 'Mark as read';
}

function removeBook(button) {
  let removableItem = button.parentElement;
  let arrayIndex = removableItem.className;
  myLibrary.splice(arrayIndex, 1);
  removableItem.remove();
  if (myLibrary.length == 0) {
    toggleDisplay(ul);
  }
}

function setDisplay() {
  if (myLibrary.length > 0 && ul.classList.contains('no-display')) {
    ul.classList.remove('no-display')
  }
}

function toggleDisplay(element) {
  element.classList.toggle('no-display');
}

function populateStorage() {
  localStorage.setItem('library', JSON.stringify(myLibrary));
}

function getStorage() {
  return JSON.parse(localStorage.getItem('library'));
}

function refresh() {
  if (!localStorage.getItem('library')) {
    myLibrary = []
  } else {
    myLibrary = getStorage();
    displayBooks();
  }
}

refresh();