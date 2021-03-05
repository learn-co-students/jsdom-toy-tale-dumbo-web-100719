let addToy = false

document.addEventListener("DOMContentLoaded", ()=>{
  const addBtn = document.querySelector('#new-toy-btn')
  const toyForm = document.querySelector('.container')
  const toyCollectionDiv = document.querySelector('#toy-collection')
  
  fetchToys = () => {
    fetch('http://localhost:3000/toys')
    .then(r => r.json())
    .then(resp => {
      resp.forEach(toy => {
        const card = document.createElement('div')
        const h2 = document.createElement('h2')
        h2.innerText = toy['name']
        const img = document.createElement('img')
        img.src= toy['image']
        img.className = 'toy-avatar'
        let likes = document.createElement('p')
        likes.innerText = toy['likes']
        const btn = document.createElement('button')
        btn.innerText = "Like"
        btn.className = 'like-btn'
        card.appendChild(h2)
        card.appendChild(img)
        card.appendChild(likes)
        card.appendChild(btn)
        toyCollectionDiv.appendChild(card)
        btn.addEventListener('click', (e) => {
          e.preventDefault()
          let addLikes = parseInt(e.target.previousSibling.innerText) + 1
          fetch(`http://localhost:3000/toys/${e.target.id}`,{
              method: "PATCH",
              body: JSON.stringify({
                'likes': addLikes
              }),
              headers: {
                'content-type': 'application/json',
                'accept': 'application/json'
              }
          }).then(r => r.json()).then(resp => {
              e.target.previousSibling.innerText = addLikes
          }).catch
        })
      })
    })
  }  
  fetchToys()

  toyForm.addEventListener('submit', (e) => {
    e.preventDefault()
    fetch('http://localhost:3000/toys',{
      method: "POST",
      headers: {
        'content-type': 'application/json',
        'accept': 'application/json'
      },
      body: JSON.stringify({
        'name': e.target.name.value,
        'image': e.target.image.value,
        'likes': 0 
      })
    })
    .then(r => r.json())
    .then(resp => console.log(resp))
    .catch(e => alert(e.message))
  })




  addBtn.addEventListener('click', () => {
    addToy = !addToy
    if (addToy) {
      toyForm.style.display = 'block'
    } else {
      toyForm.style.display = 'none'
    }
  })
})
