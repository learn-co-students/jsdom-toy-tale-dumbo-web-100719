
// CALL RENDER TOYS FUNCTION IN GET FETCH ON TOY ARRAY
fetch(`http://localhost:3000/toys`)
.then(resp => resp.json())
.then((toyArray) => {
  toyArray.forEach(renderToys) })

// DEFINE ELEMENTS GLOBALLY
  let addToy = false
  const toyCollectionDiv = document.querySelector("#toy-collection")
  const newToyButton = document.querySelector("#new-toy-btn")
  const toyForm = document.querySelector(".container")
  
//FUNCTION TO RENDER TOYS - CREATE HTML - 
// ADD EVENT LISTENER FOR "CLICK" - PUT ON BUTTON
// CALLBACK FUNCTION FOR PATCH
// PASS IN OBJECT AND DIV
  function renderToys(toy) {
  
  let toyDiv = document.createElement("div")
  toyDiv.className = "card"

  toyDiv.innerHTML = `
   <h2>${toy.name}</h2>
   <img src= ${toy.image} class="toy-avatar" />
   <p>${toy.likes} </p>
   <button class="like-btn">Like</button>`

    const likeButton = toyDiv.querySelector(".like-btn")
    likeButton.addEventListener("click", (evt) => {
    likeToy(toy, toyDiv)
   })

  toyCollectionDiv.append(toyDiv)
  }

// FUNCTION TO LIKE A TOY
// FETCH AND UPDATE DOM & BACKEND
// FIND LI AND UPDATE NAME -- RESET VALUE TO UPDATE DOM
function likeToy(toy, toyDiv) {

    fetch(`http://localhost:3000/toys/${toy.id}`, {
      method:'PATCH',
     headers: { 
         'Content-type': 'application/json',
         'accept': 'application/json'
     },
     body: JSON.stringify({
    likes: ++toy.likes
      })
    })
    .then(resp => resp.json())
    .then(toyLikeCount => {
      let toydivthing = toyDiv.querySelector('p')
      toydivthing.innerText++
    })
  }

  // FUNCTION TO POST A TOY
  // FIRST ADD AN EVENT LISTENER ON CLICK TO RENDER THE FORM
  // THEN ADD EVENT LISTENER FOR SUBMIT
  // IN SUBMIT CALLBACK CALL POST TOY METHOD

  newToyButton.addEventListener('click', () => {
    // // // hide & seek with the form
    // addToy = !addToy
    // if (addToy) {
      toyForm.style.display = 'block'
  toyForm.addEventListener('submit', (evt) => { 
        evt.preventDefault()
        postToy(evt)
      })
    // } else {
    //   toyForm.style.display = 'none'
    })

    //POST A NEW TOY
    // ASSIGN VARIABLES FOR THE NEW VALUES
    // CALL RENDERTOYS AND PASS IN NEW TOY
  
    function postToy(evt) {
        newToyName = evt.target.name.value
        newImage =  evt.target.image.value

      fetch(`http://localhost:3000/toys`, {
        method:'POST',
       headers: { 
           'Content-type': 'application/json',
           'accept': 'application/json'
       },
       body: JSON.stringify({
       name: newToyName ,
       image: newImage,
       likes: 0
        })
      })
      .then(resp => resp.json())
      .then(newtoy => {renderToys(newtoy)})
    }