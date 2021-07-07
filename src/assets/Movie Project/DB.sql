CREATE DATABASE MovieDB;
GO
USE MovieDB;
GO
CREATE TABLE Users
(Id            INT IDENTITY(1, 1) PRIMARY KEY, 
 Name          VARCHAR(100), 
 email         VARCHAR(100), 
 password      VARCHAR(50), 
 PhotoFileName VARCHAR(500)
);
GO
CREATE TABLE LikedMovies
(Id      INT IDENTITY(1, 1) PRIMARY KEY, 
 UserId  INT FOREIGN KEY REFERENCES Users(Id), 
 MovieId VARCHAR(200)
);
INSERT INTO Users
VALUES
('Oliver Arias', 
 'oliverarias12@gmail.com', 
 '0000', 
 'anonymous.png'
);
GO
INSERT INTO LikedMovies
VALUES
(1, 
 'tt3480822'
);
GO
SELECT *
FROM Users;
GO
SELECT *
FROM LikedMovies;