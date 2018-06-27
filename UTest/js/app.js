'use strict';
(function() {

let BooksList = [];
let ItemId = 1;
let CurrentEditBookId = "";

function LoadData() {
  ItemId = JSON.parse(localStorage.getItem("ItemId")) === null ? 1 : JSON.parse(localStorage.getItem("ItemId"));
  BooksList = JSON.parse(localStorage.getItem("BookList")) === null ? [] : JSON.parse(localStorage.getItem("BookList"));
  CurrentEditBookId = localStorage.getItem("CurrentEditBookId") === null ? "" : localStorage.getItem("CurrentEditBookId");
  document.getElementById('author').value = localStorage.getItem("AuthorInput");
  document.getElementById('year').value = localStorage.getItem("YearInput");
  document.getElementById('title').value = localStorage.getItem("TitleInput");
  document.getElementById('pages').value = localStorage.getItem("PagesInput");
  
  RenderList();
  RenderApplyButton();
}

function RenderList() {
  let booksList = document.getElementById('books-list');
  while (booksList.firstChild) {
    booksList.removeChild(booksList.firstChild);
  }

  for (let item of BooksList) {
    let templateDiv = document.getElementById("template-item");
    let itemDiv = document.createElement('div');
    itemDiv.setAttribute('class', 'list-item');
    itemDiv.setAttribute('id', item.id);
    itemDiv.innerHTML = templateDiv.textContent;
    itemDiv.getElementsByTagName('p')[0].innerHTML = "Author: " + item.author;
    itemDiv.getElementsByTagName('p')[1].innerHTML = "Title: " + item.title;
    itemDiv.getElementsByTagName('button')[0].addEventListener("click", editBook);
    itemDiv.getElementsByTagName('button')[1].addEventListener("click", removeBook);
    booksList.appendChild(itemDiv);
  }
}

function RenderApplyButton() {
  document.getElementById('apply-btn').innerHTML = CurrentEditBookId === "" ? "Add" : "Save";
}

function updateList() {
  if (CurrentEditBookId === "") {
    let Book = {};
    Book.id = "item" + ItemId.toString();
    Book.author = document.getElementById('author').value;;
    Book.year = document.getElementById('year').value;
    Book.title = document.getElementById('title').value;;
    Book.pages = document.getElementById('pages').value;
    BooksList.push(Book);
    ItemId++;
  }
  else {
    let Book = BooksList.find(function(element) {
      return element.id === CurrentEditBookId;
    });
    Book.author =  document.getElementById('author').value;
    Book.year = document.getElementById('year').value;
    Book.title =  document.getElementById('title').value;
    Book.pages = document.getElementById('pages').value;
    BooksList = BooksList.map(function(element) {
      if (element.id === Book.id) {
        element.author = Book.author;
        element.year = Book.year;
        element.title = Book.title;
        element.pages = Book.pages;
      }
      return element;
    });
    CurrentEditBookId = "";
  }
  RenderList();
  RenderApplyButton();
}

function removeBook(event) {
  let id = event.target.parentNode.id;
  BooksList = BooksList.filter(function(element) {
    return element.id !== id;
  });
  RenderList();
}

function editBook(event) {
  let id = event.target.parentNode.id;
  let bookForEdit = BooksList.find(function(element) {
    return element.id === id;
  });
  document.getElementById('author').value = bookForEdit.author;
  document.getElementById('year').value = bookForEdit.year;
  document.getElementById('title').value = bookForEdit.title;
  document.getElementById('pages').value = bookForEdit.pages;
  CurrentEditBookId = id;
  RenderApplyButton();
}

document.getElementById("apply-btn").addEventListener("click", updateList);

document.addEventListener("DOMContentLoaded", LoadData);
window.onunload = function() {
  localStorage.setItem("BookList", JSON.stringify(BooksList));
  localStorage.setItem("ItemId", JSON.stringify(ItemId));
  localStorage.setItem("CurrentEditBookId", CurrentEditBookId);
  localStorage.setItem("AuthorInput", document.getElementById("author").value);
  localStorage.setItem("YearInput", document.getElementById("year").value);
  localStorage.setItem("TitleInput", document.getElementById("title").value);
  localStorage.setItem("PagesInput", document.getElementById("pages").value);
};

})();