let addToy = false

document.addEventListener("DOMContentLoaded", ()=>{
  const addBtn = document.querySelector('#new-toy-btn')
  const toyForm = document.querySelector('.container')
  addBtn.addEventListener('click', () => {
    // hide & seek with the form
    addToy = !addToy
    if (addToy) {
      toyForm.style.display = 'block'
    } else {
      toyForm.style.display = 'none'
    }
  })
  

  let newToyForm = document.querySelector(".add-toy-form")
  newToyForm.addEventListener("submit", (evt) => {
    evt.preventDefault()
    let toyName = evt.target.name.value
    let toyImage = evt.target.image.value
    
    fetch(('http://localhost:3000/toys'), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json' 
      },
      body: JSON.stringify({
        "name": toyName,
        "image": toyImage,
        "likes": 0
      })
    })
    .then(r => r.json())
    .then((newToy) => {
      addToyCard(newToy)
    })
    evt.target.reset()
  })
  
  fetch('http://localhost:3000/toys')
  .then(r => r.json())
  .then((toys)=> {
    toys.forEach((toy) => {
      addToyCard(toy)
    })
  })
  
})

function addToyCard(toy){
  let toyBox = document.querySelector("#toy-collection")
  let toyDiv = document.createElement("div")
  toyDiv.className = "card"

  toyDiv.innerHTML = `<h2>${toy.name}</h2>
  <img src=${toy.image} class="toy-avatar" />
  <p>${toy.likes} Likes </p>
  <button class="like-btn">Like <3</button>`
  toyBox.append(toyDiv)

  let likeButton = toyDiv.querySelector(".like-btn")
  likeButton.addEventListener("click", (evt) => {
    fetch(`http://localhost:3000/toys/${toy.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": 'application/json',
        "Accept": 'application/json'
      },
      body: JSON.stringify({
        likes: ++toy.likes
      })
    })
    .then(r => r.json())
    .then((updatedToy) => {
      updatedToy.likes = toy.likes
      let toyP = toyDiv.querySelector("p")
      toyP.innerText = `${toy.likes} Likes`
    })
  })


}
