-- Real Estate Database Initialization Script
USE RealEstateDb;

-- Create Users table
CREATE TABLE IF NOT EXISTS Users (
    Id INT AUTO_INCREMENT PRIMARY KEY,
    Email VARCHAR(255) NOT NULL UNIQUE,
    PasswordHash BLOB NOT NULL,
    PasswordSalt BLOB NOT NULL,
    INDEX idx_email (Email)
);

-- Create Properties table
CREATE TABLE IF NOT EXISTS Properties (
    Id INT AUTO_INCREMENT PRIMARY KEY,
    Title VARCHAR(255) NOT NULL,
    Address VARCHAR(500) NOT NULL,
    City VARCHAR(100),
    Suburb VARCHAR(100),
    Price DECIMAL(18,2) NOT NULL,
    ListingType VARCHAR(50) NOT NULL,
    Bedrooms INT NOT NULL,
    Bathrooms INT NOT NULL,
    CarSpots INT NOT NULL,
    Description TEXT NOT NULL,
    ImageUrls LONGTEXT,
    UserId INT NOT NULL,
    FOREIGN KEY (UserId) REFERENCES Users(Id) ON DELETE CASCADE,
    INDEX idx_listing_type (ListingType),
    INDEX idx_price (Price),
    INDEX idx_bedrooms (Bedrooms),
    INDEX idx_city (City),
    INDEX idx_suburb (Suburb),
    INDEX idx_user_id (UserId)
);

-- Create Favorites table
CREATE TABLE IF NOT EXISTS Favorites (
    UserId INT NOT NULL,
    PropertyId INT NOT NULL,
    PRIMARY KEY (UserId, PropertyId),
    FOREIGN KEY (UserId) REFERENCES Users(Id) ON DELETE CASCADE,
    FOREIGN KEY (PropertyId) REFERENCES Properties(Id) ON DELETE CASCADE
);

-- Create ViewedProperties table
CREATE TABLE IF NOT EXISTS ViewedProperties (
    Id INT AUTO_INCREMENT PRIMARY KEY,
    UserId INT NOT NULL,
    PropertyId INT NOT NULL,
    ViewedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (UserId) REFERENCES Users(Id) ON DELETE CASCADE,
    FOREIGN KEY (PropertyId) REFERENCES Properties(Id) ON DELETE CASCADE,
    INDEX idx_user_viewed (UserId, ViewedAt),
    INDEX idx_property_viewed (PropertyId, ViewedAt)
);

-- Create EF Core migrations history table
CREATE TABLE IF NOT EXISTS __EFMigrationsHistory (
    MigrationId VARCHAR(150) NOT NULL,
    ProductVersion VARCHAR(32) NOT NULL,
    PRIMARY KEY (MigrationId)
);

-- Insert initial migration record
INSERT IGNORE INTO __EFMigrationsHistory (MigrationId, ProductVersion) 
VALUES ('20250812000000_InitialCreate', '8.0.0');