const form = {
  titleThread: () => document.querySelector('#title-thread'),
  textThread: () => document.querySelector('#text-thread'),
  submitThreadButton: () => document.querySelector('#submit-thread'),
  ThreadContainer: () => document.querySelector('.thread-container'),
  textComment: ()=> document.querySelector("#text-comment"),
  threadID: () => document.getElementById("$(id)")
}

document.addEventListener("DOMContentLoaded", () => {
      db.collection("posts").get().then(snp=>{
        snp.forEach(post=>{
          showLoading()
          createPost(post.data())
          })
      }).catch(error => {
        console.log(error)
      })
})

// thread/post

function openPopUp() {
  appendUsername().then(username=>{
    document.body.innerHTML += `
      <div id="popup-container">
        <div class="thread-PopUp">
          <span class="close-popUp" onclick="closePopUp()">
          <i class="uil uil-multiply"></i>
          </span>
          <p class="title-popUp">CREATE POST</p>
          <section>
              <div class="img-user-popUp">
                  <img src="../../public/images/default-user-img.svg" alt=""">
              </div>
              <p class="username-popup">${username}</p>
          </section>

          <form class="thread-form">
            <input oninput="onChangeThreadSubmit()" type="text" maxLength="100" id="title-thread" class="thread-title" placeholder="post title">
            <label class="label-popup">type your text:</label>
            <textarea oninput="onChangeThreadSubmit()" id="text-thread" class="thread-text"></textarea> 
          </form>
          <button onclick="submitThread('${username}')" disabled="true" id="submit-thread" class="submit-thread" type="submit">submit</button>
        </div>
      </div>`
  }).catch(error => {
    console.log(error)
  })
}

function closePopUp() {
  document.getElementById("popup-container").remove()
}

function createPost(post){
  const user = firebase.auth().currentUser
    document.querySelector(".threads-container")
      .innerHTML += ` 
        <li class="thread" id="${post.id}">
          <img
            style="display${user.uid == post.uid ? "inline-block" : "none"}"
            onclick="reallyDeletePost()" class="delete-icon" src="../../public/images/delete-icon.svg">
          </img>
          <h2 class="title-post">${post.title}</h2>
          <p class="text-post ${listenClassRead(post.description)}">${post.description}</p>
          ${listenLengthText(post.description)}
          <div class="stamp-thread">
            <p class="timestamp">${post.author} - ${post.time}</p>
          </div>
          <div class="buttons_comments">
            <button onclick="openPopUpComment('${post.id}')">create comment</button>
            <img class="show-comment" onclick="toggleButtonComments(this)" src="../../public/images/talk.svg">
          </div>
          <div class="comments-container">
            ${createComments(post.comments)}
          </div>
      </li>                                                    
 `                                           
}

function submitThread(username){
  auth.onAuthStateChanged(user => createThreadDb(username, user.uid))
  const createThreadDb = (username, uid)=>{
    let id = createIdPost()
    db.collection("posts").doc(id)
    .set({
        id,
        title: form.titleThread().value,
        description: form.textThread().value,
        author: username,
        comments: [],
        uid,
        time: new Date().toLocaleDateString()
      }).then(() => {
        document.location.reload(true)
      }).catch(error => {
        console.log("error")
    })
  }
  showLoading()
}

function reallyDeletePost(id_delete) {
  appendUsername().then(username => {
  document.body.innerHTML += 
    `
    <div id="popup-container">
    <div class="popup-delete">
            <p class="title-popUp">DELETE POST</p>    
              <br><hr><br>
            <div>
                <div class="img-user-popUp">
                    <img src="../../public/images/default-user-img.svg" alt=""">
                </div>
                <p class="username-popup text-popup-delete">Do you really want to delete your post, ${username}?</p>
                <span><button onclick="closePopUp()" class="delete-button">No</button></span>
                <span><button onclick="deletePost('${id_delete}')" class="delete-button">Yes</button></span>
            </div>
    </div>
    </div>
    
    `
  }).catch(error => {
    console.log(error);
  })
}

