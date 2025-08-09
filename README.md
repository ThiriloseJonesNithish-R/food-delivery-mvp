# 🍔 Food Delivery MVP

A minimal MERN stack food delivery application with menu browsing, ordering, and "My Orders" history.

---

## 📸 Screenshots

*(Add screenshots here)*
![Menu Page](https://github.com/ThiriloseJonesNithish-R/food-delivery-mvp/blob/eaf0ca466f8b59a6d8b885364633b6eeb8f87f56/Screenshots/Menu.png)

![Order History](https://github.com/ThiriloseJonesNithish-R/food-delivery-mvp/blob/eaf0ca466f8b59a6d8b885364633b6eeb8f87f56/Screenshots/Orders.png)

---

## 🚀 Features
- 📜 View food menu
- 🛒 Place orders
- 📦 View your order history (newest first)
- 🔐 User authentication (JWT-based)
- 🎨 Minimal, clean UI

---

## 🛠 Tech Stack
**Frontend:** React.js, CSS  
**Backend:** Node.js, Express.js  
**Database:** MongoDB Atlas  
**Auth:** JWT (JSON Web Tokens)

---

## 📂 Project Structure
```

FOOD DELIVERY MVP
├── food-delivery-backend/
│   ├── models/           # MongoDB schemas (MenuItem, Order, User)
│   ├── routes/           # Express routes (auth.js, menuRoutes.js, orderRoutes.js)
│   ├── server.js         # Express app entry point
│   ├── .env              # Environment variables
│   └── package.json      # Backend dependencies
│
└── food-delivery-frontend/
    ├── src/
    │   ├── components/   # React components (Menu, Cart, etc.)
    │   ├── App.jsx       # Main app file
    │   └── main.jsx      # React entry point
    ├── .env              # Frontend env vars
    └── package.json      # Frontend dependencies

````

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/ThiriloseJonesNithish-R/food-delivery-mvp.git
cd food-delivery-mvp
````

### 2️⃣ Backend Setup

```bash
cd backend
npm install
```

* Create a `.env` file inside `backend/` with:

```env
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret_key
```

* Start the backend:

```bash
npm start
```

### 3️⃣ Frontend Setup

```bash
cd ../frontend
npm install
```

* Start the frontend:

```bash
npm start
```

---

## 📜 License

This project is licensed under the [MIT License](LICENSE).

---

## ⭐ Contribute

If you like this project, consider giving it a ⭐ on GitHub!
