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

-- 2. Brands Table
CREATE TABLE Brands (
    brand_id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    image VARCHAR(255) NOT NULL
);

-- 3. Vehicles Table
CREATE TABLE Vehicles (
    vehicle_id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    owner_id INT UNSIGNED NOT NULL,
    name VARCHAR(100) NOT NULL, 
    type ENUM('Supercar', 'Sedan', 'Sport', 'SUV', 'Hatchback', 'Convertible', 'Coupe', 'Wagon', 'Truck', 'Van', 'Electric') NOT NULL,
    price DECIMAL(10, 2) NOT NULL, 
    last_price DECIMAL(10, 2),
    first_img VARCHAR(255) NOT NULL,
    second_img VARCHAR(255) NOT NULL,
    third_img VARCHAR(255) NOT NULL,
    type_gas ENUM('Diesel', 'Petrol', 'Electric', 'Hybrid') NOT NULL,
    gas_capacity VARCHAR(20) NOT NULL,
    gear ENUM('Automatic', 'Manual') NOT NULL,
    passengers INT NOT NULL,
    availability_status BOOLEAN DEFAULT TRUE,
    location VARCHAR(100) NOT NULL,
    brand_id INT UNSIGNED,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (owner_id) REFERENCES Users(user_id) ON DELETE CASCADE
);

-- Add the foreign keys separately
ALTER TABLE Vehicles 
ADD CONSTRAINT FK_brand FOREIGN KEY (brand_id) REFERENCES Brands(brand_id) ON DELETE SET NULL;

-- 4. Reservations Table
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

-- 5. Payments Table
CREATE TABLE Payments (
    payment_id INT AUTO_INCREMENT PRIMARY KEY,
    reservation_id INT UNSIGNED NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    payment_method ENUM('Credit Card', 'PayPal', 'Stripe') NOT NULL,
    status ENUM('Pending', 'Completed', 'Failed') DEFAULT 'Pending',
    payment_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (reservation_id) REFERENCES Reservations(reservation_id) ON DELETE CASCADE
);

-- 6. Notifications Table
CREATE TABLE Notifications (
    notification_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT UNSIGNED NOT NULL,
    message TEXT NOT NULL,
    status ENUM('Unread', 'Read') DEFAULT 'Unread',
    sent_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE
);

-- 7. Reviews Table
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

-- 8. Historique Table
CREATE TABLE Historique (
    historique_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT UNSIGNED NOT NULL,
    action_type ENUM('Reservation Created', 'Reservation Cancelled', 'Payment Made', 'Vehicle Status Updated') NOT NULL,
    related_id INT,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    details TEXT,
    FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE
);

-- 9. Popular Cars Table
CREATE TABLE PopularCars (
    popular_id INT AUTO_INCREMENT PRIMARY KEY,
    vehicle_id INT UNSIGNED NOT NULL,
    popularity_score INT NOT NULL DEFAULT 0,
    FOREIGN KEY (vehicle_id) REFERENCES Vehicles(vehicle_id) ON DELETE CASCADE
);

-- 10. Recommended Cars Table
CREATE TABLE RecommendedCars (
    recommended_id INT AUTO_INCREMENT PRIMARY KEY,
    vehicle_id INT UNSIGNED NOT NULL,
    recommendation_reason VARCHAR(255) DEFAULT 'Top Pick',
    FOREIGN KEY (vehicle_id) REFERENCES Vehicles(vehicle_id) ON DELETE CASCADE
);

