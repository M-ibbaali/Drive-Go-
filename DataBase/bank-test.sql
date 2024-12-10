DROP DATABASE IF EXISTS BankTest;

CREATE DATABASE BankTest;
USE BankTest;

-- 1. Users table
CREATE TABLE Users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    phone VARCHAR(15) NOT NULL UNIQUE,
    cin VARCHAR(8) UNIQUE,
    CHECK (cin REGEXP '^[A-Z]{1,2}[0-9]{6}$')
);

-- 2. Accounts table
CREATE TABLE Accounts (
    account_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    account_number VARCHAR(20) UNIQUE NOT NULL,
    balance DECIMAL(10, 2) NOT NULL,
    currency VARCHAR(10) DEFAULT 'MAD',
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

-- 3. Transactions table
CREATE TABLE Transactions (
    transaction_id INT AUTO_INCREMENT PRIMARY KEY,
    account_id INT NOT NULL,
    transaction_type ENUM('credit', 'debit') NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    transaction_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status ENUM('success', 'failed', 'pending') DEFAULT 'success',
    FOREIGN KEY (account_id) REFERENCES Accounts(account_id)
);

-- 4. CreditCards table
CREATE TABLE CreditCards (
    card_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    card_number VARCHAR(16) UNIQUE NOT NULL,
    expiration_date VARCHAR(5) NOT NULL,
    card_holder VARCHAR(100) NOT NULL,
    cvc VARCHAR(3) NOT NULL,
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

-- Insert

-- Users
INSERT INTO Users (name, email, phone, cin) VALUES
('DriveGo', 'drivego@example.com', '0701234567', 'DG123456'),

('Bouzouggar Abdelhak', 'abdelhak.bouzougar321@gmail.com', '0123456789', 'AB123456'),
('Mohamed Ibaali', 'ibaali@example.com', '0601234567','GH123987'),
('Ettahiri Abdessamad', 'abdessamad@example.com', '0987654321', 'CD654321'),
('Mohamed Karim Kribi', 'karim.kribi@example.com', '0654321987', 'EF987654'),

('Ali El Amrani', 'ali.elamrani@gmail.com', '0612345678', 'AE123456'),
('Nadia Benjelloun', 'nadia.benjelloun@gmail.com', '0654321098', 'NB123456'),
('Rachid Alami', 'rachid.alami@example.com', '0676543210', 'RA123456'),
('Fatima Zahra', 'fatima.zahra@gmail.com', '0623456789', 'FZ123456'),
('Omar Boudour', 'omar.boudour@example.com', '0634567890', 'OB123456');

-- Accounts
INSERT INTO Accounts (user_id, account_number, balance) VALUES
(1, '222233334444', 00.00),
(2, '111122223333', 8000.00),
(3, '444455556666', 6000.00),
(4, '777788889999', 10000.00),
(5, '101010101010', 12000.00),
(6, '333344445555', 2000.00),
(7, '444455556677', 3500.00),
(8, '555566667788', 5000.00),
(9, '666677778899', 2500.00),
(10, '777788889900', 4000.00);

-- CreditCards

INSERT INTO CreditCards (user_id, card_number, expiration_date, card_holder, cvc) VALUES
(1, '5678901256789012', '01/28', 'DriveGo', '345'),
(2, '1234567812345678', '12/25', 'Bouzouggar Abdelhak', '123'),
(3, '2345678923456789', '11/24', 'Mohamed Ibaali', '456'),
(4, '3456789034567890', '08/26', 'Ettahiri Abdessamad', '789'),
(5, '4567890145678901', '07/23', 'Mohamed Karim Kribi', '012'),
(6, '6789012367890123', '03/25', 'Ali El Amrani', '678'),
(7, '7890123478901234', '09/27', 'Nadia Benjelloun', '901'),
(8, '8901234589012345', '02/24', 'Rachid Alami', '234'),
(9, '9012345690123456', '06/29', 'Fatima Zahra', '567'),
(10, '0123456701234567', '05/30', 'Omar Boudour', '890');
