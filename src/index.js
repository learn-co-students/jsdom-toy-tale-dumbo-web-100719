document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyForm = document.querySelector(".container");

  // helper function for fetching data
  fetchToyData();

  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyForm.style.display = "block";
    } else {
      toyForm.style.display = "none";
    }
  });

  const toyFormSubmit = document.querySelector('.add-toy-form')
  toyFormSubmit.addEventListener('submit', (e) => {
    e.preventDefault()
    postToyFetch(e)
    e.target.reset()
  })
});

let addToy = false;



// Get request for Toys
const fetchToyData = () => {
  fetch("http://localhost:3000/toys")
    .then(res => res.json())
    .then(data => {
      // helper function for get request
      getAllToys(data);
    });
};

const getAllToys = json => {
  json.forEach(toy => {
    renderToyCards(toy)
  });
};

const renderToyCards = (toy) =>{
  const toyDiv = document.querySelector("#toy-collection");
  const newDiv = document.createElement('div')
  newDiv.className = 'card'

  const toyHeader = document.createElement("h2");
  const toyPic = document.createElement("img");
  toyPic.className = 'toy-avatar'
  const toyPara = document.createElement("p");
  const toyButton = document.createElement('button')
  toyButton.id= toy.id 
  toyButton.className = 'like-btn'
  toyHeader.textContent = toy.name;
  toyPic.src = toy.image;
  toyPara.innerHTML = toy.likes;
  toyButton.textContent = `Like ❤`
  newDiv.append(toyHeader, toyPic, toyPara, toyButton)
  toyDiv.append(newDiv)
  likeIncrementBtnValue(toyButton)
}


// Post requests to submit form
const postToyFetch = (e) =>{
  const bodyInfo = {
    'method': 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({
      'name': `${e.target.name.value}`,
      'image': `${e.target.image.value}`,
      'likes': 0
    })
  }
  return fetch('http://localhost:3000/toys', bodyInfo)
  .then(res => res.json())
  .then(data => renderNewCard(data))
}


const renderNewCard = json =>{
  const toyDiv = document.querySelector("#toy-collection");
  const newDiv = document.createElement('div')
  newDiv.className = 'card'

  const toyHeader = document.createElement("h2");
  const toyPic = document.createElement("img");
  toyPic.className = 'toy-avatar'
  const toyPara = document.createElement("p");
  const toyButton = document.createElement('button')
  toyButton.className = 'like-btn'

  toyHeader.textContent = json.name;
  toyPic.src = json.image;
  toyPara.innerHTML = json.likes;
  toyButton.textContent = `Like ❤`
  newDiv.append(toyHeader, toyPic, toyPara, toyButton)
  toyDiv.append(newDiv)
}


// Increase Toy Likes











const likeIncrementBtnValue = button => {
  button.addEventListener('click', (e)=>{
    e.preventDefault()
    let likeIncrement = parseInt(e.target.previousElementSibling.innerText) + 1

    fetch(`http://localhost:3000/toys/${e.target.id}`, {
      'method': 'PATCH',
      'headers':
      {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      'body': JSON.stringify({
        "likes": likeIncrement
      })
    })
      .then(res => res.json())
      .then((like_obj => {
        e.target.previousElementSibling.innerText = `${likeIncrement} likes`;
      }))
  })

  
  
  
}







