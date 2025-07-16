let currUser=localStorage.getItem("currUser");
if(currUser){
/*const produtc = {
  id: 1,
  title: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
  price: 109.95,
  description:
    "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
  category: "men's clothing",
  image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
  rating: { rate: 3.9, count: 120 },
};*/
document.addEventListener("DOMContentLoaded",()=>{
  if(!localStorage.getItem("currUser")){
    window.location.href="/login.html";
  }
})
let colors=['red',"black","blue","green"];
let sizes=["xs","sm","md","lg","xl"];
if(localStorage.getItem("products")){
  let products=JSON.parse(localStorage.getItem("products"));
  let mens=products.filter((item)=>item.category=="men's clothing")
}
else{
fetch("https://fakestoreapi.com/products").then((ress)=>ress.json())
.then((data)=>{
  console.log(data);
let newdata=data.map((item)=>{
item.colors=colors.slice(Math.floor(Math.random()*4));
item.sizes=sizes.slice(Math.floor(Math.random()*4));
return item;
})
console.log(newdata);
localStorage.setItem("products",JSON.stringify(newdata));
})
}
}
else{
  window.location.href="/login.html";
}
let logoutBtn=document.getElementById("logout");
logoutBtn.addEventListener("click",()=>{
  localStorage.removeItem("currUser");
  window.location.href="/login.html";
});
let addBtn=document.querySelectorAll(".addBtn");
addBtn.forEach((btn)=>{
  btn.addEventListener("click",(e)=>{
    let currUser=JSON.parse(localStorage.getItem("currUser"));
    let cartItems=0;
    if(currUser.cartItems!=null)cartItems=currUser.cartItems+1;
    currUser.cartItems=cartItems;
    let users=JSON.parse(localStorage.getItem("users")??"[]");
    let userIndex=users.findIndex((user)=>currUser.email==user.email);
    users[userIndex]=currUser;
    localStorage.setItem("users",JSON.stringify(users));
    localStorage.setItem("currUser",JSON.stringify(currUser));
  })
})
