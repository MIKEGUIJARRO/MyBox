
# sudo mysql -u root -p
# https://devhints.io/mysql
# https://www.mysqltutorial.org/mysql-cheat-sheet.aspx/
# DESCRIBE TABLE

# https://www.bennadel.com/blog/2913-using-the-insert-into-set-syntax-in-mysql.htm


CREATE DATABASE database_packages;

USE database_packages;

# Table Users
CREATE TABLE Users(
    id INT(11) NOT NULL AUTO_INCREMENT,
    username VARCHAR(16) NOT NULL,
    password VARCHAR(60) NOT NULL,
    fullname VARCHAR(100) NOT NULL,
    PRIMARY KEY (id)
);

# Table Trucks
CREATE TABLE Trucks(
    plate VARCHAR(10) NOT NULL,
    model VARCHAR(25) NOT NULL,
    type VARCHAR(25) NOT NULL,
    tire_size VARCHAR(20) NOT NULL,
    PRIMARY KEY (plate)
);

# Table State
CREATE TABLE States (
    id INT(11) NOT NULL AUTO_INCREMENT,
    name VARCHAR(30) NOT NULL,
    PRIMARY KEY (id)
);

# Add column to State
ALTER TABLE States
ADD abbreviation VARCHAR(2) NOT NULL AFTER name;

# Table Drivers
CREATE TABLE Drivers(
    id INT(11) NOT NULL AUTO_INCREMENT,
    identification VARCHAR(50) NOT NULL,
    first_name VARCHAR(15) NOT NULL,
    last_name1 VARCHAR(15) NOT NULL,
    last_name2 VARCHAR(15) NOT NULL,
    phone VARCHAR(10) NOT NULL,
    address VARCHAR(25) NOT NULL,
    salary FLOAT(12) NOT NULL,
    state_id_residence INT(11) NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (state_id_residence) REFERENCES States (id)
);

# Alter table address varchar(100)
ALTER TABLE Drivers MODIFY address VARCHAR(50);
ALTER TABLE Drivers MODIFY first_name VARCHAR(50);


# Table TruckSchedules
CREATE TABLE TruckSchedules(
    id INT(11) NOT NULL AUTO_INCREMENT,
    start_date DATE NOT NULL,
    finish_date DATE NOT NULL,
    truck_plate VARCHAR(10) NOT NULL,
    driver_id INT(11) NOT NULL,
    user_id INT(11) NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (truck_plate) REFERENCES Trucks(plate),
    FOREIGN KEY (driver_id) REFERENCES Drivers(id),
    FOREIGN KEY (user_id) REFERENCES Users(id)
);

# Table Packages
CREATE TABLE Packages(
    id INT(11) NOT NULL AUTO_INCREMENT,
    description VARCHAR(150) NOT NULL,  
    recipient_first_name VARCHAR(15) NOT NULL,
    recipient_last_name1 VARCHAR(15) NOT NULL,
    recipient_last_name2 VARCHAR(15) NOT NULL,
    recipient_address VARCHAR(50) NOT NULL,
    sender_first_name VARCHAR(15) NOT NULL,
    sender_last_name1 VARCHAR(15) NOT NULL,
    sender_last_name2 VARCHAR(15) NOT NULL,
    sender_address VARCHAR(50) NOT NULL,
    state_id_recipient INT(11) NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (state_id_recipient) REFERENCES States (id)
);

# Table Delivery
CREATE TABLE Deliveries(
    id INT(11) NOT NULL AUTO_INCREMENT,
    package_ids JSON NOT NULL,
    PRIMARY KEY (id)
);

# ADD the states to the DB
# https://www.drupal.org/node/2559555
INSERT INTO States (name, abbreviation) VALUES 
('Aguascalientes', 'AG'),
('Baja California', 'BC'),
('Baja California Sur', 'BS'),
('Chihuahua', 'CH'),
('Colima', 'CL'),
('Campeche', 'CM'),
('Coahuila', 'CO'),
('Chiapas', 'CS'),
('Federal District', 'DF'),
('Durango', 'DG'),
('Guerrero', 'GR'),
('Guanajuato', 'GT'),
('Hidalgo', 'HG'),
('Jalisco', 'JA'),
('México State', 'ME'),
('Michoacán', 'MI'),
('Morelos', 'MO'),
('Nayarit', 'NA'),
('Nuevo León', 'NL'),
('Oaxaca', 'OA'),
('Puebla', 'PB'),
('Querétaro', 'QE'),
('Quintana Roo', 'QR'),
('Sinaloa', 'SI'),
('San Luis Potosí', 'SL'),
('Sonora', 'SO'),
('Tabasco', 'TB'),
('Tlaxcala', 'TL'),
('Tamaulipas', 'TM'),
('Veracruz', 'VE'),
('Yucatán', 'YU'),
('Zacatecas', 'ZA');

