CREATE TABLE profiles
(
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    date_of_birth DATE,
    address TEXT,
    phone_number VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE authentication_providers
(
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE user_authentication
(
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

CREATE TABLE tenant_apps
(
    id SERIAL PRIMARY KEY,
    tenant_user_id INT NOT NULL,
    is_enabled BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (tenant_user_id) REFERENCES profiles(id)
);

CREATE TABLE subscriptions
(
    id SERIAL PRIMARY KEY,
    tenant_app_id INT NOT NULL,
    start_date TIMESTAMP NOT NULL,
    end_date TIMESTAMP NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    FOREIGN KEY (tenant_app_id) REFERENCES tenant_apps(id)
);

CREATE TABLE places
(
    id SERIAL PRIMARY KEY,
    tenant_app_id INT NOT NULL,
    client_user_id INT,
    address TEXT NOT NULL,
    FOREIGN KEY (tenant_app_id) REFERENCES tenant_apps(id),
    FOREIGN KEY (client_user_id) REFERENCES profiles(id)
);

CREATE TABLE recurrence_patterns
(
    id SERIAL PRIMARY KEY,
    tenant_app_id INT NOT NULL,
    pattern_type VARCHAR(50) NOT NULL CHECK (pattern_type IN ('DAILY', 'WEEKLY', 'MONTHLY', 'YEARLY')),
    interval INT NOT NULL,
    day_of_week INT,
    day_of_month INT,
    month_of_year INT,
    FOREIGN KEY (tenant_app_id) REFERENCES tenant_apps(id)
);

CREATE TABLE jobs
(
    id SERIAL PRIMARY KEY,
    tenant_app_id INT NOT NULL,
    place_id INT NOT NULL,
    start_date_time TIMESTAMP NOT NULL,
    end_date_time TIMESTAMP NOT NULL,
    status VARCHAR(50) NOT NULL CHECK (status IN ('QUOTE', 'BOOKED', 'ONGOING', 'COMPLETED')),
    recurrence_pattern_id INT,
    FOREIGN KEY (tenant_app_id) REFERENCES tenant_apps(id),
    FOREIGN KEY (place_id) REFERENCES places(id),
    FOREIGN KEY (recurrence_pattern_id) REFERENCES recurrence_patterns(id)
);

CREATE TABLE job_logs
(
    id SERIAL PRIMARY KEY,
    job_id INT NOT NULL,
    log JSONB NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (job_id) REFERENCES jobs(id)
);

CREATE TABLE notes
(
    id SERIAL PRIMARY KEY,
    job_id INT NOT NULL,
    note_text TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (job_id) REFERENCES jobs(id)
);

CREATE TABLE calendar_tasks
(
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

CREATE TABLE tenant_users
(
    id SERIAL PRIMARY KEY,
    profile_id INT NOT NULL,
    tenant_app_id INT NOT NULL,
    FOREIGN KEY (profile_id) REFERENCES profiles(id),
    FOREIGN KEY (tenant_app_id) REFERENCES tenant_apps(id)
);

CREATE TABLE admin_users
(
    id SERIAL PRIMARY KEY,
    profile_id INT NOT NULL,
    tenant_app_id INT NOT NULL,
    FOREIGN KEY (profile_id) REFERENCES profiles(id),
    FOREIGN KEY (tenant_app_id) REFERENCES tenant_apps(id)
);

CREATE TABLE staff_users
(
    id SERIAL PRIMARY KEY,
    profile_id INT NOT NULL,
    tenant_app_id INT NOT NULL,
    FOREIGN KEY (profile_id) REFERENCES profiles(id),
    FOREIGN KEY (tenant_app_id) REFERENCES tenant_apps(id)
);

CREATE TABLE client_users
(
    id SERIAL PRIMARY KEY,
    profile_id INT NOT NULL,
    tenant_app_id INT NOT NULL,
    FOREIGN KEY (profile_id) REFERENCES profiles(id),
    FOREIGN KEY (tenant_app_id) REFERENCES tenant_apps(id)
);

CREATE TABLE super_admin_users
(
    id SERIAL PRIMARY KEY,
    profile_id INT NOT NULL,
    FOREIGN KEY (profile_id) REFERENCES profiles(id)
);


CREATE TABLE services
(
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT
);

CREATE TABLE job_services
(
    job_id INT NOT NULL,
    service_id INT NOT NULL,
    PRIMARY KEY (job_id, service_id),
    FOREIGN KEY (job_id) REFERENCES jobs(id) ON DELETE CASCADE,
    FOREIGN KEY (service_id) REFERENCES services(id) ON DELETE CASCADE
);


CREATE TABLE service_tasks
(
    service_id INT NOT NULL,
    task_id INT NOT NULL,
    PRIMARY KEY (service_id, task_id),
    FOREIGN KEY (service_id) REFERENCES services(id) ON DELETE CASCADE,
    FOREIGN KEY (task_id) REFERENCES job_tasks(id) ON DELETE CASCADE
);

CREATE TABLE job_tasks
(
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT
);
