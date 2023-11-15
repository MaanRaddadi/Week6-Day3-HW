// Globals
const cardContainer = document.querySelector(".card-container");
const key = "RmKwgZ2rRNF6XBe3jDf6S216QCt4D7q3";
const userTag = document.querySelector(".user-tag");

// endpoints for getting the top selling books from "Education" list in the api
const endPoint =
  "https://api.nytimes.com/svc/books/v3/lists/current/Education.json?api-key=";

// mock api endpoint
const mockEndpoint = "https://65523afb5c69a7790329bc41.mockapi.io/books";

// check if the current user is an admin or not
let isAdmin = false;
function checkLocalStorage() {
  if (localStorage.getItem("admin") !== null) {
    isAdmin = true;
    return localStorage.getItem("admin");
  } else if (localStorage.getItem("user") !== null) {
    isAdmin = false;
    return localStorage.getItem("user");
  }
}
const currentUser = checkLocalStorage();

currentUser === undefined
  ? (userTag.innerText = "")
  : (userTag.innerText = `Welcome ${JSON.parse(
      currentUser
    ).name.toUpperCase()}`);
//fetching the all the books from nytimes api

// const getBooksNy = async () => {
//   try {
//     const response = await fetch(`${endPoint}${key}`);
//     const data = await response.json();
//     const books = data.results.books;
//     books.forEach((Element) => {
//       postToMock(Element);
//     });
//   } catch (error) {
//     console.log(error);
//   }
// };
// getBooksNy();

// // // posting the books to mock api
// const postToMock = (books) => {
//   fetch(mockEndpoint, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(books),
//   })
//     .then((response) => response.json())
//     .then((data) => {
//       console.log("Success:", data);
//     })
//     .catch((error) => {
//       console.error("Error:", error);
//     });
// };

// fetching the rank 1 current selling book to place it in header
const getRankOne = async () => {
  try {
    const response = await fetch(`${mockEndpoint}`);
    const data = await response.json();
    const books = data;
    updateRankOne(data);
  } catch (error) {
    console.log(error);
  }
};
getRankOne();
//placing the rank 1 book in the header
function updateRankOne(data) {
  for (let i in data) {
    if (data[i].rank === 1) {
      document.getElementById("best-seller-cover").src = data[i].book_image;
      document.getElementById(
        "author-name"
      ).innerHTML = `By: ${data[i].author}`;
      document.getElementById("book-description").innerHTML =
        data[i].description;
      document.getElementById(
        "rank"
      ).innerHTML = `Current Rank # ${data[i].rank}`;
      document.getElementById("best-seller-name").innerHTML = data[i].title;
    }
  }
}

//fetch the rest of the books
const getBooks = async () => {
  try {
    const response = await fetch(`${mockEndpoint}`);
    const data = await response.json();
    data.sort((a, b) => a.rank - b.rank);
    displayBooks(data);
  } catch (error) {
    console.log(error);
  }
};

// Updating the card container with the data from Mockapi
function displayBooks(books) {
  books.forEach((book) => {
    const card = document.createElement("div");
    card.innerHTML = ` <div class="card " style="width: 18rem">
    <img src="${book.book_image}" class="card-img-top bookCard-img" alt="..." />
    <div class="card-body p-3 d-flex flex-column justify-content-evenly">
      <h3 class="card-title book-rank">#${book.rank}</h3>
      <h3 class="card-title book-name">${book.title}</h3>
      <small class="book-author"><strong>Author: </strong>${book.author}</small>
      <p class="card-text book-description">
        ${book.description}
      </p>
      <p class="book-isbn"><strong>ISBN: </strong>${book.primary_isbn10}</p>
      <p class="book-publisher"><strong>Publisher: </strong>${book.publisher}</p>
      
    </div>
  </div>`;
    const deleteBtn = document.createElement("button");
    deleteBtn.className =
      "btn btn-danger delete-btn mb-3  mx-3 w-50 delete-btn";
    deleteBtn.innerText = "Delete";
    // Only place the delete button if the user is an admin
    if (isAdmin) {
      card.children[0].insertAdjacentElement("beforeend", deleteBtn);
    }
    deleteBtn.addEventListener("click", (e) => {
      deleteBook(book.id);
    });

    cardContainer.insertAdjacentElement("beforeend", card);
  });
}
getBooks();

// function for deleting the book
function deleteBook(id) {
  fetch(`${mockEndpoint}/${id}`, {
    method: "DELETE",
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Success:", data);
      location.reload();
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}
