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
    second_phone_number VARCHAR(20) UNIQUE DEFAULT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    second_email VARCHAR(100) UNIQUE DEFAULT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role ENUM('Client', 'Admin') NOT NULL,
    verification_token VARCHAR(255) DEFAULT NULL,
    email_verified TINYINT(1) DEFAULT 0,
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
    description TEXT,
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
    payment_method ENUM('Credit Card', 'PayPal') NOT NULL,
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

-- 12. PasswordResets Table
CREATE TABLE PasswordResets (
    id INT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(255) NOT NULL,
    token VARCHAR(255) NOT NULL,
    expires_at DATETIME NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 13. ClientMessages Table
CREATE TABLE ClientMessages (
    message_id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    user_id INT UNSIGNED NOT NULL,
    subject VARCHAR(255) NOT NULL,
    message_content TEXT NOT NULL,
    status ENUM('Unread', 'Read', 'Replied') DEFAULT 'Unread',
    sent_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Add the foreign key separately
ALTER TABLE ClientMessages
    ADD CONSTRAINT FK_client_message_user FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE;

-- 14. Favorites Table
CREATE TABLE Favorites (
    favorite_id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    user_id INT UNSIGNED NOT NULL,
    vehicle_id INT UNSIGNED NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (user_id, vehicle_id)
);

-- Add foreign key constraints separately
ALTER TABLE Favorites
    ADD CONSTRAINT FK_favorites_user FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE,
    ADD CONSTRAINT FK_favorites_vehicle FOREIGN KEY (vehicle_id) REFERENCES Vehicles(vehicle_id) ON DELETE CASCADE;

-- Insert

-- HashedPasswords :

INSERT INTO Users (full_name, nick_name, gender, address, cin, phone_number, second_phone_number, email, second_email, password_hash, role)
VALUES 
('Bouzouggar Abdelhak', 'Bouzouggar', 'Male', '10 Rue Al-Madina, Casablanca, Morocco', 'AB123456', '0123456789', '0987654321', 'abdelhak.bouzougar321@gmail.com', 'abdelhak.secondary@email.com', '$2y$10$2Oi7ey5QSw9zjYMiGR2SF.bezA309oBKTL785zO/.A5dUfL15k6F2', 'Admin'),
('Ettahiri Abdessamad', 'Ettahiri', 'Male', '25 Avenue Hassan II, Rabat, Morocco', 'CD654321', '0987654321', NULL, 'abdessamad@example.com', NULL, '$2y$10$k90r/3O/PigtT4UIHDuOfOW5n1vEtD5J7LkmWG4IbIZSgDNKgJLrW', 'Admin'),
('Mohamed Karim Kribi', 'Kribi', 'Male', '12 Boulevard Mohammed V, Marrakech, Morocco', 'EF987654', '0654321987', NULL, 'karim.kribi@example.com', NULL, '$2y$10$hX3G9h5YAkMDTHY0RHZHQOuHJaoLT1DhNjPJ52.iz4wcHkqrmRx9y', 'Admin'),
('Mohamed Ibaali', 'Ibaali', 'Male', '30 Rue Fes, Tangier, Morocco', 'GH123987', '0601234567', NULL, 'ibaali@example.com', NULL, '$2y$10$SLBE1jAJRPqtMWQJS40lOODvuQDmae64EN/VcVZoGWSweDVxxJLdu', 'Admin'),

('Guest', 'Guest', 'Male', '30 Rue Fes, Guest, Morocco', 'G120007', '0609244961', NULL, 'guest@example.com', NULL, '$2y$10$GmQ7n2OWXzcv1KT2.HrdCui47WTeVre.sY/jTP5fmhXEB4qHh2NGe', 'Client');

-- Passwords :

-- ('Bouzouggar', 'abdelhak.bouzougar321@gmail.com', 'hashedpassword123');
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

INSERT INTO Vehicles (owner_id, name, type, price, last_price, first_img, second_img, third_img, type_gas, gas_capacity, gear, passengers, availability_status, location, brand_id, description)
VALUES
(1, 'BMW 3 Series Gran Limousine', 'Sedan', 500.00, NULL, '/Cars/BMW 3 Series Gran Limousine/outside.jpg', '/Cars/BMW 3 Series Gran Limousine/inside-1.jpg', '/Cars/BMW 3 Series Gran Limousine/inside-2.jpg', 'Petrol', '50L', 'Automatic', 5, 1, 'Casablanca', (SELECT brand_id FROM Brands WHERE name = 'BMW'), 'A luxurious sedan that offers comfort and elegance with its spacious interior and smooth ride.'),
(1, 'BMW M340i', 'Sport', 1200.00, NULL, '/Cars/BMW M340i/outside.jpg', '/Cars/BMW M340i/inside-1.jpg', '/Cars/BMW M340i/inside-2.jpg', 'Petrol', '60L', 'Manual', 4, 1, 'Rabat', (SELECT brand_id FROM Brands WHERE name = 'BMW'), 'A sporty car with powerful performance, perfect for enthusiasts who enjoy a dynamic driving experience.'),
(2, 'Honda City', 'Sedan', 2000.00, 1800.00, '/Cars/Honda City/outside.jpg', '/Cars/Honda City/inside-1.jpg', '/Cars/Honda City/inside-2.jpg', 'Electric', '100kWh', 'Automatic', 5, 1, 'Marrakech', (SELECT brand_id FROM Brands WHERE name = 'Honda'), 'A sleek and efficient electric sedan offering modern technology and a smooth, quiet ride.'),
(2, 'Hyundai Aura', 'Sedan', 1200.00, NULL, '/Cars/Hyundai Aura/outside.jpg', '/Cars/Hyundai Aura/inside-1.jpg', '/Cars/Hyundai Aura/inside-2.jpg', 'Petrol', '60L', 'Manual', 5, 1, 'Tangier', (SELECT brand_id FROM Brands WHERE name = 'Hyundai'), 'A compact sedan ideal for city driving, with a stylish design and good fuel efficiency.'),
(3, 'Hyundai Creta', 'SUV', 2500.00, 2300.00, '/Cars/Hyundai Creta/outside.jpg', '/Cars/Hyundai Creta/inside-1.jpg', '/Cars/Hyundai Creta/inside-2.jpg', 'Diesel', '90L', 'Automatic', 5, 1, 'Agadir', (SELECT brand_id FROM Brands WHERE name = 'Hyundai'), 'A mid-size SUV with great off-road capabilities and a comfortable, spacious cabin.'),
(3, 'Hyundai i20', 'Hatchback', 600.00, NULL, '/Cars/Hyundai i20/outside.jpg', '/Cars/Hyundai i20/inside-1.jpg', '/Cars/Hyundai i20/inside-2.jpg', 'Petrol', '50L', 'Manual', 5, 1, 'Fez', (SELECT brand_id FROM Brands WHERE name = 'Hyundai'), 'A compact and efficient hatchback perfect for urban commuting with a modern design.'),
(4, 'Kia Carnival', 'Van', 1500.00, NULL, '/Cars/Kia Carnival/outside.jpg', '/Cars/Kia Carnival/inside-1.jpg', '/Cars/Kia Carnival/inside-2.jpg', 'Diesel', '70L', 'Manual', 12, 1, 'Casablanca', (SELECT brand_id FROM Brands WHERE name = 'Kia'), 'A spacious van designed for large families or groups, with ample room and comfort for long trips.'),
(4, 'Kia Sonet', 'SUV', 2000.00, 1900.00, '/Cars/Kia Sonet/outside.jpg', '/Cars/Kia Sonet/inside-1.jpg', '/Cars/Kia Sonet/inside-2.jpg', 'Diesel', '85L', 'Automatic', 7, 1, 'Rabat', (SELECT brand_id FROM Brands WHERE name = 'Kia'), 'A compact and stylish SUV with a sporty feel and plenty of room for passengers and cargo.'),
(1, 'Land Rover Range Rover', 'SUV', 800.00, 750.00, '/Cars/Land Rover Range Rover/outside.jpg', '/Cars/Land Rover Range Rover/inside-1.jpg', '/Cars/Land Rover Range Rover/inside-2.jpg', 'Diesel', '65L', 'Automatic', 5, 1, 'Fez', (SELECT brand_id FROM Brands WHERE name = 'Land Rover'), 'An iconic luxury SUV offering off-road capability, elegance, and cutting-edge technology.'),
(1, 'Mahindra Scorpio', 'SUV', 600.00, 550.00, '/Cars/Mahindra Scorpio/outside.jpg', '/Cars/Mahindra Scorpio/inside-1.jpg', '/Cars/Mahindra Scorpio/inside-2.jpg', 'Petrol', '45L', 'Manual', 5, 1, 'Tangier', (SELECT brand_id FROM Brands WHERE name = 'Mahindra'), 'A rugged SUV designed for both urban and off-road adventures, with a strong, bold design.'),
(2, 'Maruti Suzuki Dzire', 'Sedan', 1700.00, NULL, '/Cars/Maruti Suzuki Dzire/outside.jpg', '/Cars/Maruti Suzuki Dzire/inside-1.jpg', '/Cars/Maruti Suzuki Dzire/inside-2.jpg', 'Petrol', '70L', 'Manual', 5, 1, 'Marrakech', (SELECT brand_id FROM Brands WHERE name = 'Maruti Suzuki'), 'A practical and fuel-efficient sedan ideal for daily commuting and city driving.'),
(2, 'Maruti Suzuki Grand Vitara', 'SUV', 2000.00, 1800.00, '/Cars/Maruti Suzuki Grand Vitara/outside.jpg', '/Cars/Maruti Suzuki Grand Vitara/inside-1.jpg', '/Cars/Maruti Suzuki Grand Vitara/inside-2.jpg', 'Diesel', '90L', 'Automatic', 7, 1, 'Agadir', (SELECT brand_id FROM Brands WHERE name = 'Maruti Suzuki'), 'A versatile SUV with an elegant design, offering both city comfort and off-road prowess.'),
(3, 'Maruti Suzuki Swift', 'Hatchback', 450.00, NULL, '/Cars/Maruti Suzuki Swift/outside.jpg', '/Cars/Maruti Suzuki Swift/inside-1.jpg', '/Cars/Maruti Suzuki Swift/inside-2.jpg', 'Petrol', '40L', 'Automatic', 5, 1, 'Casablanca', (SELECT brand_id FROM Brands WHERE name = 'Maruti Suzuki'), 'A compact hatchback with a stylish look, offering excellent fuel efficiency and ease of driving.'),
(3, 'Maruti Suzuki XL6', 'SUV', 1500.00, 1400.00, '/Cars/Maruti Suzuki XL6/outside.jpg', '/Cars/Maruti Suzuki XL6/inside-1.jpg', '/Cars/Maruti Suzuki XL6/inside-2.jpg', 'Diesel', '100L', 'Automatic', 5, 1, 'Rabat', (SELECT brand_id FROM Brands WHERE name = 'Maruti Suzuki'), 'A family-friendly SUV offering comfort and versatility, perfect for longer road trips.'),
(4, 'MG Hector', 'SUV', 10000.00, NULL, '/Cars/MG Hector/outside.jpg', '/Cars/MG Hector/inside-1.jpg', '/Cars/MG Hector/inside-2.jpg', 'Petrol', '75L', 'Automatic', 2, 1, 'Marrakech', (SELECT brand_id FROM Brands WHERE name = 'MG'), 'A powerful SUV with an imposing presence, designed for those who crave both luxury and performance.'),
(4, 'Tata Curvv', 'SUV', 550.00, NULL, '/Cars/Tata Curvv/outside.jpg', '/Cars/Tata Curvv/inside-1.jpg', '/Cars/Tata Curvv/inside-2.jpg', 'Petrol', '45L', 'Automatic', 5, 1, 'Oujda', (SELECT brand_id FROM Brands WHERE name = 'Tata'), 'A modern SUV that blends sporty styling with practicality and comfort for daily drives.'),
(1, 'Tata Nexon', 'SUV', 800.00, 750.00, '/Cars/Tata Nexon/outside.jpg', '/Cars/Tata Nexon/inside-1.jpg', '/Cars/Tata Nexon/inside-2.jpg', 'Diesel', '65L', 'Automatic', 5, 1, 'Fez', (SELECT brand_id FROM Brands WHERE name = 'Tata'), 'A compact SUV designed for urban adventures, offering a combination of style and utility.'),
(1, 'Tata Tiago EV', 'Electric', 12000.00, NULL, '/Cars/Tata Tiago EV/outside.jpg', '/Cars/Tata Tiago EV/inside-1.jpg', '/Cars/Tata Tiago EV/inside-2.jpg', 'Electric', '50kWh', 'Automatic', 5, 1, 'Rabat', (SELECT brand_id FROM Brands WHERE name = 'Tata'), 'An eco-friendly electric car perfect for city commuting with impressive battery range and modern features.'),
(2, 'Toyota Fortuner Legender', 'SUV', 2500.00, NULL, '/Cars/Toyota Fortuner Legender/outside.png', '/Cars/Toyota Fortuner Legender/inside-1.jpg', '/Cars/Toyota Fortuner Legender/inside-2.jpg', 'Diesel', '85L', 'Automatic', 5, 1, 'Marrakech', (SELECT brand_id FROM Brands WHERE name = 'Toyota'), 'The Toyota Fortuner Legender is a premium, powerful SUV designed for both urban and off-road adventures. With its striking looks and advanced features, it provides ultimate comfort and performance.'),
(2, 'Toyota Glanza', 'Sedan', 900.00, NULL, '/Cars/Toyota Glanza/outside.jpg', '/Cars/Toyota Glanza/inside-1.jpg', '/Cars/Toyota Glanza/inside-2.jpg', 'Petrol', '55L', 'Automatic', 5, 1, 'Tangier', (SELECT brand_id FROM Brands WHERE name = 'Toyota'), 'The Toyota Glanza is a stylish and fuel-efficient sedan, offering a smooth ride with an intuitive infotainment system and ample space for passengers. A great choice for urban and highway drives.');

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

-- ClientMessages :

INSERT INTO ClientMessages (user_id, subject, message_content, status)
VALUES
(1, 'Account Issues', 'I am having trouble accessing my account, could you please help me reset my password?', 'Unread'),
(2, 'Payment Problems', 'I encountered an issue with the payment, could you help me resolve it?', 'Unread'),
(3, 'Vehicle Availability', 'I want to know if the Hyundai Creta is available for rent in the coming days.', 'Unread'),
(4, 'Reservation Questions', 'I have some questions regarding my upcoming reservation for the Kia Sonet.', 'Unread'),
(1, 'Suggestions or Feedback', 'I think it would be great if there were more options for electric vehicles in the fleet.', 'Unread'),
(2, 'Other Inquiries', 'Could you provide me with more details on the Mahindra Scorpio availability in Casablanca?', 'Unread');

-- Unread Notifications :

INSERT INTO Notifications (user_id, message, status)
VALUES
(1, 'You have a new car reservation request on DriveGo.', 'Unread'),
(1, 'Your DriveGo car rental has been successfully confirmed.', 'Unread'),
(1, 'Your DriveGo car rental has been extended by 2 hours.', 'Unread'),
(1, 'DriveGo has updated its terms and conditions. Please review them.', 'Unread'),
(1, 'You have 10 minutes left on your current DriveGo rental. Consider extending your time.', 'Unread');

-- Read Notifications :

INSERT INTO Notifications (user_id, message, status)
VALUES
(1, 'Your DriveGo account password was successfully updated.', 'Read'),
(1, 'Your DriveGo car rental ended successfully. Thank you for using DriveGo.', 'Read');

-- Test Reservation :

-- 1. Insert into reservations table
INSERT INTO Reservations (user_id, vehicle_id, start_date, end_date, status, total_price)
VALUES
(1, 1, '2024-12-15', '2024-12-20', 'Confirmed', 2500.00),
(2, 2, '2024-12-18', '2024-12-25', 'Pending', 8400.00),
(3, 3, '2024-12-22', '2024-12-26', 'Cancelled', 10000.00),
(4, 4, '2024-12-10', '2024-12-14', 'Completed', 4800.00),
(5, 5, '2024-12-15', '2024-12-16', 'Confirmed', 2500.00),
(1, 6, '2024-12-15', '2024-12-16', 'Pending', 600.00),
(2, 7, '2024-12-22', '2024-12-28', 'Cancelled', 10500.00),
(3, 8, '2024-12-20', '2024-12-23', 'Completed', 6000.00),
(4, 9, '2024-12-19', '2024-12-23', 'Confirmed', 4000.00),
(5, 10, '2024-12-24', '2024-12-26', 'Pending', 600.00);

-- 2. Update the availability_status in the vehicles table
UPDATE Vehicles
SET availability_status = CASE
    WHEN vehicle_id IN (SELECT vehicle_id FROM Reservations WHERE status = 'Confirmed') THEN false
    WHEN vehicle_id IN (SELECT vehicle_id FROM Reservations WHERE status = 'Cancelled') THEN true
    ELSE availability_status
END;

-- 3. Insert into payments table with payment method
INSERT INTO Payments (reservation_id, amount, payment_method, status)
VALUES
(1, 2500.00, 'Credit Card', 'Completed'),
(2, 8400.00, 'PayPal', 'Pending'),
(3, 10000.00, 'Credit Card', 'Failed'),
(4, 4800.00, 'PayPal', 'Completed'),
(5, 2500.00, 'Credit Card', 'Completed'),
(6, 600.00, 'PayPal', 'Pending'),
(7, 10500.00, 'Credit Card', 'Failed'),
(8, 6000.00, 'Credit Card', 'Completed'),
(9, 4000.00, 'PayPal', 'Completed'),
(10, 600.00, 'Credit Card', 'Pending');

-- 4. Insert into historique table
INSERT INTO Historique (user_id, action_type, related_id, details)
VALUES
(1, 'Reservation Created', 1, 'User created a reservation for BMW 3 Series Gran Limousine.'),
(2, 'Reservation Created', 2, 'User created a reservation for BMW M340i.'),
(3, 'Reservation Cancelled', 3, 'User cancelled the reservation for Hyundai Creta.'),
(4, 'Payment Made', 4, 'Payment of 4800.00 for reservation completed.'),
(5, 'Reservation Created', 5, 'User created a reservation for Kia Carnival.'),
(1, 'Vehicle Status Updated', 6, 'Availability status updated for Hyundai Aura.'),
(2, 'Reservation Cancelled', 7, 'User cancelled the reservation for Kia Sonet.'),
(3, 'Reservation Created', 8, 'User created a reservation for Land Rover Range Rover.'),
(4, 'Payment Made', 9, 'Payment of 4000.00 for reservation completed.'),
(5, 'Reservation Created', 10, 'User created a reservation for Tata Tiago EV.');

-- Triggers :

DELIMITER //

-- Trigger for 'Reservation Created'
CREATE TRIGGER after_reservation_created 
AFTER INSERT ON Reservations
FOR EACH ROW 
BEGIN
    INSERT INTO Historique (user_id, action_type, related_id, timestamp, details)
    VALUES (NEW.user_id, 'Reservation Created', NEW.reservation_id, NOW(), CONCAT('Reservation created for vehicle with ID: ', NEW.vehicle_id));
END//

-- Trigger for 'Reservation Cancelled'
CREATE TRIGGER after_reservation_cancelled 
AFTER UPDATE ON Reservations
FOR EACH ROW 
BEGIN
    IF OLD.status != 'Cancelled' AND NEW.status = 'Cancelled' THEN
        INSERT INTO Historique (user_id, action_type, related_id, timestamp, details)
        VALUES (NEW.user_id, 'Reservation Cancelled', NEW.reservation_id, NOW(), CONCAT('Reservation with ID: ', NEW.reservation_id, ' was cancelled.'));
    END IF;
END//

-- Trigger for 'Payment Made'
CREATE TRIGGER after_payment_made 
AFTER INSERT ON Payments
FOR EACH ROW 
BEGIN
    INSERT INTO Historique (user_id, action_type, related_id, timestamp, details)
    VALUES (NEW.reservation_id, 'Payment Made', NEW.payment_id, NOW(), CONCAT('Payment of ', NEW.amount, ' made for reservation ID: ', NEW.reservation_id));
END//

-- Trigger for 'Vehicle Status Updated'
CREATE TRIGGER after_vehicle_status_updated 
AFTER UPDATE ON Vehicles
FOR EACH ROW 
BEGIN
    IF OLD.availability_status != NEW.availability_status THEN
        INSERT INTO Historique (user_id, action_type, related_id, timestamp, details)
        VALUES (NEW.owner_id, 'Vehicle Status Updated', NEW.vehicle_id, NOW(), CONCAT('Vehicle with ID: ', NEW.vehicle_id, ' availability status updated to: ', NEW.availability_status));
    END IF;
END//

DELIMITER ;