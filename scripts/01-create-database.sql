-- Create the EduSathi database schema
CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username VARCHAR(50) UNIQUE NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    contact_number VARCHAR(10) NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_users_username ON users(username);
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);

-- Insert some sample data for testing
INSERT OR IGNORE INTO users (username, first_name, last_name, email, contact_number, password_hash) 
VALUES 
('testuser', 'Test', 'User', 'test@example.com', '9876543210', '$2b$10$rQZ9vKzqzQzqzQzqzQzqzOzQzqzQzqzQzqzQzqzQzqzQzqzQzqzQz');
