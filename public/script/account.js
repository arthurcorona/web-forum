document.addEventListener("DOMContentLoaded", () => {
            loadHeaderAccount()
            loadUsername()
            showLoading()
            loadSinceDateUser()
        })

function getUsername() {
  return new Promise((res, rej) => {
    auth.onAuthStateChanged(userOn => {
        let userInDB = db.collection("users").doc(userOn.uid)
        userInDB.get().then((doc) => { 
          let username = doc.data().user.username
          res(username)        
          }).catch(error => {
                rej(error);
            })
        })
    })    
}

function getSinceDatUser() {
  return new Promise((res, rej) => {
    auth.onAuthStateChanged(userOn => {
        let userInDB = db.collection("users").doc(userOn.uid)
        userInDB.get().then((doc) => { 
          let sinceDate = doc.data().user.since_date 
          res(sinceDate)       
          }).catch(error => {
                rej(error);
        })
    })
  })
}

//caso eu chame o res(sinceDate) do getInfosUser() antes, ele transformará o username em data,porque no then abaixo só pega 

function loadUsername() {
    getUsername().then((username) => {
    document.querySelector(".user-information")
        .innerHTML += `
          <div class="image-name">
            <div class="">
                <img class="image-profile" src="public/images/default-user-img.png" alt="">
            </div>
            <ul class="users-info">
              <li class="user-data">${username}</li>
              <li class="posts-quantity"></li>
            </ul>
          </div>
        `
    }).catch(error => {
      console.log(error);
    })
}

function loadSinceDateUser() {
  getSinceDatUser().then((sinceDate) => {
    document.querySelector(".user-information")
      .innerHTML += `
        <div class="allt">
          <ul class="users-info">
            <li class="user-data">Account created at ${sinceDate}</li>
          </ul>
        </div>
      `

  }).catch(error => {
    console.log(error);
  })
}

// criar o html no próprio html, e apenas adicionar as o username e data após ele ficar pronto. Porque não está encontrando o elemento para modificar-lo mas no loading tambem nao esta de primeira no html, tenho que comprarar e ver o que posso fazer.


function loadHeaderAccount() {
  getUsername().then((username) => {
    document.querySelector(".header-account")
      .innerHTML += `
      <div class="">
        <p class="welcome-text">Welcome to SINION,<b class="welcome-username"> ${username}</b>. Be careful what you do, everything is possible on the internet</p>
      </div>
      `
  })
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

// loading

function showLoading() {
  let loadingContainer = document.createElement('div')
  let gifLoading = document.createElement('img')

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

