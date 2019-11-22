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

  fetchToys()
  createNewToy()

})

let fetchToys= () => {
  const toysURL = 'http://localhost:3000/toys'
 fetch(toysURL)
 .then(res => res.json())
 .then(buildList)

}

let buildList = (allToys) => {
  allToys.forEach(addDivToy)
}

 let addDivToy = (toyObject) => {
  //  console.log(toyObject)
   let toyCollectionDiv = document.querySelector('#toy-collection')
   let toyDiv = document.createElement('div')
   toyDiv.className = 'card'
   let toyH2 = document.createElement('h2')
   toyH2.innerText = toyObject.name
   let toyImg = document.createElement('img')
    toyImg.src = toyObject.image
    toyImg.className = 'toy-avatar'
   let toyP = document.createElement('p')
   toyP.innerText = toyObject.likes
   let toyButtonLikes = document.createElement('button')
   toyButtonLikes.className = 'like-btn'
   toyButtonLikes.innerText = 'Like'
   
   toyButtonLikes.addEventListener("click", () => {
    toyObject.likes++ 
    likeToy(toyObject,toyP)
   })
   toyDiv.append(toyH2,toyImg,toyP,toyButtonLikes)
   toyCollectionDiv.append(toyDiv)

 }

 let likeToy = (toyObject, toyP) => {
  let indToyUrl = `http://localhost:3000/toys/${toyObject.id}`
  toyObject.likes++
  fetch(indToyUrl, {
    method:'PATCH',
   headers: { 
       'Content-type': 'application/json',
       'accept': 'application/json'
   },
   body: JSON.stringify({
   likes: toyObject.likes
    })
  })
  .then(resp => resp.json())
  .then(json_resp => {
    toyP.innerText = toyObject.likes

  })
 }

 let createNewToy = () => {
  const newToyForm = document.querySelector('.container')
  newToyForm.addEventListener('submit',(event) => {
    event.preventDefault()

    const toysURL = 'http://localhost:3000/toys'
    let toyName = event.target.name.value
    let toyImage = event.target.image.value
    
    fetch(toysURL, {
      method:'POST',
     headers: { 
         'Content-type': 'application/json',
         'accept': 'application/json'
     },
     body: JSON.stringify({
      name: toyName,
      image: toyImage,
      likes: 0
      })
    })
    .then(resp => resp.json())
    .then(addDivToy)
    event.target.reset()
  })
 }


  