-- 11. Recent Cars Table
CREATE TABLE RecentCars (
    recent_id INT AUTO_INCREMENT PRIMARY KEY,
    vehicle_id INT UNSIGNED NOT NULL,
    added_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (vehicle_id) REFERENCES Vehicles(vehicle_id) ON DELETE CASCADE
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


-- Brands :

INSERT INTO Brands (name, image)
VALUES 
('BMW', '/Brands/BMW.svg'),
('Honda', '/Brands/Honda.png'),
('Hyundai', '/Brands/Hyundai.png'),
('Kia', '/Brands/Kia.png'),
('Land Rover', '/Brands/LandRover.png'),
('Mahindra', '/Brands/Mahindra.png'),
('Maruti Suzuki', '/Brands/MarutiSuzuki.png'),
('MG', '/Brands/MG.png'),
('Tata', '/Brands/Tata.png'),
('Toyota', '/Brands/Toyota.png');

-- Vehicles :

INSERT INTO Vehicles (owner_id, name, type, price, last_price, first_img, second_img, third_img, type_gas, gas_capacity, gear, passengers, availability_status, location, brand_id)
VALUES
(1, 'BMW 3 Series Gran Limousine', 'Sedan', 500.00, NULL, '/Cars/BMW 3 Series Gran Limousine/outside.jpg', '/Cars/BMW 3 Series Gran Limousine/inside-1.jpg', '/Cars/BMW 3 Series Gran Limousine/inside-2.jpg', 'Petrol', '50L', 'Automatic', 5, 1, 'Casablanca', (SELECT brand_id FROM Brands WHERE name = 'BMW')),
(1, 'BMW M340i', 'Sport', 1200.00, NULL, '/Cars/BMW M340i/outside.jpg', '/Cars/BMW M340i/inside-1.jpg', '/Cars/BMW M340i/inside-2.jpg', 'Petrol', '60L', 'Manual', 4, 1, 'Rabat', (SELECT brand_id FROM Brands WHERE name = 'BMW')),
(2, 'Honda City', 'Sedan', 2000.00, 1800.00, '/Cars/Honda City/outside.jpg', '/Cars/Honda City/inside-1.jpg', '/Cars/Honda City/inside-2.jpg', 'Electric', '100kWh', 'Automatic', 5, 1, 'Marrakech', (SELECT brand_id FROM Brands WHERE name = 'Honda')),
(2, 'Hyundai Aura', 'Sedan', 1200.00, NULL, '/Cars/Hyundai Aura/outside.jpg', '/Cars/Hyundai Aura/inside-1.jpg', '/Cars/Hyundai Aura/inside-2.jpg', 'Petrol', '60L', 'Manual', 5, 1, 'Tangier', (SELECT brand_id FROM Brands WHERE name = 'Hyundai')),
(3, 'Hyundai Creta', 'SUV', 2500.00, 2300.00, '/Cars/Hyundai Creta/outside.jpg', '/Cars/Hyundai Creta/inside-1.jpg', '/Cars/Hyundai Creta/inside-2.jpg', 'Diesel', '90L', 'Automatic', 5, 1, 'Agadir', (SELECT brand_id FROM Brands WHERE name = 'Hyundai')),
(3, 'Hyundai i20', 'Hatchback', 600.00, NULL, '/Cars/Hyundai i20/outside.jpg', '/Cars/Hyundai i20/inside-1.jpg', '/Cars/Hyundai i20/inside-2.jpg', 'Petrol', '50L', 'Manual', 5, 1, 'Fez', (SELECT brand_id FROM Brands WHERE name = 'Hyundai')),
(4, 'Kia Carnival', 'Van', 1500.00, NULL, '/Cars/Kia Carnival/outside.jpg', '/Cars/Kia Carnival/inside-1.jpg', '/Cars/Kia Carnival/inside-2.jpg', 'Diesel', '70L', 'Manual', 12, 1, 'Casablanca', (SELECT brand_id FROM Brands WHERE name = 'Kia')),
(4, 'Kia Sonet', 'SUV', 2000.00, 1900.00, '/Cars/Kia Sonet/outside.jpg', '/Cars/Kia Sonet/inside-1.jpg', '/Cars/Kia Sonet/inside-2.jpg', 'Diesel', '85L', 'Automatic', 7, 1, 'Rabat', (SELECT brand_id FROM Brands WHERE name = 'Kia')),
(1, 'Land Rover Range Rover', 'SUV', 800.00, 750.00, '/Cars/Land Rover Range Rover/outside.jpg', '/Cars/Land Rover Range Rover/inside-1.jpg', '/Cars/Land Rover Range Rover/inside-2.jpg', 'Diesel', '65L', 'Automatic', 5, 1, 'Fez', (SELECT brand_id FROM Brands WHERE name = 'Land Rover')),
(1, 'Mahindra Scorpio', 'SUV', 600.00, 550.00, '/Cars/Mahindra Scorpio/outside.jpg', '/Cars/Mahindra Scorpio/inside-1.jpg', '/Cars/Mahindra Scorpio/inside-2.jpg', 'Petrol', '45L', 'Manual', 5, 1, 'Tangier', (SELECT brand_id FROM Brands WHERE name = 'Mahindra')),
(2, 'Maruti Suzuki Dzire', 'Sedan', 1700.00, NULL, '/Cars/Maruti Suzuki Dzire/outside.jpg', '/Cars/Maruti Suzuki Dzire/inside-1.jpg', '/Cars/Maruti Suzuki Dzire/inside-2.jpg', 'Petrol', '70L', 'Manual', 5, 1, 'Marrakech', (SELECT brand_id FROM Brands WHERE name = 'Maruti Suzuki')),
(2, 'Maruti Suzuki Grand Vitara', 'SUV', 2000.00, 1800.00, '/Cars/Maruti Suzuki Grand Vitara/outside.jpg', '/Cars/Maruti Suzuki Grand Vitara/inside-1.jpg', '/Cars/Maruti Suzuki Grand Vitara/inside-2.jpg', 'Diesel', '90L', 'Automatic', 7, 1, 'Agadir', (SELECT brand_id FROM Brands WHERE name = 'Maruti Suzuki')),
(3, 'Maruti Suzuki Swift', 'Hatchback', 450.00, NULL, '/Cars/Maruti Suzuki Swift/outside.jpg', '/Cars/Maruti Suzuki Swift/inside-1.jpg', '/Cars/Maruti Suzuki Swift/inside-2.jpg', 'Petrol', '40L', 'Automatic', 5, 1, 'Casablanca', (SELECT brand_id FROM Brands WHERE name = 'Maruti Suzuki')),
(3, 'Maruti Suzuki XL6', 'SUV', 1500.00, 1400.00, '/Cars/Maruti Suzuki XL6/outside.jpg', '/Cars/Maruti Suzuki XL6/inside-1.jpg', '/Cars/Maruti Suzuki XL6/inside-2.jpg', 'Diesel', '100L', 'Automatic', 5, 1, 'Rabat', (SELECT brand_id FROM Brands WHERE name = 'Maruti Suzuki')),
(4, 'MG Hector', 'SUV', 10000.00, NULL, '/Cars/MG Hector/outside.jpg', '/Cars/MG Hector/inside-1.jpg', '/Cars/MG Hector/inside-2.jpg', 'Petrol', '75L', 'Automatic', 2, 1, 'Marrakech', (SELECT brand_id FROM Brands WHERE name = 'MG')),
(4, 'Tata Curvv', 'SUV', 550.00, NULL, '/Cars/Tata Curvv/outside.jpg', '/Cars/Tata Curvv/inside-1.jpg', '/Cars/Tata Curvv/inside-2.jpg', 'Petrol', '45L', 'Automatic', 5, 1, 'Oujda', (SELECT brand_id FROM Brands WHERE name = 'Tata')),
(1, 'Tata Nexon', 'SUV', 800.00, 750.00, '/Cars/Tata Nexon/outside.jpg', '/Cars/Tata Nexon/inside-1.jpg', '/Cars/Tata Nexon/inside-2.jpg', 'Diesel', '65L', 'Automatic', 5, 1, 'Fez', (SELECT brand_id FROM Brands WHERE name = 'Tata')),
(1, 'Tata Tiago EV', 'Electric', 12000.00, NULL, '/Cars/Tata Tiago EV/outside.jpg', '/Cars/Tata Tiago EV/inside-1.jpg', '/Cars/Tata Tiago EV/inside-2.jpg', 'Electric', '70kwh', 'Automatic', 2, 1, 'Casablanca', (SELECT brand_id FROM Brands WHERE name = 'Tata')),
(2, 'Toyota Fortuner Legender', 'SUV', 2500.00, NULL, '/Cars/Toyota Fortuner Legender/outside.png', '/Cars/Toyota Fortuner Legender/inside-1.jpg', '/Cars/Toyota Fortuner Legender/inside-2.jpg', 'Diesel', '85L', 'Automatic', 5, 1, 'Marrakech', (SELECT brand_id FROM Brands WHERE name = 'Toyota')),
(2, 'Toyota Glanza', 'Sedan', 900.00, NULL, '/Cars/Toyota Glanza/outside.jpg', '/Cars/Toyota Glanza/inside-1.jpg', '/Cars/Toyota Glanza/inside-2.jpg', 'Petrol', '55L', 'Automatic', 5, 1, 'Tangier', (SELECT brand_id FROM Brands WHERE name = 'Toyota'));

-- PopularCars :

INSERT INTO PopularCars (vehicle_id, popularity_score)
VALUES
(1, 95), -- BMW 3 Series Gran Limousine
(3, 90), -- Honda City
(5, 85), -- Hyundai Creta
(8, 80), -- Kia Sonet
(13, 75), -- Maruti Suzuki XL6
(20, 70); -- Toyota Fortuner Legender

-- RecommendedCars :

INSERT INTO RecommendedCars (vehicle_id, recommendation_reason)
VALUES
(2, 'Sporty Performance'), -- BMW M340i
(4, 'Eco-Friendly Choice'), -- Hyundai Aura
(7, 'Family Van'), -- Kia Carnival
(10, 'Affordable SUV'), -- Mahindra Scorpio
(15, 'High Mileage'), -- Maruti Suzuki Swift
(19, 'Premium Electric Vehicle'); -- Tata Tiago EV

-- RecentCars :

INSERT INTO RecentCars (vehicle_id, added_date)
VALUES
(6, '2024-11-20 10:30:00'), -- Hyundai i20
(9, '2024-11-21 15:45:00'), -- Land Rover Range Rover
(12, '2024-11-19 14:00:00'), -- Maruti Suzuki Dzire
(14, '2024-11-22 08:20:00'), -- MG Hector
(17, '2024-11-22 09:00:00'), -- Tata Nexon
(18, '2024-11-22 12:10:00'); -- Tata Tiago EV
