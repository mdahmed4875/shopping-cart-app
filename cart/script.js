document.addEventListener('DOMContentLoaded', () => {
  const cart = document.querySelector('.cart');
  const user = JSON.parse(localStorage.getItem('currUser'));

  if (!user || typeof user.cartItems !== 'number') {
    console.log('User or cartItems not found.');
    return;
  }

  const item = document.getElementById('item');

  for (let i = 0; i < user.cartItems; i++) {
    const clone = item.cloneNode(true);
    clone.style.display = 'block';

    // Attach event listener to the remove button inside the clone
    const removeBtn = clone.querySelector('.removeBtn');
    removeBtn.addEventListener('click', () => {
      removeOneFromCart(user.email);
    });

    cart.appendChild(clone);
  }
});

// Function to remove one item from cart and update localStorage
function removeOneFromCart(email) {
  const user = JSON.parse(localStorage.getItem('currUser'));
  const users = JSON.parse(localStorage.getItem('users')) || [];

  if (user && users.length > 0) {
    user.cartItems = Math.max(0, user.cartItems - 1);
    localStorage.setItem('currUser', JSON.stringify(user));

    const userIndex = users.findIndex(u => u.email === email);
    if (userIndex !== -1) {
      users[userIndex] = user;
      localStorage.setItem('users', JSON.stringify(users));
    }

    // Refresh UI
    location.reload();
  } else {
    console.log('No user found or cart is empty.');
  }
}
