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
('Mohamed Ibaali', 'Ibaali', 'Male', '30 Rue Fes, Tangier, Morocco', 'GH123987', '0601234567', 'ibaali@example.com', '$2y$10$SLBE1jAJRPqtMWQJS40lOODvuQDmae64EN/VcVZoGWSweDVxxJLdu', 'Admin'),

('Guest', 'Guest', 'Male', '30 Rue Fes, Guest, Morocco', 'G120007', '0609244961', 'guest@example.com', '$2y$10$GmQ7n2OWXzcv1KT2.HrdCui47WTeVre.sY/jTP5fmhXEB4qHh2NGe', 'Client');

-- Passwords :

-- ('Bouzouggar', 'abdelhak@example.com', 'hashedpassword123');
-- ('Ettahiri', 'abdessamad@example.com', 'hashedpassword456');
-- ('Kribi', 'karim.kribi@example.com', 'hashedpassword789');
-- ('Ibaali', 'ibaali@example.com', 'hashedpassword101');

-- ('Guest', 'guest@example.com', 'hashedpassword102');

-- Vehicles :

INSERT INTO Vehicles (owner_id, name, type, price, last_price, img, type_gas, gas_capacity, gear, passengers, availability_status, location)
VALUES 
(1, 'Lamborghini Aventador', 'Supercar', 15000.00, NULL, 'aventador.jpg', 'Petrol', '80L', 'Automatic', 2, TRUE, 'Casablanca'),
(1, 'Toyota Corolla', 'Sedan', 500.00, NULL, 'corolla.jpg', 'Petrol', '50L', 'Automatic', 5, TRUE, 'Rabat'),
(2, 'Tesla Model S', 'Sedan', 2000.00, 1800.00, 'model_s.jpg', 'Electric', '100kWh', 'Automatic', 5, TRUE, 'Marrakech'),
(2, 'Ford Mustang', 'Coupe', 1200.00, NULL, 'mustang.jpg', 'Petrol', '60L', 'Manual', 4, TRUE, 'Tangier'),
(3, 'Porsche Cayenne', 'SUV', 2500.00, 2300.00, 'cayenne.jpg', 'Diesel', '90L', 'Automatic', 5, TRUE, 'Agadir'),
(3, 'Volkswagen Golf', 'Hatchback', 600.00, NULL, 'golf.jpg', 'Petrol', '50L', 'Manual', 5, TRUE, 'Fez'),
(4, 'Chevrolet Camaro', 'Sport', 1000.00, NULL, 'camaro.jpg', 'Petrol', '60L', 'Automatic', 4, TRUE, 'Oujda'),
(4, 'BMW X5', 'SUV', 2000.00, 1900.00, 'x5.jpg', 'Diesel', '85L', 'Automatic', 7, TRUE, 'Rabat'),
(1, 'Mercedes-Benz Sprinter', 'Van', 1500.00, NULL, 'sprinter.jpg', 'Diesel', '70L', 'Manual', 12, TRUE, 'Casablanca'),
(1, 'Honda Civic', 'Sedan', 600.00, 550.00, 'civic.jpg', 'Petrol', '45L', 'Manual', 5, TRUE, 'Tangier'),
(2, 'Jeep Wrangler', 'SUV', 1700.00, NULL, 'wrangler.jpg', 'Petrol', '70L', 'Manual', 5, TRUE, 'Marrakech'),
(2, 'Nissan Patrol', 'SUV', 2000.00, 1800.00, 'patrol.jpg', 'Diesel', '90L', 'Automatic', 7, TRUE, 'Agadir'),
(3, 'Toyota Yaris', 'Hatchback', 450.00, NULL, 'yaris.jpg', 'Petrol', '40L', 'Automatic', 5, TRUE, 'Casablanca'),
(3, 'Ford F-150', 'Truck', 1500.00, 1400.00, 'f150.jpg', 'Diesel', '100L', 'Automatic', 5, TRUE, 'Rabat'),
(4, 'Audi R8', 'Supercar', 10000.00, NULL, 'r8.jpg', 'Petrol', '75L', 'Automatic', 2, TRUE, 'Marrakech'),
(4, 'Hyundai Elantra', 'Sedan', 550.00, NULL, 'elantra.jpg', 'Petrol', '45L', 'Automatic', 5, TRUE, 'Oujda'),
(1, 'Kia Sportage', 'SUV', 800.00, 750.00, 'sportage.jpg', 'Diesel', '65L', 'Automatic', 5, TRUE, 'Fez'),
(1, 'Ferrari 488 Spider', 'Convertible', 12000.00, NULL, '488_spider.jpg', 'Petrol', '70L', 'Automatic', 2, TRUE, 'Casablanca'),
(2, 'Range Rover Velar', 'SUV', 2500.00, NULL, 'velar.jpg', 'Diesel', '85L', 'Automatic', 5, TRUE, 'Marrakech'),
(2, 'Mazda CX-5', 'SUV', 900.00, NULL, 'cx5.jpg', 'Petrol', '55L', 'Automatic', 5, TRUE, 'Tangier');
