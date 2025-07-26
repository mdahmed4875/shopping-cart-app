let allProducts = [];

function renderProducts(products) {
  const productList = document.getElementById("product-list");
  productList.innerHTML = ""; // clear before rendering

  products.forEach(product => {
    const itemDiv = document.createElement("div");
    itemDiv.className = "item";

    itemDiv.innerHTML = `
      <img src="${product.image}" alt="${product.title}" />
      <div class="info">
        <div class="row">
          <div class="price">$${product.price}</div>
          <div class="sized">${product.sizes?.join(",") || "N/A"}</div>
        </div>
        <div class="colors">
          Colors:
          <div class="row">
            ${product.colors?.map(c => `<div class="circle" style="background-color: ${c}"></div>`).join("") || ""}
          </div>
        </div>
        <div class="row">Rating: ${product.rating?.rate ?? "N/A"}</div>
      </div>
      <button class="addBtn">Add to Cart</button>
    `;
     const button = itemDiv.querySelector(".addBtn");
  button.addEventListener("click", () => {
    let currUser = JSON.parse(localStorage.getItem("currUser"));

    if (!currUser) {
      alert("Please log in to add items to cart.");
      return;
    }

    // If cart doesn't exist, create an empty array
    if (!Array.isArray(currUser.cart)) {
      currUser.cart = [];
    }

    // Optionally check for duplicates based on product.id
    const alreadyInCart = currUser.cart.some(item => item.id === product.id);
    if (alreadyInCart) {
      alert("Product already in cart.");
      return;
    }

    // Push product to cart
    currUser.cart.push(product);

    // Save updated user back to localStorage
    localStorage.setItem("currUser", JSON.stringify(currUser));

    alert("Product added to cart!");
  });
    productList.appendChild(itemDiv);
  });
}

// Fetch and prepare products
document.addEventListener("DOMContentLoaded", () => {
  let products = JSON.parse(localStorage.getItem("products") || "[]");

  if (!products.length) {
    fetch("https://fakestoreapi.com/products")
      .then(res => res.json())
      .then(data => {
        const colors = ["red", "black", "blue", "green"];
        const sizes = ["S", "M", "L", "XL"];

        const newdata = data.map(item => ({
          ...item,
          colors: colors.slice(Math.floor(Math.random() * colors.length)),
          sizes: sizes.slice(Math.floor(Math.random() * sizes.length))
        }));

        localStorage.setItem("products", JSON.stringify(newdata));
        allProducts = newdata;
        renderProducts(allProducts);
      });
  } else {
    allProducts = products;
    renderProducts(allProducts);
  }
});

// Filter buttons
document.querySelectorAll(".filter").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".filter").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    const category = btn.dataset.category;
    if (category === "all") {
      renderProducts(allProducts);
    } else {
      const filtered = allProducts.filter(p => p.category.toLowerCase() === category.toLowerCase());
      renderProducts(filtered);
    }
  });
});
const logoutBtn = document.getElementById('logout');

logoutBtn.addEventListener('click', () => {
  // ✅ Remove current user from localStorage
  localStorage.removeItem('currUser');

  // ✅ Optional: show confirmation or toast
  alert("Logged out successfully!");

  // ✅ Redirect to signup or login page
  window.location.href = "/login.html"; // change to your login/signup path
});
