let addToy = false

document.addEventListener("DOMContentLoaded", ()=>{
  const addBtn = document.querySelector('#new-toy-btn')
  const toyForm = document.querySelector('.container')
  addBtn.addEventListener('click', () => {
    // hide & seek with the form
    addToy = !addToy
    if (addToy) {
      toyForm.style.display = 'block'
        toyForm.addEventListener("submit", event => {
        event.preventDefault()
        postToy(event.target)
        event.target.reset
    })
    }
    else {
      toyForm.style.display = 'none'
    }

})

function fetchToys(){
  return fetch("http://localhost:3000/toys")
    .then(r => r.json())
}
fetchToys()
  .then(toyArray =>{
      toyArray.forEach(showAllTheToys);    
    }) 

function postToy(createdToy){  
  let newName = event.target.name.value
  let newImage = event.target.image.value
  fetch("http://localhost:3000/toys", {
    method: "POST",
    headers: {
      "content-type" : "application/json",
      "accept": "application/json"
    },
    body: JSON.stringify({
    "name": newName,
    "image": newImage,
    "likes": 0
      })
  })
  .then(r => r.json())
  .then((newCreatedToy)=> {
    showAllTheToys(newCreatedToy)
      })
  }
  let collection = document.getElementById('toy-collection')

  
  function showAllTheToys(toyObj){  
    // console.log(toyObj)
    let newToy = document.createElement("div")
    newToy.className = "card"
    let h2 = document.createElement("h2")
    h2.innerText = toyObj.name
    let img = document.createElement("img")
    img.src = toyObj.image
    img.className = "toy-avatar"
    let p = document.createElement("p")
    p.innerText =`${toyObj.likes} likes`
    let btn = document.createElement("button")
    btn.className = "like-btn"
    btn.innerText = "Like <3"
    newToy.append(h2, img, p, btn)
    collection.append(newToy)
    btn.addEventListener("click", (evt) => {
      console.log(toyObj.name.trim() === "Gene Grady");


      fetch(`http://localhost:3000/toys/${toyObj.id}`, {
        method:'PATCH',
       headers: { 
           'Content-type': 'application/json',
           'accept': 'application/json'
       },
       body: JSON.stringify({
      likes: `${ toyObj.name.trim() === "Gene Grady" ? --toyObj.likes : ++toyObj.likes}`
        })
      })
      .then(resp => resp.json())
      .then(toy => {
        p.innerText = `${toy.likes} likes`
      })
    }) 
  }
})


