# 🛒 Amazon Clone Backend (`amazon-api`)

This folder contains the **backend API** for the Amazon Clone project, built with Node.js, Express, Prisma (SQLite for dev, Postgres for deployment), Stripe, and Firebase Admin for authentication.

---

## ✨ Features

- 🔐 User authentication with Firebase
- 🧾 Order creation & retrieval (with Stripe payment integration)
- 🗄️ SQLite (dev) / Postgres (prod) database via Prisma ORM
- 🔒 Secure endpoints (orders are user-specific)

---

## ⚡ Prerequisites

- 🟢 Node.js (v18+ recommended)
- 📦 npm (v9+ recommended)
- 🔥 Firebase project (for authentication)
- 💳 Stripe account (for payments)
- 🐘 [PostgreSQL](https://www.postgresql.org/) (for production/deployment)

---

## 🚀 Setup Instructions

### 1️⃣ Clone the Repository

```bash
git clone <your-repo-url>
cd Amazon-Clone-Frontend/amazon-api
```

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Environment Variables

Create a `.env` file in the `amazon-api` folder with the following:

```env
STRIPE_SECRET_KEY=sk_test_...
FIREBASE_SERVICE_ACCOUNT_KEY=./serviceAccountKey.json
# For SQLite (development):
DATABASE_URL="file:./dev.db"
# For Postgres (production):
# DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=public"
```

- `STRIPE_SECRET_KEY`: Your Stripe secret key
- `FIREBASE_SERVICE_ACCOUNT_KEY`: Path to your Firebase service account JSON file (download from Firebase Console > Project Settings > Service Accounts)
- `DATABASE_URL`: Connection string for your database (SQLite for dev, Postgres for prod)

### 4️⃣ Add Firebase Service Account

- Download your Firebase service account JSON file and place it in the `amazon-api` folder as `serviceAccountKey.json`.

### 5️⃣ Database Setup (Prisma)

- **Development (SQLite):**

  - The project uses SQLite for local development. The schema is defined in `prisma/schema.prisma`.
  - To set up the database and generate the Prisma client:

    ```bash
    npx prisma migrate dev --name init
    npx prisma generate
    ```

- **Production (Postgres):**

  - Update your `.env` and `prisma/schema.prisma` to use your Postgres `DATABASE_URL`.
  - Run:

    ```bash
    npx prisma migrate deploy
    npx prisma generate
    ```

### 6️⃣ Start the Backend Server

```bash
npm start
```

- The server will run on [http://localhost:5000](http://localhost:5000) by default.

---

## 📡 API Endpoints

- `POST /api/orders` — Create a new order (requires Firebase auth and Stripe payment)
- `GET /api/orders` — Get all orders for the authenticated user

---

## 🛠️ Development Tips

- 🧪 Use [Postman](https://www.postman.com/) or [Insomnia](https://insomnia.rest/) to test endpoints.
- 🕵️‍♂️ Use [Prisma Studio](https://www.prisma.io/studio) to view your DB:

```bash
npx prisma studio
```

---

## 📝 Environment Example

Create a `.env.example` file for reference:

```env
STRIPE_SECRET_KEY=sk_test_...
FIREBASE_SERVICE_ACCOUNT_KEY=./serviceAccountKey.json
DATABASE_URL="file:./dev.db" # or your Postgres connection string
```

---

## ❓ Need Help?

For any issues, check the logs in your terminal or open an issue in the repository.
