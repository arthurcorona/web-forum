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
            res(username, sinceDate)
              }).catch(error => {
                rej(error);
        })
    })
  })  
}
  

// function getUserDate() {
//   return new Promise((res, rej) => {
//     auth.onAuthStateChanged(userOn => {
//       let userInDB = db.collection("users").doc(userOn.uid)
//       userInDB.get().then((doc) => {
//         let sinceDate = doc.data().user.since_date
//         res(sinceDate)
//           }).catch(error => {
//             rej(error);
//       })
//     })
//   })
// }

function loadInfoUser() {
    getInfosUser().then(username => {
    document.querySelector(".user-information")
        .innerHTML += `
            <div>
                <img class="image-profile" src="public/images/default-user-img.png" alt="">
            </div>
            <ul class="users-info">   
                <h3 class="since-data">${sinceDate}</h3>
                <h3 class="name-user">${username}</h3>
                <h3 class="posts-quantity">123</h3>
            </ul>
        `   
  }
)}

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
