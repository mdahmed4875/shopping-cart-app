// Write your script here
let curr=localStorage.getItem("currUser");

if(curr!=null){
let fname=document.getElementById("fname");
let lname=document.getElementById("lname");
let oldpass=document.getElementById("oldpass");
let newpass=document.getElementById("newpass");
let newpassconfirm=document.getElementById("newpassconfirm");
let currUser=JSON.parse(localStorage.getItem("currUser"));
let error=document.getElementById('error');
let btn=document.getElementById("btn");
let changepass=document.getElementById("changepass");
let er=document.getElementById("er");
let logout=document.getElementById("logout");
let shop=document.getElementById("shop");
shop.addEventListener("click",()=>{
    window.location.href="/shop/index.html";
})
btn.addEventListener('click',()=>{
    if(fname.value==""||lname.value==""){
        error.textContent="please enter the required fields!";
    }
    else{
        let users=JSON.parse(localStorage.getItem("users")??"[]");
        let index=users.findIndex((user)=>currUser.email==user.email);
        users[index].fname=fname.value;
        users[index].lname=lname.value;

        localStorage.setItem("users",JSON.stringify(users))
        error.textContent="successfully changed";
    }
})
changepass.addEventListener("click",()=>{
    if(oldpass==""||newpass==""||newpassconfirm==""){
        er.textContent="fields are required!";
    }
    else{
        let users=JSON.parse(localStorage.getItem("users")??"[]");
        let index=users.findIndex((user)=>currUser.email==user.email);
        if(users[index].password!=oldpass.value){
            er.textContent="password is wrong";
        }
        else{
            if(newpass.value!=newpassconfirm.value){
                er.textContent="both passwords shold be same";
            }
            else{
                users[index].password=newpass.value;
                localStorage.setItem("users",JSON.stringify(users));
                er.textContent="password changed succesfully";
            }
        }
    }
})
logout.addEventListener('click', () => {
  // ✅ Remove current user from localStorage
  localStorage.removeItem('currUser');

  // ✅ Optional: show confirmation or toast
  alert("Logged out successfully!");

  // ✅ Redirect to signup or login page
  window.location.href = "/login.html"; // change to your login/signup path
});
}
else{
    window.location.href="/login.html";
}
