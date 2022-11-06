//fazer funcção para adicionar o html no comments-container

const form = {
  titleThread: () => document.getElementById('title-thread'),
  textThread: () => document.getElementById('text-thread'),
  submitThreadButton: () => document.getElementById('submit-thread'),
  ThreadContainer: () => document.querySelector('.thread-container'),
  commentsContainer: () => document.querySelector('.comments-container'),
  buttonOpenComments: () => document.querySelector('.open-comments'),
  buttonCloseComments: () => document.querySelector('.close-comments'),
  buttonOpenCommentsAgain: () => document.querySelector('.open-comments-again'),


}

document.addEventListener("DOMContentLoaded", ()=>{
      db.collection("posts").get().then(snp=>{
        snp.forEach(post=>{
          createPost(post.data())
        })
      })
      loading()
})

function createPost(post){
    document.querySelector(".threads-container").innerHTML += ` 

                                                                  <div id="thread-container">
                                                                      <li class="thread-container" id="${post.id}">
                                                                        <h2 class="title-post">${post.title}</h2>
                                                                        <div class="text-post">${post.description}</div>
                                                                        <div class="stamp-thread">
                                                                            <b class="author">${post.author}</b>
                                                                            <b class="timestamp">${post.time}</b> 
                                                                            <hr>
                                                                        </div>

                                                                        <button class="open-comments" onclick="openComments()">Abrir Comentários</button>
                                                                        <button class="close-comments" onclick="closeComments()">Fechar Comentários</button>
                                                                        <button class="open-comments-again" onclick="closeCommentsAgain()">Abrir Comentários</button>

                                                                        <div class="comments-container" id="comments-container">
                                                                        </div>
                                                                      </li>
                                                                  </div> 
                                                                
                                                              `

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

// criar a função openThread() e deixar ela no index home

// form.ThreadContainer().addEventListener("click", () => {
//   document.getElementById("teste").innerHTML = "Hello World";
// })

function openPopUpComment() {

}

function openComments() {

  form.commentsContainer().innerHTML += `

                                                <h3>Comentários:</h3>
                                                <div class="text-comment">conteúdo do comentário</div>
                                                <div class="stamp-thread">
                                                  <b class="author">Nick do autor</b>
                                                  <b class="timestamp">05/11/22</b> 
                                                  <hr>
                                                  <button id="open" onclick="openPopUpComment()"> Adicionar comentário </button>
                                                </div>

                                                `

  form.buttonOpenComments().style.display = 'none'
  form.buttonCloseComments().style.display = 'Flex'


// documento em html para adicionar
  // <h3>Comentários:</h3>
  // <div class="text-comment">conteúdo do comentário</div>
  // <div class="stamp-thread">
  //   <b class="author">${post.author}</b>
  //   <b class="timestamp">${post.time}</b> 
  //   <hr>
  // </div>

}

function closeComments() {
  form.buttonCloseComments().style.display = 'none'

  form.commentsContainer().style.display = 'none'
  form.buttonOpenCommentsAgain().style.display = 'flex'
  
}

function closeCommentsAgain() {
  form.commentsContainer().style.display = 'block'
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
      loading()
    }).catch(error => {
      console.log("error")
  })
}

function addComment() {
  
}


function createIdPost(){
  return Math.random().toString(16).substring(3, 16)
}