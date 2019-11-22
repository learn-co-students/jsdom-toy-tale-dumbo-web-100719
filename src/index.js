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

  fetch("http://localhost:3000/toys")
  .then(r => r.json())
  .then((toysArray) => {
    toysArray.forEach((oneToy) => {
      turn(oneToy)
    })
  })
})


function turn(toyObj){
  let toysDiv = document.getElementById('toy-collection')



let toyDiv = document.createElement("div")
toyDiv.className = "card"


// toyLi.className = "card"

toyDiv.innerHTML = `<h2>${toyObj.name}</h2>
<img src=${toyObj.image} class="toy-avatar" />
<p>${toyObj.likes} Likes </p>
<button class="like-btn">Like <3</button>`


toysDiv.append(toyDiv)

}


