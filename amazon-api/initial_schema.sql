-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- Create User table
CREATE TABLE IF NOT EXISTS "User" (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255),
    password VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create Order table
CREATE TABLE IF NOT EXISTS "Order" (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "userId" UUID NOT NULL,
    total FLOAT NOT NULL,
    status VARCHAR(50) NOT NULL,
    address TEXT,
    discount FLOAT DEFAULT 0,
    "subTotal" FLOAT,
    "promoCode" VARCHAR(100),
    "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    CONSTRAINT fk_user FOREIGN KEY("userId") REFERENCES "User"(id) ON DELETE CASCADE
);

-- Create OrderItem table
CREATE TABLE IF NOT EXISTS "OrderItem" (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "orderId" UUID NOT NULL,
    "productId" VARCHAR(100) NOT NULL,
    title VARCHAR(500) NOT NULL,
    price FLOAT NOT NULL,
    quantity INTEGER NOT NULL,
    image TEXT,
    CONSTRAINT fk_order FOREIGN KEY("orderId") REFERENCES "Order"(id) ON DELETE CASCADE
);