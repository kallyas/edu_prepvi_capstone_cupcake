const users = [
    {
      username: "samuel",
      password: "pass",
    },
    {
      username: "stella",
      password: "pass",
    },
  ];
  
  let error = document.querySelector(".error");
  let form = document.querySelector("form");
  function signUp() {
    let username = document.querySelector("#Username").value;
    let password = document.querySelector("#Password").value;
  
    let User = JSON.parse(localStorage.getItem("users", users));
  
    for (let i = 0; i < User.length; i++) {
      if (username === User[i].username) {
        error.style.visibility = "visible";
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
    form.reset();
  }
  
  let SignUp = document.querySelector("#signup");
  
  SignUp.addEventListener("click", (e) => {
    e.preventDefault();
    signUp();
  });
  