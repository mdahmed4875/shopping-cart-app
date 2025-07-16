let email=document.getElementById("email");
let password=document.getElementById("password");
let error=document.getElementById("error");
function generateToken(){
    return Math.random(0,10000).toString();
}
document.getElementById("login").addEventListener("click",(e)=>{
    if(email.value==""||password.value==""){
    error.textContent="input fields are required"
    }
    else{
        let users=JSON.parse(localStorage.getItem("users")??"[]");
     if(users.length>0){
        let user=users.filter((user)=>user.email==email.value);
        if(user.length>0){
            let obj=user[0];
            if(obj.password==password.value){
                localStorage.setItem("currUser",JSON.stringify({
                    email:email.value,
                    password:password.value,
                    token:generateToken()
                }));
                 window.location.href="/profile/index.html";

            }
            else{
                error.textContent="password is wrong";
            }
        }
        else{
            error.textContent="user does not exists!"
        }
        
     }
     else{
        error.textContent="user not exists!"
     }
    }
})
let signupBtn=document.getElementById("signup");
signupBtn.addEventListener("click",()=>{
    window.location.href="/index.html";
})