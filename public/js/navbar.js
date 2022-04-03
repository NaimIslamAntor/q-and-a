

//selectors
const navBar = document.getElementById('navBar')
const navBarContainer = document.getElementById('navBarContainer')


navBar.addEventListener('click', toggleNav)


//open and close the navbar

function toggleNav(){
    navBarContainer.classList.toggle('open')
}