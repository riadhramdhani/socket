-- Drop the existing database (replace dbname with the name of your database)
DROP DATABASE  IF EXISTS nada; 

-- Create a new database with the same name
CREATE DATABASE nada;
USE nada; 
-- Table for user authentication
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL
);

-- Table for storing messages
CREATE TABLE messages (
  id SERIAL PRIMARY KEY,
  sender_id INTEGER REFERENCES users(id),
  recipient_id INTEGER REFERENCES users(id),
  message_text TEXT NOT NULL,
  sent_at TIMESTAMP DEFAULT NOW()
);