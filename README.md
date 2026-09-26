# addis-eats
# 🍴 Addis Eats

**Addis Eats** is a modern food delivery web application built with React. Users can browse Ethiopian dishes, search and filter the menu, manage their cart, place orders, save favorites, and view their order history.

The project also includes an **Admin Dashboard** for managing dishes, customers, and orders.

## ✨ Features

### 👤 Customer

* User registration and login
* Browse food menu
* Search dishes
* Filter dishes by category
* View dish details
* Add dishes to cart
* Increase/decrease cart quantities
* Remove items from cart
* Favorite dishes
* View favorite dishes
* Checkout with form validation
* Place orders
* View order confirmation
* View previous orders
* Light/Dark theme toggle

### 🛠️ Admin Dashboard

* Admin authentication
* Dashboard statistics
* View customers
* View orders
* Update order status
* View menu dishes
* Activate/deactivate dishes
* Manage menu availability

## 🧰 Technologies

* **React**
* **React Router**
* **Zustand**
* **JavaScript**
* **HTML5**
* **CSS3**
* **Vite**
* **LocalStorage**
* **Lucide React**

## 📁 Project Structure

```text
addis-eats/
├── public/
│   ├── images/
│   ├── menu-data.json
│   └── _redirects
│
├── src/
│   ├── admin/
|   ├── api/
│   ├── assets/
│   ├── auth/
│   ├── cart/
│   ├── checkout/
│   ├── favourite/
│   ├── header/
│   ├── hooks/
│   ├── menu/
│   ├── orders/
│   ├── pages/
│   ├── store/
│   ├── theme/
│   ├── ui/
│   ├── App.jsx
│   └── main.jsx
│
├── package.json
├── vite.config.js
└── README.md
```

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/YOUR-USERNAME/addis-eats.git
```

### 2. Open the project

```bash
cd addis-eats
```

### 3. Install dependencies

```bash
npm install
```

### 4. Start the development server

```bash
npm run dev
```

The application will be available at the local URL provided by Vite.

## 🏗️ Build for Production

To create a production build:

```bash
npm run build
```

To preview the production build:

```bash
npm run preview
```

## 🛒 State Management

The shopping cart is managed using **Zustand**.

Cart data includes:

* Items
* Quantity
* Price
* Total
* Add item
* Remove item
* Increase quantity
* Decrease quantity
* Clear cart

Zustand persistence is used where appropriate to keep cart information available after page refreshes.

## 💾 Data Storage

This project currently uses browser **LocalStorage** for application data such as:

* Users
* Orders
* Cart
* Favorites
* Menu changes

This makes the project suitable for demonstration and learning purposes. A production version would use a backend API and database for persistent multi-user data.


## 📸 Project Preview

Add screenshots of the project here:

```text
Home Page
Menu Page
Cart
Checkout
Admin Dashboard
```

## 🎯 Project Goals

The main goals of Addis Eats are to practice and demonstrate:

* React component development
* React Router
* State management with Zustand
* Form validation
* Authentication concepts
* LocalStorage
* Responsive UI design
* Admin dashboard development
* Frontend project organization
* Deployment with Netlify

## 👨‍💻 Developer

**Amanual Ewunetu**

Computer Science Graduate
Full Stack Developer

### Skills

* React
* JavaScript
* HTML
* CSS
* Python
* MySQL
* UI Development

## 📄 License

This project is created for educational and portfolio purposes.
