var attempt = 3; //variable to count number of attempts.
// below function executes on click of login button.
function validated(){
    var usent.getrname =document.getElementById("username").Value;
    var password =documeElementById(password).Value;
    var Email =document.getElementById("password").Value;
    if(username=="Generous" && password=="123456789"){
    alert("Login successfully");
    window.location ="https://www.pivotaltracker.com/n/projects/2458544"; // redirecting to other page.
    return false
    }
    else{
        attempt--;//decrementing by one.
        alert("You have left "+attempt+" attempt;");
        //Disabling fields after 3 attempts.
        if(attempt == 0){
            document.getElementById("username").disabled =true;
            document.getElementById("password").disabled =true;
            document.getElementById("submit").disabled =true;
        }
    }
}