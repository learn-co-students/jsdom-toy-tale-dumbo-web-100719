let addToy = false
let toysDiv = document.getElementById('toy-collection')


document.addEventListener("DOMContentLoaded", ()=>{
  const addBtn = document.querySelector('#new-toy-btn')
  const toyForm = document.querySelector('.container')

  fetch("http://localhost:3000/toys")
  .then(r => r.json())
  .then((toysArray) => {
    toysArray.forEach((oneToy) => {
      turn(oneToy)
    })
  })

  addBtn.addEventListener('click', () => {
    // hide & seek with the form
    addToy = !addToy
    if (addToy) {
      toyForm.style.display = 'block'
    } else {
      toyForm.style.display = 'none'
    }
  })

  let newForm = document.querySelector(".add-toy-form" )
  
  newForm.addEventListener("submit", (evt) => {
    evt.preventDefault()
    
    let newName = evt.target.name.value
    let newImage = evt.target.image.value
    // let newLikes = evt.target.likes.value

    fetch("http://localhost:3000/toys", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: newName,
        image: newImage,
        likes: 0
      })
    })
    .then(r => r.json())
    .then((newlyCreatedToy) => {
      turn(newlyCreatedToy);
      evt.target.reset()
      
    })
})



function turn(toyObj){

  let toyDiv = document.createElement("div")

  toyDiv.className = "card"

  // toyLi.className = "card"

  toyDiv.innerHTML = `<h2>${toyObj.name}</h2>
  <img src=${toyObj.image} class="toy-avatar" />
  <p name="likes-p-tag" class="p-tag">${toyObj.likes} Likes </p>
  <button class="like-btn">Like <3</button>`

  toysDiv.append(toyDiv)

  let likeButton = toyDiv.querySelector(".like-btn")
  let pTag = toyDiv.querySelector('.p-tag')

  likeButton.id = toyObj.id
  let updatedLikes = toyObj.likes + 1
  likeButton.addEventListener("click", (evt) => {
    fetch(`http://localhost:3000/toys/${evt.target.id}`,{
      method: "PATCH",
      headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
      },
      body: JSON.stringify({
        likes: toyObj.likes += 1
      })
    })
    .then(r => r.json())
    .then(updatedToy => {
      // toyObj.likes = updatedLikes
      
      
      // updatedToy.likes++
      //renderToy(updatedToy)

      pTag.innerText = `${updatedToy.likes} likes`



    })

})

}

})
