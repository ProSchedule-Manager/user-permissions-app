-- https://sqlflow.gudusoft.com/#/

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
    FOREIGN KEY (tenant_user_id) REFERENCES tenant_users(id)
);

CREATE TABLE subscriptions (
    id SERIAL PRIMARY KEY,
    tenant_app_id INT NOT NULL,
    start_date TIMESTAMP NOT NULL,
    end_date TIMESTAMP NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    FOREIGN KEY (tenant_app_id) REFERENCES tenant_apps(id)
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
    start_date_time TIMESTAMP NOT NULL,
    end_date_time TIMESTAMP NOT NULL,
    status VARCHAR(50) NOT NULL CHECK (status IN ('QUOTE', 'BOOKED', 'ONGOING', 'COMPLETED')),
    FOREIGN KEY (tenant_app_id) REFERENCES tenant_apps(id),
    FOREIGN KEY (tenant_client_location_id) REFERENCES tenant_client_locations(id)
);

CREATE TABLE notes (
    id SERIAL PRIMARY KEY,
    tenant_job_id INT NOT NULL,
    note_text TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (tenant_job_id) REFERENCES tenant_jobs(id)
);

CREATE TABLE tasks (
    id SERIAL PRIMARY KEY,
    tenant_app_id INT NOT NULL,
    assigned_user_id INT,
    author_user_id INT NOT NULL,
    description TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (tenant_app_id) REFERENCES tenant_apps(id),
    FOREIGN KEY (assigned_user_id) REFERENCES users(id),
    FOREIGN KEY (author_user_id) REFERENCES users(id)
);

CREATE TABLE jobs_locations (
    job_id INT NOT NULL,
    tenant_client_location_id INT NOT NULL,
    PRIMARY KEY (job_id, tenant_client_location_id),
    FOREIGN KEY (job_id) REFERENCES tenant_jobs(id),
    FOREIGN KEY (tenant_client_location_id) REFERENCES tenant_client_locations(id)
);

-- Additional tables for user roles in tenant_app

CREATE TABLE tenant_users (
    user_id INT NOT NULL,
    tenant_app_id INT NOT NULL,
    PRIMARY KEY (user_id, tenant_app_id),
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (tenant_app_id) REFERENCES tenant_apps(id)
);

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
);


CREATE TABLE super_admin_users (
    user_id INT NOT NULL,
    PRIMARY KEY (user_id),
    FOREIGN KEY (user_id) REFERENCES users(id)
);
