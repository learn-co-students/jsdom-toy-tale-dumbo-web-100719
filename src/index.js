let addToy = false
let toyCollectionDiv = document.getElementById("toy-collection")
  const addBtn = document.querySelector('#new-toy-btn')
  const toyForm = document.querySelector('.container')
  addBtn.addEventListener('click', () => {
    // hide & seek with the form
    addToy = !addToy
    if (addToy) {
      toyForm.style.display = 'block'
      toyForm.addEventListener('submit', (evt) => { 
        evt.preventDefault()
        postToy(evt.target)
      })
    } else {
      toyForm.style.display = 'none'
    }
  })
// GRABBING ALL OF THE TOYS
function fetchToys(){
  return fetch(`http://localhost:3000/toys`)
  .then(r => r.json())
}
fetchToys().then((toyArr) => {
  toyArr.forEach(renderToys)
})
  // SHOW ALL OF THE TOYS
let renderToys = (toy) => {
  let toydiv = document.createElement("div")
   toydiv.className = "card"
   toydiv.innerHTML = `
   <h2>${toy.name}</h2>
   <img src= ${toy.image} class="toy-avatar" />
   <p>${toy.likes} </p>
   <button id=${toy.id} class="like-btn-${toy.id}">Like</button>`
   toyCollectionDiv.append(toydiv)
  let likeBtn = toydiv.querySelector(`.like-btn-${toy.id}`)
  // let likeBtn2 = toydiv.querySelector(`#${toy.id}`)
   likeBtn.addEventListener("click", (evt) => {
     likeToy(toy, toydiv)
   }
   )
  }
  //FUNCTION FOR LIKING A TOY
  function likeToy(toy, toydiv){
  console.log(toy.name)
  fetch(`http://localhost:3000/toys/${toy.id}`, { 
  method: "PATCH", 
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    likes: ++ toy.likes
  })
})
.then(r =>r.json())
.then(toyLikeCount => {
  let toydivthing = toydiv.querySelector('p')
    toydivthing.innerText++
})
}
  // POSTING A NEW TOY
  function postToy(evt){
    let toyName = evt.name.value
    let toyImage = evt.image.value
  fetch(`http://localhost:3000/toys` , {
    method: "POST",
    headers: {  
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }, 
     body: JSON.stringify({
       name: toyName,
       image: toyImage,
       likes: 0
      })
}) 
.then(r => r.json())
.then(newToy => renderToys(newToy))
}


