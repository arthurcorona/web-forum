document.addEventListener("DOMContentLoaded", () => {
            // loadHeaderAccount()
            loadInfoUser()
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

function loadInfoUser() {
    getUsername().then((username) => {
    document.querySelector(".user-information")
        .innerHTML += `
            <div>
                <img class="image-profile" src="public/images/default-user-img.png" alt="">
            </div>
            <ul class="users-info">
                <h3 class="name-user">${username}</h3>
                <!-- código de antes<h3 class="since-date">Account created at sinceDate</h3>-->
                <h3 class="posts-quantity"></h3>
            </ul>
        `
    }).catch(error => {
      console.log(error);
    })
}

function loadSinceDateUser() {
  getSinceDatUser().then((sinceDate) => {
    document.querySelector(".user-information")
      .innerHTML += `
      <h3 class="since-date">Account created at ${sinceDate}
      `
  }).catch(error => {
    console.log(error);
  })
}

// function loadHeaderAccount() {
//   getInfosUser().then((username) => {
//     document.querySelector(".header-account")
//       .innerHTML += `
//       <div class="">
//         <p class="welcome-text">Welcome to SINION,<b class="welcome-username"> ${username}</b>. Be careful what you do, everything is possible on the internet</p>
//       </div>
//       `
//   })
// }

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
