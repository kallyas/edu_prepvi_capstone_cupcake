// the login in page
const users = [
  {
    username:'samuel',
    password:'pass'
  },
  {
    username:'priscilla',
    password:'pass'
  }
];

localStorage.setItem('users', JSON.stringify(users))

let error = document.querySelector(".error");
let form = document.querySelector("form");

function login() {

  console.log("Running")

  // access users list form localStorage
  let user = JSON.parse(localStorage.getItem("users", users));
  console.log(users);

  // grab input field values
  let username = document.getElementById("username").value;
  let password = document.getElementById("password").value;

  // user validation
  for (let i = 0; i < user.length; i++) {
    if (username === user[i].username && password === user[i].password) {
      alert("Login successfull")
      localStorage.setItem('userLoggedIn', JSON.stringify(username))
      // console.log(window.location)
      window.location = 'index.html'
      return false
    } else {
      error.style.visibility = "visible";
      setTimeout(() => {
        error.style.visibility = "hidden";
      }, 5000);
      form.reset();
      return;
    }
  }
}

let btnSignUp = document.querySelector("#login");
  
btnSignUp.addEventListener("click", (e) => {
  e.preventDefault();
  login();

});
