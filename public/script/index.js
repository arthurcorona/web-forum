const form = {
  titleThread: () => document.getElementById('title-thread'),
  textThread: () => document.getElementById('text-thread'),
  submitThreadButton: () => document.getElementById('submit-thread'),

}

document.addEventListener("DOMContentLoaded", ()=>{
      db.collection("posts").get().then(snp=>{
        snp.forEach(post=>{
          createPost(post.data())

        })
      })
})

function createPost(post){
    document.querySelector(".threads-container").innerHTML += `<li class="thread-container" id="${post.id}">
                                                                  <h2 class="title-post">${post.title}</h2>
                                                                  <div class="text-post">${post.description}</div>
                                                                  <div class="stamp-thread">
                                                                      <b class="author">${post.author}</b>
                                                                      <b class="timestamp">${post.time}</b> 
                                                                  </div>
                                                              </li>`
}


function showMenuAccount() {
    let buttons = document.getElementById("options_account")
    
    if (buttons.style.display === "block") {
      buttons.style.display = "none";
    } else {
      buttons.style.display = "block";
    }
}
 
function signOut() {
    firebase.auth().signOut().then(() => {
        window.location.href = "/login"
    }).catch(() => {
        alert('erro ao fazer logout')
    })
}

function goToAccount() {
  window.location.href = "/account"
}

function openPopUp() {
  appendUsername().then(username=>{
    document.body.innerHTML += `<div id="popup-container">
        <div class="thread-PopUp">
            
                <span class="close-popUp" onclick="closePopUp()">
                <i class="uil uil-multiply"></i>
            </span>

            <p class="title-popUp">Criar Publicação</p>    

            <section>
                <div class="img-user-popUp">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/7/72/Default-welcomer.png">
                </div>
                <p class="username-popup">${username}</p>
            </section>

            <form class="thread-form">
                <input oninput="onChangeThreadSubmit()" type="text" id="title-thread" class="thread-title" placeholder="Titulo" >
                <label>Digite seu texto:</label>
                <textarea oninput="onChangeThreadSubmit()" id="text-thread" class="thread-text"></textarea> 
            </form>
            <button onclick="submitThread('${username}')" disabled="true" id="submit-thread" class="submit-thread" type="submit">Enviar</button>
        </div>
      </div>`
  }).catch(err=>{
    console.log(err)
  })

  loading() 
  
}

function openLoading() {
  document.querySelector('.loading-container').style.display = 'inline'
}

function closeLoading() {
  document.querySelector('.loading-container').style.display = 'none'
}

function loading() {
  openLoading()  
setTimeout( () => {
  closeLoading()
}, 600)
}

function closePopUp() {
  document.getElementById("popup-container").remove()

loading()

}

appendUsername()
function appendUsername() {
  // verificando se o user está on
  return new Promise((res, rej)=>{
    auth.onAuthStateChanged(userOn => {
      if(userOn){
        let userInDB = db.collection("users").doc(userOn.uid)
        userInDB.get().then((doc) => { 
          let userName = doc.data().user.username
            res(userName)
        })
      }else{""
        rej("Deu tudo errado")
      }
    })
  })
  

}
function onChangeThreadSubmit() {
  toggleSubmitThreadButtonDisable()
}

function toggleSubmitThreadButtonDisable() {
  form.submitThreadButton().disabled = !validateSubmit()
}

function validateSubmit() {
  const title = form.titleThread().value

 if (!title || title.length < 6) {
  return false
 }

 const text = form.textThread().value

 if (!text || text.length < 10) {
  return false
 }
 return true
}

function submitThread(username) {
  let id = createIdPost()
  db.collection("posts").doc(id)
  .set({
      id,
      title: form.titleThread().value,
      description: form.textThread().value,
      author: username,
      time: new Date().toLocaleDateString()

  }).then(() => {
      document.location.reload(true)
      closePopUp()
      setTimeout(() => {
        loading() 
      }, 1500)
      closeLoading()
      console.log("noite feliz");
    }).catch(error => {
      console.log("error")
  })
}

function createIdPost(){
  return Math.random().toString(16).substring(3, 16)
}