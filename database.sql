-- Profiles Table
CREATE TABLE profiles (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    date_of_birth DATE,
    address TEXT,
    phone_number VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Authentication Providers Table
CREATE TABLE authentication_providers (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- User Authentication Table
CREATE TABLE user_authentication (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE,
    password VARCHAR(255),
    profile_id INT NOT NULL,
    provider_id INT,
    provider_user_id VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (profile_id) REFERENCES profiles(id),
    FOREIGN KEY (provider_id) REFERENCES authentication_providers(id),
    UNIQUE (provider_id, provider_user_id)
);

-- Tenant Apps Table
CREATE TABLE tenant_apps (
    id SERIAL PRIMARY KEY,
    tenant_user_id INT NOT NULL,
    is_enabled BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (tenant_user_id) REFERENCES profiles(id)
);

-- Subscriptions Table
CREATE TABLE subscriptions (
    id SERIAL PRIMARY KEY,
    tenant_app_id INT NOT NULL,
    start_date TIMESTAMP NOT NULL,
    end_date TIMESTAMP NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    FOREIGN KEY (tenant_app_id) REFERENCES tenant_apps(id)
);

-- Subscription Payments Table
CREATE TABLE subscription_payments (
    id SERIAL PRIMARY KEY,
    subscription_id INT NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    payment_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    payment_method VARCHAR(50) NOT NULL,
    status VARCHAR(20) NOT NULL,
    transaction_id VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (subscription_id) REFERENCES subscriptions(id)
);

-- Subscription Invoices Table
CREATE TABLE subscription_invoices (
    id SERIAL PRIMARY KEY,
    subscription_id INT NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    invoice_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    due_date DATE NOT NULL,
    status VARCHAR(20) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (subscription_id) REFERENCES subscriptions(id)
);

-- Places Table
CREATE TABLE places (
    id SERIAL PRIMARY KEY,
    tenant_app_id INT NOT NULL,
    client_user_id INT,
    address TEXT NOT NULL,
    FOREIGN KEY (tenant_app_id) REFERENCES tenant_apps(id),
    FOREIGN KEY (client_user_id) REFERENCES profiles(id)
);

-- Recurrence Patterns Table
CREATE TABLE recurrence_patterns (
    id SERIAL PRIMARY KEY,
    tenant_app_id INT NOT NULL,
    pattern_type VARCHAR(50) NOT NULL CHECK (pattern_type IN ('DAILY', 'WEEKLY', 'MONTHLY', 'YEARLY')),
    interval INT NOT NULL,
    day_of_week INT,
    day_of_month INT,
    month_of_year INT,
    FOREIGN KEY (tenant_app_id) REFERENCES tenant_apps(id)
);

-- Jobs Table
CREATE TABLE jobs (
    id SERIAL PRIMARY KEY,
    tenant_app_id INT NOT NULL,
    place_id INT NOT NULL,
    start_date_time TIMESTAMP NOT NULL,
    end_date_time TIMESTAMP NOT NULL,
    status VARCHAR(50) NOT NULL CHECK (status IN ('QUOTE', 'BOOKED', 'ONGOING', 'COMPLETED')),
    recurrence_pattern_id INT,
    log JSONB DEFAULT '[]',
    FOREIGN KEY (tenant_app_id) REFERENCES tenant_apps(id),
    FOREIGN KEY (place_id) REFERENCES places(id),
    FOREIGN KEY (recurrence_pattern_id) REFERENCES recurrence_patterns(id)
);

-- Job Payments Table
CREATE TABLE job_payments (
    id SERIAL PRIMARY KEY,
    job_id INT NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    fee DECIMAL(10, 2),
    net_amount DECIMAL(10, 2),
    payment_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    payment_method VARCHAR(50) NOT NULL,
    status VARCHAR(20) NOT NULL,
    transaction_id VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (job_id) REFERENCES jobs(id)
);

-- Job Invoices Table
CREATE TABLE job_invoices (
    id SERIAL PRIMARY KEY,
    job_id INT NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    invoice_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    due_date DATE NOT NULL,
    status VARCHAR(20) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (job_id) REFERENCES jobs(id)
);

-- Notes Table
CREATE TABLE notes (
    id SERIAL PRIMARY KEY,
    job_id INT NOT NULL,
    note_text TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (job_id) REFERENCES jobs(id)
);

-- Tasks Table
CREATE TABLE tasks (
    id SERIAL PRIMARY KEY,
    tenant_app_id INT NOT NULL,
    assigned_user_id INT,
    author_user_id INT NOT NULL,
    description TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    metadata JSONB,
    FOREIGN KEY (tenant_app_id) REFERENCES tenant_apps(id),
    FOREIGN KEY (assigned_user_id) REFERENCES profiles(id),
    FOREIGN KEY (author_user_id) REFERENCES profiles(id)
);

-- Tenant Users Table
CREATE TABLE tenant_users (
    id SERIAL PRIMARY KEY,
    profile_id INT NOT NULL,
    tenant_app_id INT NOT NULL,
    FOREIGN KEY (profile_id) REFERENCES profiles(id),
    FOREIGN KEY (tenant_app_id) REFERENCES tenant_apps(id)
);

-- Admin Users Table
CREATE TABLE admin_users (
    id SERIAL PRIMARY KEY,
    profile_id INT NOT NULL,
    tenant_app_id INT NOT NULL,
    FOREIGN KEY (profile_id) REFERENCES profiles(id),
    FOREIGN KEY (tenant_app_id) REFERENCES tenant_apps(id)
);

-- Staff Users Table
CREATE TABLE staff_users (
    id SERIAL PRIMARY KEY,
    profile_id INT NOT NULL,
    tenant_app_id INT NOT NULL,
    FOREIGN KEY (profile_id) REFERENCES profiles(id),
    FOREIGN KEY (tenant_app_id) REFERENCES tenant_apps(id)
);

-- Client Users Table
CREATE TABLE client_users (
    id SERIAL PRIMARY KEY,
    profile_id INT NOT NULL,
    tenant_app_id INT NOT NULL,
    FOREIGN KEY (profile_id) REFERENCES profiles(id),
    FOREIGN KEY (tenant_app_id) REFERENCES tenant_apps(id)
);

-- Super Admin Users Table
CREATE TABLE super_admin_users (
    id SERIAL PRIMARY KEY,
    profile_id INT NOT NULL,
    FOREIGN KEY (profile_id) REFERENCES profiles(id)
);
