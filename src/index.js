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

  allToys = document.querySelector("#toy-collection");
  


  fetch('http://localhost:3000/toys') //eslint-disable-line
    .then(response => response.json())
    .then(toysArr => 
    {
         for(var element of toysArr)
         {
            divElement(element);   
          }  
    })
  
   
    
   let divCreateElement  = document.querySelector(".add-toy-form")
   
   ////Submit a new toy 
   divCreateElement.addEventListener('submit',(event)=>{
       event.preventDefault();
       let nameInputTarget = event.target.name.value;
       let imageInputTarget = event.target.image.value;
       
        fetch('http://localhost:3000/toys', { //eslint-disable-line 
     method: 'POST',
     headers: {
       'content-type': 'application/json',
       'Accept': 'application/json'
     },
     body: JSON.stringify({
       "name": `${nameInputTarget}`,
       "image": `${imageInputTarget}`,
       "likes": 0
     })
   })
     .then(response => response.json())
     .then(element => {

        divElement(element);
        event.target.reset();
     })

       console.log(nameInputTarget);
       console.log(imageInputTarget);
   })
    
    

});






//create a new div Toy by adding more information in htm
function divElement(element){
    let newDiv = document.createElement("div")
            newDiv.className = "card";
      
            let newH2Name = document.createElement("h2") 
            newH2Name.innerText = element.name 


            let newPic = document.createElement("img")
            newPic.className = 'toy-avatar'
            newPic.src = element.image

            let newPar = document.createElement("p")
            newPar.innerText = `${element.likes} Likes`

           let newButton = document.createElement('button')
            newButton.className = 'like-btn'
            newButton.innerText = 'Like ❤️'
            allToys.append(newDiv); 
            newDiv.append(newH2Name);
            newDiv.append(newPic);
            newDiv.append(newPar);
            newDiv.append(newButton);
        
        newButton.addEventListener('click', () => {
            fetch(`http://localhost:3000/toys/${element.id}`,{
              method: "PATCH",
              headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
              },
               body: JSON.stringify({
                 likes: ++element.likes 
               }) 
            })
            .then(r => r.json())
            .then((updatedObj)=>{
               //element.likes = updatedObj.likes
               newPar.innerText = `${updatedObj.likes} Likes`
            })
        })
  }