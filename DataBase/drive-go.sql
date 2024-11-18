DROP DATABASE IF EXISTS DriveGo;

CREATE DATABASE DriveGo;
USE DriveGo;

-- 1. Users Table
CREATE TABLE Users (
    user_id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    nick_name VARCHAR(100),
    gender ENUM('Male', 'Female'),
    address VARCHAR(255),
    cin VARCHAR(8) UNIQUE,
    phone_number VARCHAR(20) UNIQUE,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role ENUM('Client', 'Admin') NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CHECK (cin REGEXP '^[A-Z]{1,2}[0-9]{6}$')
);

-- 2. Vehicles Table
CREATE TABLE Vehicles (
    vehicle_id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    owner_id INT UNSIGNED NOT NULL,
    name VARCHAR(100) NOT NULL, 
    type ENUM('Supercar', 'Sedan', 'Sport', 'SUV', 'Hatchback', 'Convertible', 'Coupe', 'Wagon', 'Truck', 'Van') NOT NULL,
    price DECIMAL(10, 2) NOT NULL, 
    last_price DECIMAL(10, 2),
    img VARCHAR(255) NOT NULL,
    type_gas ENUM('Diesel', 'Petrol', 'Electric', 'Hybrid') NOT NULL,
    gas_capacity VARCHAR(20) NOT NULL,
    gear ENUM('Automatic', 'Manual') NOT NULL,
    passengers INT NOT NULL,
    availability_status BOOLEAN DEFAULT TRUE,
    location VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (owner_id) REFERENCES Users(user_id) ON DELETE CASCADE
);

-- 3. Reservations Table
CREATE TABLE Reservations (
    reservation_id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    user_id INT UNSIGNED NULL,
    vehicle_id INT UNSIGNED NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    status ENUM('Pending', 'Confirmed', 'Completed', 'Cancelled') DEFAULT 'Pending',
    total_price DECIMAL(10, 2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Add the foreign keys separately
ALTER TABLE Reservations
    ADD CONSTRAINT FK_user FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE SET NULL,
    ADD CONSTRAINT FK_vehicle FOREIGN KEY (vehicle_id) REFERENCES Vehicles(vehicle_id) ON DELETE SET NULL;

-- 4. Payments Table
CREATE TABLE Payments (
    payment_id INT AUTO_INCREMENT PRIMARY KEY,
    reservation_id INT UNSIGNED NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    payment_method ENUM('Credit Card', 'PayPal', 'Stripe') NOT NULL,
    status ENUM('Pending', 'Completed', 'Failed') DEFAULT 'Pending',
    payment_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (reservation_id) REFERENCES Reservations(reservation_id) ON DELETE CASCADE
);

-- 5. Notifications Table
CREATE TABLE Notifications (
    notification_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT UNSIGNED NOT NULL,
    message TEXT NOT NULL,
    status ENUM('Unread', 'Read') DEFAULT 'Unread',
    sent_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE
);

-- 6. Reviews Table
CREATE TABLE Reviews (
    review_id INT AUTO_INCREMENT PRIMARY KEY,
    reservation_id INT UNSIGNED NOT NULL,
    user_id INT UNSIGNED NULL,
    rating INT CHECK (rating BETWEEN 1 AND 5),
    comment TEXT,
    review_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Add the foreign keys separately
ALTER TABLE Reviews
    ADD CONSTRAINT FK_review_reservation FOREIGN KEY (reservation_id) REFERENCES Reservations(reservation_id) ON DELETE CASCADE,
    ADD CONSTRAINT FK_review_user FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE SET NULL;

-- 7. Historique Table
CREATE TABLE Historique (
    historique_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT UNSIGNED NOT NULL,
    action_type ENUM('Reservation Created', 'Reservation Cancelled', 'Payment Made', 'Vehicle Status Updated') NOT NULL,
    related_id INT,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    details TEXT,
    FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE
);

-- Insert

-- HashedPasswords :

INSERT INTO Users (full_name, nick_name, gender, address, cin, phone_number, email, password_hash, role)
VALUES 
('Bouzouggar Abdelhak', 'Bouzouggar', 'Male', '10 Rue Al-Madina, Casablanca, Morocco', 'AB123456', '0123456789', 'abdelhak@example.com', '$2y$10$2Oi7ey5QSw9zjYMiGR2SF.bezA309oBKTL785zO/.A5dUfL15k6F2', 'Admin'),
('Ettahiri Abdessamad', 'Ettahiri', 'Male', '25 Avenue Hassan II, Rabat, Morocco', 'CD654321', '0987654321', 'abdessamad@example.com', '$2y$10$k90r/3O/PigtT4UIHDuOfOW5n1vEtD5J7LkmWG4IbIZSgDNKgJLrW', 'Admin'),
('Mohamed Karim Kribi', 'Kribi', 'Male', '12 Boulevard Mohammed V, Marrakech, Morocco', 'EF987654', '0654321987', 'karim.kribi@example.com', '$2y$10$hX3G9h5YAkMDTHY0RHZHQOuHJaoLT1DhNjPJ52.iz4wcHkqrmRx9y', 'Admin'),
('Mohamed Ibaali', 'Ibaali', 'Male', '30 Rue Fes, Tangier, Morocco', 'GH123987', '0601234567', 'ibaali@example.com', '$2y$10$SLBE1jAJRPqtMWQJS40lOODvuQDmae64EN/VcVZoGWSweDVxxJLdu', 'Admin');

-- Passwords :

-- ('Bouzouggar', 'abdelhak@example.com', 'hashedpassword123');
-- ('Ettahiri', 'abdessamad@example.com', 'hashedpassword456');
-- ('Kribi', 'karim.kribi@example.com', 'hashedpassword789');
-- ('Ibaali', 'ibaali@example.com', 'hashedpassword101');
