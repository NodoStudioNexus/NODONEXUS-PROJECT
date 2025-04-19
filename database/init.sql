-- Asegurar modo de SQL
SET SQL_MODE = "NO_ENGINE_SUBSTITUTION";
CREATE DATABASE IF NOT EXISTS nodo_nexus_db;
-- Usar la base de datos
USE nodo_nexus_db;

CREATE TABLE users (
    email VARCHAR(255) PRIMARY KEY,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(20) NOT NULL,
    reset_token VARCHAR(255),
    last_reset_request TIMESTAMP,
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL,
    telefono VARCHAR(20),
    fecha_registro TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    ultimo_acceso TIMESTAMP,
    activo BOOLEAN NOT NULL DEFAULT TRUE,
    profile_image VARCHAR(255)
);

-- Insertar usuarios iniciales
INSERT INTO users (email, password, role, nombre, apellido) VALUES
('admin@nodonexus.com', '$2a$10$N9qo8uLOickgx2ZMRZoMy.MrU1V7H/.B9dJw2L3JQ1Qz7tTfV7qG', 'ADMIN', 'Admin', 'Principal'),
('analista@nodonexus.com', '$2a$10$N9qo8uLOickgx2ZMRZoMy.MrU1V7H/.B9dJw2L3JQ1Qz7tTfV7qG', 'ANALYST', 'Analista', 'Primero');
