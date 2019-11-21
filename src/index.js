let addToy = false
let allToysUrl = `http://localhost:3000/toys`
let toyDiv = document.querySelector("#toy-collection")
const toyForm = document.querySelector('.container')

document.addEventListener("DOMContentLoaded", ()=>{
  const addBtn = document.querySelector('#new-toy-btn')
  
  addBtn.addEventListener('click', () => {
    // hide & seek with the form
    addToy = !addToy
    if (addToy) {
      toyForm.style.display = 'block'
    } else {
      toyForm.style.display = 'none'
    }

  })


})

toyForm.addEventListener("submit", (evt) => {
  evt.preventDefault()
  let newToyName = evt.target.name.value
  let newToyImg = evt.target.image.value
  fetch(allToysUrl, {
    method:'POST',
   headers: { 
       'Content-type': 'application/json',
       'accept': 'application/json'
   },
   body: JSON.stringify({
  name: newToyName,
  image: newToyImg,
  likes: 0
    })
  })
  .then(resp => resp.json())
  .then(makeToyDivAndAddToy)
  evt.target.reset()
})


let fetchToys = () => {
fetch(allToysUrl)
.then(resp => resp.json())
.then(buildList)
}

let buildList = (objToys) => {
  objToys.forEach(makeToyDivAndAddToy)
}

let makeToyDivAndAddToy = (toy) => {
  console.log(toy)
  let newToyDiv = document.createElement("div")
  newToyDiv.className = "card"
  let newH2 = document.createElement("h2")
  newH2.innerText = toy.name 
  let toyImg = document.createElement("img")
  toyImg.src = toy.image
  toyImg.className = "toy-avatar"
  let toyP = document.createElement("p")
  toyP.innerText = toy.likes
  let likeButton = document.createElement("button")
  likeButton.innerText = "like"
  likeButton.addEventListener("click", (evt) => {
    let indToyUrl = `http://localhost:3000/toys/${toy.id}`
    fetch(indToyUrl, {
      method:'PATCH',
     headers: { 
         'Content-type': 'application/json',
         'accept': 'application/json'
     },
     body: JSON.stringify({
    likes: toy.likes++ 
      })
    })
    .then(resp => resp.json())
    .then(json_resp => {
      toyP.innerText = toy.likes

    })
  })
  newToyDiv.append(newH2, toyImg, toyP,likeButton)
  toyDiv.append(newToyDiv)
};

fetchToys()
