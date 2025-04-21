-- Asegurarse de que la base de datos existe
SELECT 'CREATE DATABASE nodo_nexus_db'
WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'nodo_nexus_db')\gexec

-- Conectarse a la base de datos
\c nodo_nexus_db

-- Crear la tabla si no existe
CREATE TABLE IF NOT EXISTS users (
    email VARCHAR(255) PRIMARY KEY,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(20) NOT NULL,
    reset_token VARCHAR(255),
    last_reset_request TIMESTAMP,
    primer_nombre VARCHAR(50) NOT NULL,
    segundo_nombre VARCHAR(50),
    primer_apellido VARCHAR(50) NOT NULL,
    segundo_apellido VARCHAR(50),
    tipo_identidad VARCHAR(20) NOT NULL,
    numero_identidad VARCHAR(20) NOT NULL,
    telefono VARCHAR(20),
    fecha_registro TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    ultimo_acceso TIMESTAMP,
    activo BOOLEAN NOT NULL DEFAULT TRUE,
    profile_image VARCHAR(255),
    banner_profile_image VARCHAR(255)
);

-- Insertar usuarios iniciales si no existen
INSERT INTO users (
    email, password, role, 
    primer_nombre, primer_apellido,
    tipo_identidad, numero_identidad
) VALUES
('admin@nodonexus.com', '$2a$12$ZvUNngbYMnWjrDM6D7FNBOh.ouVxcTmbwrKKsHT1SI.Y0Xdys1hmu', 'ADMIN', 
 'Admin', 'Nexus',
 'CC', '9876543210')
ON CONFLICT (email) DO NOTHING;


INSERT INTO users (
    email, password, role, 
    primer_nombre, primer_apellido,
    tipo_identidad, numero_identidad
) VALUES
('analista@nodonexus.com', '$2a$12$lwwGe9cVHOt6e/dKZRdUn.4UQanTMnDGKymnyLoXCzLIGYtgr9nxS', 'ANALYST', 
 'Analista', 'Primero',
 'CC', '987654321')
ON CONFLICT (email) DO NOTHING;
