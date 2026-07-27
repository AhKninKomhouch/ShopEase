# 🛍️ ShopEase – E-Commerce Website (School Midterm Project)

> **A simple E-Commerce website built with pure HTML, CSS, and JavaScript.**  
> This project demonstrates the complete shopping flow without using any backend or database.

---

## 📖 Project Overview

**ShopEase** is a frontend-only e-commerce website developed for a **Midterm Group Project**. It simulates an online shopping experience, allowing users to browse products, view details, add items to a shopping cart, complete checkout, and generate an invoice.

> **Technology:** Pure HTML, CSS & JavaScript (No Frameworks)

---

## ✨ Features

### 🏠 Home / Catalog
- Display all products
- Search products
- Filter by category
- Responsive product cards

### 📄 Product Detail
- View detailed product information
- Product description
- Quantity selector
- Related products
- Add to Cart

### 🛒 Shopping Cart
- View selected products
- Update quantity
- Remove items
- Calculate subtotal and total

### 💳 Checkout
- Customer information form
- Shipping address
- Payment method selection
- Form validation

### 🧾 Invoice
- Display order summary
- Customer information
- Purchased products
- Total amount
- Download invoice as a standalone **HTML** file

---

## 📦 Sample Data

The project includes **10 sample products** stored in:

```text
js/products.js
```

No database is required.

---

## 🛠️ Technologies Used

- HTML5
- CSS3
- JavaScript (ES6)
- LocalStorage
- Git
- GitHub

---

## 📁 Project Structure

```text
ShopEase/
│
├── index.html                 # Home / Catalog
│
├── css/
│   └── style.css              # Website styling
│
├── js/
│   ├── products.js            # 10 Sample Products
│   └── cart.js                # Shopping Cart Logic
│
└── pages/
    ├── detail.html            # Product Detail
    ├── cart.html              # Shopping Cart
    ├── checkout.html          # Checkout
    └── invoice.html           # Invoice
```

---

## 🔄 Website Flow

```text
Home
   │
   ▼
Product Detail
   │
   ▼
Add to Cart
   │
   ▼
Shopping Cart
   │
   ▼
Checkout
   │
   ▼
Invoice
```

---

## 💾 Data Storage

This project **does not use a backend or database**.

Instead, it uses:

- JavaScript Arrays
- Browser LocalStorage

The shopping cart is stored locally inside the browser so users can continue shopping while navigating between pages.

---

## 🚀 Getting Started

### Option 1 — Open Directly

Simply open:

```text
index.html
```

using any modern web browser.

---

### Option 2 — Run with Local Server (Recommended)

If you have Python installed:

```bash
python3 -m http.server 8080
```

Then visit:

```
http://localhost:8080
```

---

## 📋 Project Pages

| Page | Description |
|------|-------------|
| 🏠 Home | Product Catalog |
| 📄 Detail | Product Information |
| 🛒 Cart | Shopping Cart |
| 💳 Checkout | Customer Checkout |
| 🧾 Invoice | Order Invoice |

---

## 🎯 Learning Objectives

This project demonstrates:

- HTML Page Structure
- CSS Layout & Responsive Design
- JavaScript DOM Manipulation
- Event Handling
- LocalStorage
- Shopping Cart Logic
- Client-side Form Validation

---

## 📸 Screenshots

> Add screenshots here after completing the project.

```
Home Page
Product Detail
Shopping Cart
Checkout
Invoice
```

---

## 🚀 Future Improvements

- Product Images
- User Login & Registration
- Wishlist
- Order History
- Product Reviews
- Dark Mode
- Search Suggestions
- Responsive Mobile Navigation

---

## 📚 Course Information

**Project:** Midterm Group Project

### Requirements

- ✅ Server-Side Rendering (SSR)
- ✅ Home / Catalog
- ✅ Product Detail
- ✅ Add to Cart
- ✅ Shopping Cart
- ✅ Checkout
- ✅ Invoice (.html)
- ✅ 10 Sample Products
- ✅ Hosting (Domain/IP)
- ✅ Public GitHub Repository

---

## 👨‍💻 Developed By

**Group Project**

Frontend Development using:

- HTML5
- CSS3
- JavaScript

---

## 📄 License

This project was created for educational purposes only.