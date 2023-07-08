-- Create the TaskAppDB database
CREATE DATABASE TaskAppDB;

-- Switch to the TaskAppDB database
USE TaskAppDB;

-- Create the users table
CREATE TABLE users (
    user_id INT IDENTITY(1,1) PRIMARY KEY,
    username VARCHAR(50),
    email VARCHAR(100),
    password VARCHAR(MAX)
);
SELECT * FROM users;
-- Create the projects table
CREATE TABLE projects (
    projectId INT PRIMARY KEY IDENTITY,
    projectName VARCHAR(255),
    description VARCHAR(MAX),
    startDate DATE,
    endDate DATE,
    urgency VARCHAR(50),
    category VARCHAR(50),
    status VARCHAR(50)
);

-- Create the AssignedMembers table
CREATE TABLE AssignedMembers (
    id INT PRIMARY KEY IDENTITY,
    projectId INT,
    user_id INT,
    FOREIGN KEY (projectId) REFERENCES projects(projectId),
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);


SELECT
    p.projectId,
    p.projectName,
    p.description,
    p.startDate,
    p.endDate,
    p.urgency,
    p.category,
    p.status,
    u.user_id,
    u.username,
    u.email
FROM
    projects p
JOIN
    AssignedMembers am ON p.projectId = am.projectId
JOIN
    users u ON am.user_id = u.user_id;
