CREATE DATABASE IF NOT EXISTS adoption-app;

USE adoption_app;

-- Disable foreign key checks
SET FOREIGN_KEY_CHECKS = 0;

CREATE TABLE IF NOT EXISTS Users (
user_id int NOT NULL AUTO_INCREMENT,
user_name varchar(30) NOT NULL,
password varchar(100) NOT NULL,
user_role int,
PRIMARY KEY (user_id),
FOREIGN KEY (user_role) REFERENCES UserRoles(role_id)
ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS UserRoles (
role_id int NOT NULL AUTO_INCREMENT,
role_desc varchar(30) NOT NULL,
PRIMARY KEY (role_id)
);

CREATE TABLE IF NOT EXISTS Animals (
animal_id int NOT NULL AUTO_INCREMENT,
animal_name varchar(50) NOT NULL,
listed_by int,
matched_with int,
species int,
breed int,
availability int,
photo varchar(100),
animal_sex char(1),
age int,
date datetime,
description varchar(500),
PRIMARY KEY (animal_id),
FOREIGN KEY (listed_by) REFERENCES Users(user_id)
ON DELETE SET NULL,
FOREIGN KEY (matched_with) REFERENCES Users(user_id)
ON DELETE SET NULL,
FOREIGN KEY (species) REFERENCES Species(species_id)
ON DELETE SET NULL,
FOREIGN KEY (breed) REFERENCES Breeds(breed_id)
ON DELETE SET NULL,
FOREIGN KEY (availability) REFERENCES Availability(avail_id)
ON DELETE SET NULL,
FOREIGN KEY (disposition) REFERENCES Dispositions(disp_id)
ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS AnimalDispositions (
animal_id int,
disposition_id int,
FOREIGN KEY (animal_id) REFERENCES Animals(animal_id)
ON DELETE SET NULL,
FOREIGN KEY (disposition_id) REFERENCES Dispositions(disp_id)
ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS Availability (
avail_id int NOT NULL AUTO_INCREMENT,
avail_desc varchar(50) NOT NULL,
PRIMARY KEY (avail_id)
);

CREATE TABLE IF NOT EXISTS Species (
species_id int NOT NULL AUTO_INCREMENT,
species_desc varchar(50) NOT NULL,
PRIMARY KEY (species_id)
);

CREATE TABLE IF NOT EXISTS Breeds (
breed_id int NOT NULL AUTO_INCREMENT,
breed_desc varchar(50) NOT NULL,
PRIMARY KEY (breed_id)
);

CREATE TABLE IF NOT EXISTS Dispositions (
disp_id int NOT NULL AUTO_INCREMENT,
disp_desc varchar(50) NOT NULL,
PRIMARY KEY (disp_id)
);

-- Enable foreign key checks
SET FOREIGN_KEY_CHECKS = 1;