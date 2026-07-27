# ShopEase — Pure HTML/CSS/JavaScript E-commerce Demo (School Project)

No server, no database — just plain HTML, CSS, and JavaScript. Good for a UI-only demo.

## Features (matches your project checklist)
- ✅ Catalog / home page (search + category filter) — `index.html`
- ✅ Product detail page — `pages/detail.html`
- ✅ Add to cart
- ✅ Cart list (update quantity / remove items) — `pages/cart.html`
- ✅ Checkout (shipping info + payment method form) — `pages/checkout.html`
- ✅ Invoice, viewable on screen + a "Download Invoice (.html)" button that saves a real standalone `.html` file — `pages/invoice.html`
- ✅ 10 sample products — `js/products.js`

## How it works
- Everything runs in the browser. There is **no backend and no database.**
- The 10 products live in a plain JavaScript array in `js/products.js`.
- The cart uses the browser's `localStorage` only so it's remembered as you click between pages (Home → Detail → Cart → Checkout → Invoice). This is not a database — it's just temporary storage inside your own browser, and it resets whenever you clear your browser data.
- All page content (product grid, cart table, invoice, etc.) is built dynamically with JavaScript (`document.getElementById(...).innerHTML = ...`).

## How to run it
Because it's plain HTML/CSS/JS, you have two options:

**Option 1 — just open it (simplest):**
Double-click `index.html` and it opens in your browser. Everything should work.

**Option 2 — use a local server (recommended, avoids any browser file-security quirks):**
1. Open a terminal in this folder.
2. If you have Python installed: `python3 -m http.server 8080`
3. Open `http://localhost:8080` in your browser.

(Option 2 is only needed if your browser complains about loading local files — most modern browsers handle Option 1 fine for this project.)

## Folder structure
```
ecommerce-html/
├── index.html              # catalog / home page
├── css/
│   └── style.css           # all styling
├── js/
│   ├── products.js         # 10 sample products (plain array)
│   └── cart.js             # cart helper functions (localStorage)
└── pages/
    ├── detail.html          # product detail page
    ├── cart.html            # cart list page
    ├── checkout.html        # checkout form
    └── invoice.html         # invoice + download-as-.html button
```

## How the pages connect
1. **index.html** — shows all products, "Add to Cart" button on each card, search box, category chips.
2. **pages/detail.html?id=X** — shows one product's full details, related products, quantity picker, "Add to Cart".
3. **pages/cart.html** — table of cart items, update quantity, remove, shows total, "Proceed to Checkout".
4. **pages/checkout.html** — form (name, email, phone, address, payment method) → validates required fields → on submit, builds an order and redirects to invoice.
5. **pages/invoice.html** — shows the invoice for the order just placed, with a button to download it as a standalone `.html` file (works fully offline, doesn't need the CSS file).

## Ideas if you want to extend it for extra credit
- Add product images instead of emoji icons.
- Add simple client-side login (still no real database needed).
- Add a "My Orders" page that keeps a history of past orders in `localStorage`.
