let addToy = false
  
const addBtn = document.querySelector('#new-toy-btn')
const toyUrl = "http://localhost:3000/toys"
let toyCollectionDiv = document.getElementById("toy-collection")
let newToyForm = document.querySelector(".add-toy-form")
  
  addBtn.addEventListener('click', () => {
    // hide & seek with the form
    addToy = !addToy
    if (addToy) {
      toyForm.style.display = 'block'
    } else {
      toyForm.style.display = 'none'
    }
  })

  fetch(toyUrl)
  .then(resp => resp.json())
  .then(toyArray => {
    toyArray.forEach((toy) => {
      makeImageIntoCard(toy)
    })
  }
    
  )

  function makeImageIntoCard(toy){
    let toyCard = document.createElement("div")
    let toyH2 = document.createElement("h2")
    let toyImage = document.createElement("img")
    let toyP = document.createElement("p")
    let toyButton = document.createElement("button")

    toyCard.className = "card"
    toyH2.innerText = `${toy.name}`
    toyImage.src = toy.image
    toyImage.className = "toy-avatar"
    toyP.innerText = `${toy.likes} Likes`
    toyButton.className = "like-btn"
    toyButton.innerText = "Like <3"

    toyCard.append(toyH2, toyImage, toyP, toyButton)
    toyCollectionDiv.append(toyCard)

    toyButton.addEventListener("click", () => {
      fetch(`http://localhost:3000/toys/${toy.id}`, {
        method:'PATCH',
        headers: { 
          'Content-type': 'application/json',
          'accept': 'application/json'
        },
        body: JSON.stringify({
          likes: ++ toy.likes
        })
      })
      .then(resp => resp.json())
      .then(updatedObj => {
        toy.likes = updatedObj.likes
        toyP.innerText = `${toy.likes} Likes`
        console.log(toyP)
      })
    
  })
  }

  newToyForm.addEventListener("submit", (evt) => {
    evt.preventDefault()
    let newToyName = evt.target.name.value
    let newToyUrl = evt.target.image.value
 
    fetch(toyUrl, {
      method:'POST',
      headers: { 
         'Content-type': 'application/json',
         'accept': 'application/json'
      },
      body: JSON.stringify({
        name: newToyName,
        image: newToyUrl,
        likes: 0
      })
    })
    .then(resp => resp.json())
    .then((newToy) => {
      makeImageIntoCard(newToy)
      evt.target.reset()
    })
    
  })

 
  
  



