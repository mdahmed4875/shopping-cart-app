// myProducts.filter((item)=>item.title.includes(search.value))

// myCartProductArray = myProducts.filter((item)=> myCartIDs.includes(item.id))
let fname=document.getElementById("fname");
let lname=document.getElementById("lname");
let email=document.getElementById("email");
let password=document.getElementById("password");
let confirmpassword=document.getElementById("confirmpassword");
let error=document.getElementById("error");
let login=document.getElementById("login");
error.style.color="red";
login.addEventListener("click",()=>{
    window.location.href="/login.html";
})
document.getElementById("signup").addEventListener("click",(e)=>{
    if(fname.value==""||lname==""||email.value==""||password.value==""||confirmpassword==""){
        error.textContent="Please enter all required fields"
    }
    else if(password.value==confirmpassword.value){
         let users=JSON.parse(localStorage.getItem('users')??"[]");
        let filterUsers=users.filter((user)=>user.email==email.value);
        if(filterUsers.length>0){
            error.textContent="user already exists!";

        }
        else{
            users.push({
                email:email.value,
                password:password.value,
                fname:fname.value,
                lname:lname.value,
                createdAt:new Date(),
            });
            localStorage.setItem("users",JSON.stringify(users));
            fname.value=""
            lname=""
            email.value=""
            password.value=""
            confirmpassword=""
        }
    }
    else{
       error.textContent="please make password and confirm password equal!!";
    }
})