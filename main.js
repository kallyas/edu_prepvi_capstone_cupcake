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

let error = document.querySelector(".error");
let form = document.querySelector("form");

function login() {
  // access users list form localStorage
  let user = JSON.parse(localStorage.getItem("users", users));
  console.log(users);

  // grab input field values
  let username = document.querySelector("#username").value;
  let password = document.querySelector("#password").value;
  
  // user validation
  for (let i = 0; i < user.length; i++) {
    if (username === user[i].username && password === user[i].password) {
      return (top.location.href = "home.html");
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
  
let button = document.querySelector("#login");
  
button.addEventListener("click", (e) => {
  // e.preventDefault();
  login();
  alert("Login successful!")
});


  
function signUp() {
  let fname = document.querySelector("#fname").value;
  let lname = document.querySelector("#lname").value;
  let phone = document.querySelector("#phone").value;
  let email = document.querySelector("#email").value;
  let username = document.querySelector("#username").value;
  let password = document.querySelector("#psw").value;

  let user = {
    firstname: fname,
    lastname: lname,
    phoneNumber: phone,
    email: email,
    username: username,
    password: password
  };
  
  users.push(user);
  localStorage.setItem("users", JSON.stringify(users));
}
  
let btnSignUp = document.querySelector("#signup");
  
btnSignUp.addEventListener("click", (e) => {
  // e.preventDefault();
  alert('Sign up successful!')
  signUp();
  window.location = "index.html"
});

