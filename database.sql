CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    user_type VARCHAR(50) NOT NULL,
    profile_id INT,
    FOREIGN KEY (profile_id) REFERENCES profiles(id)
);

CREATE TABLE profiles (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    date_of_birth DATE,
    address TEXT,
    phone_number VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE tenant_apps (
    id SERIAL PRIMARY KEY,
    tenant_user_id INT NOT NULL,
    is_enabled BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (tenant_user_id) REFERENCES users(id)
);

CREATE TABLE subscriptions (
    id SERIAL PRIMARY KEY,
    tenant_app_id INT NOT NULL,
    start_date TIMESTAMP NOT NULL,
    end_date TIMESTAMP NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    FOREIGN KEY (tenant_app_id) REFERENCES tenant_apps(id)
);

CREATE TABLE tenant_calendars (
    id SERIAL PRIMARY KEY,
    tenant_app_id INT NOT NULL,
    FOREIGN KEY (tenant_app_id) REFERENCES tenant_apps(id)
);

CREATE TABLE tenant_calendar_events (
    id SERIAL PRIMARY KEY,
    start_date_time INT NOT NULL,
    end_date_time INT NOT NULL,
    description TEXT,
    tenant_calendar_id INT NOT NULL,
    FOREIGN KEY (tenant_calendar_id) REFERENCES tenant_calendars(id)
);

CREATE TABLE tenant_client_locations (
    id SERIAL PRIMARY KEY,
    tenant_app_id INT NOT NULL,
    client_user_id INT NOT NULL,
    address TEXT NOT NULL,
    FOREIGN KEY (tenant_app_id) REFERENCES tenant_apps(id),
    FOREIGN KEY (client_user_id) REFERENCES users(id)
);

CREATE TABLE tenant_jobs (
    id SERIAL PRIMARY KEY,
    tenant_app_id INT NOT NULL,
    tenant_client_location_id INT NOT NULL,
    FOREIGN KEY (tenant_app_id) REFERENCES tenant_apps(id),
    FOREIGN KEY (tenant_client_location_id) REFERENCES tenant_client_locations(id)
);

CREATE TABLE jobs_locations (
    job_id INT NOT NULL,
    tenant_client_location_id INT NOT NULL,
    PRIMARY KEY (job_id, tenant_client_location_id),
    FOREIGN KEY (job_id) REFERENCES tenant_jobs(id),
    FOREIGN KEY (tenant_client_location_id) REFERENCES tenant_client_locations(id)
);

-- Additional tables for user roles in tenant_app

CREATE TABLE admin_users (
    user_id INT NOT NULL,
    tenant_app_id INT NOT NULL,
    PRIMARY KEY (user_id, tenant_app_id),
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (tenant_app_id) REFERENCES tenant_apps(id)
);

CREATE TABLE team_member_users (
    user_id INT NOT NULL,
    tenant_app_id INT NOT NULL,
    PRIMARY KEY (user_id, tenant_app_id),
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (tenant_app_id) REFERENCES tenant_apps(id)
);

CREATE TABLE client_users (
    user_id INT NOT NULL,
    tenant_app_id INT NOT NULL,
    PRIMARY KEY (user_id, tenant_app_id),
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (tenant_app_id) REFERENCES tenant_apps(id)
);

CREATE TABLE super_admin_users (
    user_id INT NOT NULL,
    PRIMARY KEY (user_id),
    FOREIGN KEY (user_id) REFERENCES users(id)
);
