document.addEventListener("DOMContentLoaded", () => {
            loadInfoUser()
            showLoading()
        })

function getInfosUser() {
  return new Promise((res, rej) => {
    auth.onAuthStateChanged(userOn => {
        let userInDB = db.collection("users").doc(userOn.uid)
        userInDB.get().then((doc) => { 
          let username = doc.data().user.username
          let sinceDate = doc.data().user.since_date
          // let teste = username + sinceDate
          //   res(teste)
            res(username)
            res(sinceDate)
          }).catch(error => {
                rej(error);
        })
    })
  })  
}

//o erro está no then. que retorna uma promisse, por isso não retorna a imagem

function load() {
  
}

function loadInfoUser() {
    getInfosUser().then((username, sinceDate) => {
    document.querySelector(".user-information")
        .innerHTML += `
            <div>
                <img class="image-profile" src="public/images/default-user-img.png" alt="">
            </div>
            <ul class="users-info">   
                <h3 class="name-user"> ${username}</h3>
                <h3 class="since-date">Conta criada em ${sinceDate}</h3>
                <h3 class="posts-quantity"></h3>
            </ul>
        `   
  }
)}

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
