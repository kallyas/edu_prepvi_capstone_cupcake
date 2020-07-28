// the login in page
const users = [
   { username:'samuel',
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
    let user = JSON.parse(localStorage.getItem("users", users));
    console.log(users);
    let username = document.querySelector("#username").value;
    let password = document.querySelector("#password").value;
  
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
    e.preventDefault();
    login();
  });
  
  function signUp() {
    let username = document.querySelector("#Username").value;
    let password = document.querySelector("#Password").value;
  
    let user = {
      username: username,
      password: password,
    };
  
    users.push(user);
    localStorage.setItem("users", JSON.stringify(users));
  }
  
  let btnSignUp = document.querySelector("#signup");
  
  btnSignUp.addEventListener("click", (e) => {
    e.preventDefault();
    signUp();
  });

