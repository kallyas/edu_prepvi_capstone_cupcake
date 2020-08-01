// SIGN UP

// Initial users
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
  
function signUp() {
  console.log('Validating')

  let fname = document.querySelector("#fname").value;
  let lname = document.querySelector("#lname").value;
  let phone = document.querySelector("#phone").value;
  let email = document.querySelector("#email").value;
  let username = document.querySelector("#username").value;
  let password = document.querySelector("#password").value;

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

  alert('Sign up successful!')
  console.log(window.location)
  window.location = "./UI/index.html"
}
  
let btnSignUp = document.querySelector("#signup");
  
btnSignUp.addEventListener("click", (e) => {
  e.preventDefault();
  signUp();

});

