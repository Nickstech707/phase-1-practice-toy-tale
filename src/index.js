// let addToy = false;

// document.addEventListener("DOMContentLoaded", () => {
//   const addBtn = document.querySelector("#new-toy-btn");
//   const toyFormContainer = document.querySelector(".container");
//   addBtn.addEventListener("click", () => {
//     // hide & seek with the form
//     addToy = !addToy;
//     if (addToy) {
//       toyFormContainer.style.display = "block";
//     } else {
//       toyFormContainer.style.display = "none";
//     }
//   });
// });
// Get the "Add Toy" button and the toy form container

const addBtn = document.querySelector("#new-toy-btn");
const toyForm = document.querySelector(".container");

// Initialize a flag to track whether a toy is being added
let addToy = false;

// Get the toy collection container
let divCollect = document.querySelector("#toy-collection");

// Fetch a list of toys from the server
function getToys() {
  return fetch("http://localhost:3000/toys").then((res) => res.json());
}

// Add a new toy to the server
function postToy(toy_data) {
  fetch("http://localhost:3000/toys", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      name: toy_data.name.value,
      image: toy_data.image.value,
      likes: 0,
    }),
  })
    .then((res) => res.json())
    .then((obj_toy) => {
      // Render the new toy and append it to the collection
      let new_toy = renderToys(obj_toy);
      divCollect.append(new_toy);
      // Show alert for successful toy creation
      alert("Toy created successfully");
    });
}

// Handle the "like" button click
function likes(e) {
  e.preventDefault();
  let more = parseInt(e.target.previousElementSibling.innerText) + 1;

  // Update the toy's likes on the server
  fetch(`http://localhost:3000/toys/${e.target.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      likes: more,
    }),
  })
    .then((res) => res.json())
    .then((like_obj) => {
      // Update the displayed likes count
      e.target.previousElementSibling.innerText = `${more} likes`;
    });
}

// Render a toy and create its HTML elements
function renderToys(toy) {
  let h2 = document.createElement("h2");
  h2.innerText = toy.name;

  let img = document.createElement("img");
  img.setAttribute("src", toy.image);
  img.setAttribute("class", "toy-avatar");

  let p = document.createElement("p");
  p.innerText = `${toy.likes} likes`;

  let btn = document.createElement("button");
  btn.setAttribute("class", "like-btn");
  btn.setAttribute("id", toy.id);
  btn.innerText = "like";
  btn.addEventListener("click", (e) => {
    // Handle the "like" button click
    likes(e);
  });

  let divCard = document.createElement("div");
  divCard.setAttribute("class", "card");
  divCard.append(h2, img, p, btn);
  divCollect.append(divCard);
}
// add listener to 'Add Toy' button to show or hide form
addBtn.addEventListener("click", () => {
  // hide & seek with the form
  addToy = !addToy;
  if (addToy) {
    toyForm.style.display = "block";
    toyForm.addEventListener("submit", (event) => {
      event.preventDefault();
      postToy(event.target);
    });
  } else {
    toyForm.style.display = "none";
  }
});

// start by getting all toys

getToys().then((toys) => {
  toys.forEach((toy) => {
    //function to render toys goes here or something
    renderToys(toy);
  });
});
