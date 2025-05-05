// https://api.github.com/users/async
let searchBtn = document.querySelector('.searchBtn')
let inputData = document.querySelector('input')
let contentBox = document.querySelector('.contentBox')
let emptyInputMsg = document.querySelector('.emptyInputMsg')

function usernameNotFound(inpt){
    if(inpt == 'emptyInput'){
        emptyInputMsg.textContent = "input can't be empty..."
        emptyInputMsg.style.display = 'block'
    }
    else{
        emptyInputMsg.textContent = 'username not found !!!'
        emptyInputMsg.style.display = 'block'
    }
    setTimeout(function(){
        emptyInputMsg.style.display = 'none'
    },2000)
}

function fetchData(userName){
    return fetch(`https://api.github.com/users/${userName}`).then(raw => {
        if(raw.ok) return raw.json()
        else {
            usernameNotFound('userNotFound')
            throw new Error("data not found!!!");
        }
    })
}

function displayProfileData(details){
    let profileData = (
            `<img class="avatar" src="${details.avatar_url}" alt="User Avatar" />
            <h2 class="name">${details.name ? details.name : "N/A"}</h2>
            <p class="username">${details.login ? details.login : "N/A"}</p>
            <p class="bio">${details.bio ? details.bio : "N/A"}</p>
            <p class="info"><strong>Location : </strong>${details.location ? details.location : "N/A"}</p>
            <p class="info"><strong>Company : </strong>${details.company ? details.company : "N/A"}</p>
            <div class="stats">
              <div><strong>Public repos</strong><span>${details.public_repos ? details.public_repos : "N/A"}</span></div>
              <div><strong>Followers</strong><span>${details.followers ? details.followers : "N/A"}</span></div>
              <div><strong>Following</strong><span>${details.following ? details.following : "N/A"}</span></div>
            </div>
            <a class="githubLink" href="${details.html_url}" target="_black">View Profile</a>
             `)
    contentBox.innerHTML = profileData
}

searchBtn.addEventListener('click',function(){
    const user = inputData.value.trim()
    if(user){
        fetchData(user)
        .then(data =>{
            displayProfileData(data)
        })
    }
    else{
        usernameNotFound('emptyInput')
    }
})

