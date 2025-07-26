const cartItemsContainer = document.getElementById("cartItems");
const totalAmountSpan = document.getElementById("totalAmount");

let currUser = JSON.parse(localStorage.getItem("currUser"));
let cart = currUser?.cart || [];

function renderCart() {
  cartItemsContainer.innerHTML = "";

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = "<p>Your cart is empty.</p>";
    totalAmountSpan.innerText = "0";
    return;
  }

  let total = 0;

  cart.forEach((product, index) => {
    total += product.price;

    const itemDiv = document.createElement("div");
    itemDiv.className = "item";

    itemDiv.innerHTML = `
      <img src="${product.image}" alt="${product.title}">
      <div class="item-details">
        <h3>${product.title}</h3>
        <p>Price: $${product.price}</p>
      </div>
      <button class="remove-btn" data-index="${index}">Remove</button>
    `;

    cartItemsContainer.appendChild(itemDiv);
  });

  totalAmountSpan.innerText = total.toFixed(2);

  // Attach remove listeners
  document.querySelectorAll(".remove-btn").forEach(btn => {
    btn.addEventListener("click", (e) => {
      const index = e.target.getAttribute("data-index");
      removeItem(index);
    });
  });
}

function removeItem(index) {
  cart.splice(index, 1);
  currUser.cart = cart;
  localStorage.setItem("currUser", JSON.stringify(currUser));
  renderCart();
}

document.getElementById("checkoutBtn").addEventListener("click", () => {
  if (cart.length === 0) {
    alert("Cart is empty.");
    return;
  }

  alert("Checkout successful!");
  cart = [];
  currUser.cart = [];
  localStorage.setItem("currUser", JSON.stringify(currUser));
  renderCart();
});

renderCart();