function deletePost() {
  let threadID = document.getElementById("$(id)") 

    db.collection('posts')
      .doc(`${threadID}`).delete()
        .then(() => {
            location.reload()
            console.log("Post successfully deleted!");
        }).catch((error) => {
            console.error("Error removing post: ", error);
        });;
      // .doc(array.splice(array.indexOf(array.filter(thread => thread.id === array[Math.floor(Math.random()*array.length - 1)].id)))).delete()
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

function createIdPost(){
  return Math.random().toString(16).substring(3, 16)
}

function listenLengthText(description){
  let lengthDescription = description.length
  if(lengthDescription > 700) return "<span><button onclick='readMoreThread(this)'>Ler mais</button></span>"
  else return ""
} 

function listenClassRead(description){
  let lengthDescription = description.length
  if(lengthDescription > 700) return "putText_Post"
  else return ""
}

function readMoreThread(button){
  let textThread = button.parentNode.parentNode.querySelector(".text-post")
  textThread.classList.toggle("putText_Post")
  button.innerHTML === "Read More" ? button.innerHTML = "Read less" : button.innerHTML = "Read more"
}

// comments

function createComments(comments){
  let comments_html = ""
  comments.forEach(comment=>{
    comments_html += `
      <p>${comment.description}</p>
      <p class="stamp-comment">${comment.author} - ${comment.time}</p>
      `
  })
  return comments_html
}

function openPopUpComment(idPost){
  appendUsername().then(username => {
    document.body.innerHTML = document.body.innerHTML += `
    <div id="popup-container">
      <div class="thread-PopUp">
          
        <span class="close-popUp" onclick="closePopUp()">
        <i class="uil uil-multiply"></i>
        </span>

        <p class="title-popUp">CREATE COMMENT</p>    

        <section>
            <div class="img-user-popUp">
                <img src="../../public/images/default-user-img.svg">
            </div>
            <p class="username-popup">${username}</p>
        </section>

        <form class="thread-form">
          <label class="label-popup">type your comment:</label>
          <textarea id="text-comment" class="thread-text"></textarea> 
        </form>
        <button onclick="submitComment('${idPost}', '${username}')" id="submit-thread" class="submit-thread" type="submit">submit</button>
      </div>
    </div>`
      
       
  }).catch(error => {
    console.log(error);
  })
}

function submitComment(idPost, username){
  let comment = {
    description: form.textComment().value,
    author: username,
    time: new Date().toLocaleDateString()
  }

    db.collection("posts").doc(idPost).update({
      comments: firebase.firestore.FieldValue.arrayUnion(comment)
      },
      {merge: true})
        .then(()=>{
          location.reload()
        }).catch(error =>{
          console.log(error)
      })
      showLoading()
}

function toggleButtonComments(element) {

  let commentsContainer = element.parentNode.parentNode.querySelector(".comments-container")
  commentsContainer.classList.toggle('comments-container-visible')

  if(commentsContainer.classList.contains('comments-container-visible')) {
    element.innerHTML = ``
  }
  else {
    element.innerHTML = `show comments`
  }
}

// buttons menu
 
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

// 

function  appendUsername() {
  // verificando se o user está on
  return new Promise((res, rej) => {
    auth.onAuthStateChanged(userOn => {
      if(userOn){
        let userInDB = db.collection("users").doc(userOn.uid)
        userInDB.get().then((doc) => {
          let username = doc.data().user.username
            res(username)
        }) 
      }
      else{
        rej("error")
      }
    })
  })  
}

// loading

function showLoading() {
  const loadingContainer = document.createElement('div')
  const gifLoading = document.createElement('img')

  loadingContainer.classList.add('loading-container')

  loadingContainer.appendChild(gifLoading)

  gifLoading.src = "https://media.tenor.com/JXy40v9mQwIAAAAj/monkey-skype.gif"
  gifLoading.classList.add('loading-image')

  document.body.append(loadingContainer)

  setTimeout(() => hideLoading(), 800)
}

function hideLoading() {
  document.querySelector('.loading-container').remove()
}
