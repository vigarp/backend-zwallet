-- create database
CREATE DATABASE backend_zwallet;

-- create table users
CREATE TABLE users (id int NOT NULL, username VARCHAR(64), email VARCHAR(64), password VARCHAR(100), pincode VARCHAR(8), phone VARCHAR(16), picture VARCHAR(500) NOT NULL DEFAULT 'image.jpg', PRIMARY KEY (id));

-- create table wallets
CREATE TABLE wallets (id VARCHAR(12) NOT NULL, id_user INT NOT NULL, balance INT NOT NULL DEFAULT 0, PRIMARY KEY (id), KEY fk_wallets (id_user), CONSTRAINT fk_wallets FOREIGN KEY (id_user) REFERENCES users (id) ON DELETE CASCADE);

-- create table transactions
CREATE TABLE transactions (invoice VARCHAR(12) NOT NULL, id_sender INT, id_receiver INT, type VARCHAR(12), amount INT, created_at DATETIME, notes TEXT, PRIMARY KEY (invoice), KEY fk_transactions_sender (id_sender), KEY fk_transactions_receiver (id_receiver), CONSTRAINT fk_transactions_sender FOREIGN KEY (id_sender) REFERENCES users (id) ON DELETE CASCADE, CONSTRAINT fk_transactions_receiver FOREIGN KEY (id_receiver) REFERENCES users (id) ON DELETE CASCADE);

SELECT transactions.invoice, transactions.id_sender,transactions.id_receiver, IF(transactions.id_sender =446, u1.username, u2.username) as username,  IF(transactions.id_sender = 446, u1.picture, u2.picture) as picture, transactions.type, IF(transactions.type = 'Topup', 'Topup', IF(transactions.id_sender = 446, 'Transfer Out', 'Transfer In')) as type_detail, transactions.amount, transactions.notes, transactions.created_at FROM transactions LEFT JOIN users u1 ON (u1.id = transactions.id_receiver) LEFT JOIN users u2 ON (u2.id = transactions.id_sender) WHERE (id_sender=446 OR id_receiver=446);