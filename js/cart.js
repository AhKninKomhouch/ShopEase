// cart.js — small helper library for managing the cart in localStorage.
// No server, no database — this just keeps the cart remembered while
// you click between pages (home -> detail -> cart -> checkout -> invoice).

const CART_KEY = "shopease_cart";
const LAST_ORDER_KEY = "shopease_last_order";

function getCart() {
  const raw = localStorage.getItem(CART_KEY);
  return raw ? JSON.parse(raw) : []; // [{id, qty}, ...]
}

function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

function addToCart(id, qty) {
  id = parseInt(id, 10);
  qty = Math.max(1, parseInt(qty, 10) || 1);
  const cart = getCart();
  const existing = cart.find((item) => item.id === id);
  if (existing) {
    existing.qty += qty;
  } else {
    cart.push({ id, qty });
  }
  saveCart(cart);
}

function updateCartQty(id, qty) {
  id = parseInt(id, 10);
  qty = parseInt(qty, 10);
  let cart = getCart();
  if (qty <= 0) {
    cart = cart.filter((item) => item.id !== id);
  } else {
    const existing = cart.find((item) => item.id === id);
    if (existing) existing.qty = qty;
  }
  saveCart(cart);
}

function removeFromCart(id) {
  id = parseInt(id, 10);
  const cart = getCart().filter((item) => item.id !== id);
  saveCart(cart);
}

function clearCart() {
  localStorage.removeItem(CART_KEY);
}

// Combine cart with full product info (name, price, icon, etc.)
function getCartDetails() {
  const cart = getCart();
  return cart
    .map((item) => {
      const product = PRODUCTS.find((p) => p.id === item.id);
      if (!product) return null;
      return {
        ...product,
        qty: item.qty,
        subtotal: +(product.price * item.qty).toFixed(2)
      };
    })
    .filter(Boolean);
}

function getCartTotal(cartDetails) {
  return +cartDetails.reduce((sum, item) => sum + item.subtotal, 0).toFixed(2);
}

function getCartCount() {
  return getCart().reduce((sum, item) => sum + item.qty, 0);
}

// Updates the little cart badge number in the header, if present on the page.
function refreshCartBadge() {
  const badge = document.querySelector("[data-cart-badge]");
  if (badge) badge.textContent = getCartCount();
}

document.addEventListener("DOMContentLoaded", refreshCartBadge);
