// SIGN UP

// Initial users
const users = [
  {
    username: "samuel",
    password: "pass",
  },
  {
    username: "priscilla",
    password: "pass",
  },
];

let error = document.querySelector(".error");
let form = document.querySelector("form");
//get existing users and use them to check whether the entered username is already taken

let existingUsers = JSON.parse(localStorage.getItem("users", users));

function signUp() {
  console.log("Validating");
  let username = document.querySelector("#username").value;
  let password = document.querySelector("#password").value;

  // perform a username check
  for (let i = 0; i < existingUsers.length; i++) {
    if (username === existingUsers[i].username && !username && !password) {
      error.style.visibility = "visible";
      error.textContent = `Sorry Username already taken`;
      setTimeout(() => {
        error.style.visibility = "hidden";
      }, 5000);
      form.reset();
      return;
    }
  }
  let user = {
    username: username,
    password: password,
  };

  users.push(user);
  localStorage.setItem("users", JSON.stringify(users));

  alert("Sign up successful!");
  console.log(window.location);
  window.location = "./index.html";
}

let btnSignUp = document.querySelector("#signup");

btnSignUp.addEventListener("click", (e) => {
  e.preventDefault();
  signUp();
});
