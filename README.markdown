# NODO - NEXUS PROJECT

<p align="center">
  <img src="https://img.shields.io/badge/version-1.0.0-blue.svg" alt="Version">
  <img src="https://img.shields.io/badge/docker-ready-brightgreen.svg" alt="Docker Ready">
  <img src="https://img.shields.io/badge/license-MIT-green.svg" alt="License">
  <img src="https://img.shields.io/badge/status-active-success.svg" alt="Status">
</p>

## 📋 Descripción

**NodoNexus** es una plataforma innovadora diseñada por **NodoStudio** para transformar la gestión de proyectos de software. Inspirada en las metodologías ágiles, esta solución integra herramientas avanzadas para la planificación, ejecución y seguimiento de proyectos, promoviendo la colaboración efectiva y la entrega de resultados de alta calidad. 

Con un enfoque en la eficiencia y la experiencia del usuario, **NodoNexus** es el núcleo que conecta equipos, ideas y objetivos.

## ✨ Características Principales

### 🎯 **Gestión Intuitiva**
- Administra solicitudes, cotizaciones y avances de proyectos en un solo lugar
- Interfaz de usuario moderna y fácil de usar
- Dashboard centralizado para una visión completa del proyecto

### 🔔 **Notificaciones en Tiempo Real**
- Mantén al equipo informado con actualizaciones instantáneas
- Sistema de alertas personalizable
- Integración con canales de comunicación populares

### 📚 **Documentación Centralizada**
- Accede a análisis, modelos de datos y prototipos de diseño desde la plataforma
- Versionado automático de documentos
- Colaboración en tiempo real en documentos

### 🚀 **Despliegue Simplificado**
- Configuración lista para Docker con un solo comando
- Escalabilidad horizontal
- Compatibilidad con múltiples entornos

## 🛠️ Tecnologías Utilizadas

- **Frontend**: React.js + Redux (State Management)
- **Backend**: Java + Spring Boot
- **Base de Datos**: PostgreSQL
- **Contenedores**: Docker & Docker Compose
- **Metodologías**: Agile, Scrum

## 📦 Instalación

### Prerrequisitos

- Docker >= 20.10
- Docker Compose >= 2.0
- Java 11 o superior
- Node.js >= 16.0
- PostgreSQL >= 13
- Git

### Instalación Rápida

1. **Clona el repositorio:**
   ```bash
   git clone https://github.com/NodoStudioNexus/NODONEXUS-PROJECT.git
   cd NODONEXUS-PROJECT
   ```

2. **Ejecuta con Docker:**
   ```bash
   docker-compose up -d
   ```

3. **Accede a la aplicación:**
   - Frontend: `http://localhost:3000`
   - API: `http://localhost:8000`

### Instalación Manual

1. **Instala las dependencias:**
   ```bash
   # Para el frontend (React.js)
   cd frontend
   npm install
   
   # Para el backend (Spring Boot)
   cd ../backend
   ./mvnw install
   ```

2. **Configura la base de datos PostgreSQL:**
   ```sql
   CREATE DATABASE nodonexus;
   CREATE USER nodonexus_user WITH PASSWORD 'your_password';
   GRANT ALL PRIVILEGES ON DATABASE nodonexus TO nodonexus_user;
   ```

3. **Configura las variables de entorno:**
   ```bash
   cp .env.example .env
   # Edita las variables según tu configuración
   ```

4. **Ejecuta la aplicación:**
   ```bash
   # Terminal 1 - Backend (Spring Boot)
   cd backend
   ./mvnw spring-boot:run
   
   # Terminal 2 - Frontend (React + Redux)
   cd frontend
   npm start
   ```

## 🚀 Uso

### Primeros Pasos

1. **Registro de Usuario:**
   - Accede a la plataforma y crea tu cuenta
   - Configura tu perfil y preferencias

2. **Creación de Proyecto:**
   - Utiliza el asistente de creación de proyectos
   - Define objetivos, cronograma y equipo

3. **Gestión de Tareas:**
   - Asigna tareas a miembros del equipo
   - Establece prioridades y fechas límite
   - Monitorea el progreso en tiempo real

### Funcionalidades Clave

- **Dashboard de Proyectos**: Visualización completa del estado de todos los proyectos
- **Gestión de Equipos**: Administración de roles y permisos
- **Reportes Automáticos**: Generación de informes de progreso
- **Integración de APIs**: Conexión con herramientas externas

## 📁 Estructura del Proyecto

```
NODONEXUS-PROJECT/
├── frontend/                 # Aplicación React.js + Redux
│   ├── src/
│   │   ├── components/
│   │   ├── redux/
│   │   │   ├── store/
│   │   │   ├── slices/
│   │   │   └── actions/
│   │   ├── pages/
│   │   └── utils/
│   ├── public/
│   └── package.json
├── backend/                  # API Spring Boot
│   ├── src/
│   │   └── main/
│   │       ├── java/
│   │       │   └── com/nodostudio/nexus/
│   │       │       ├── controllers/
│   │       │       ├── services/
│   │       │       ├── repositories/
│   │       │       ├── models/
│   │       │       └── config/
│   │       └── resources/
│   │           └── application.properties
│   ├── pom.xml
│   └── mvnw
├── docker/                   # Configuración Docker
│   ├── Dockerfile.frontend
│   ├── Dockerfile.backend
│   └── docker-compose.yml
├── database/                 # Scripts PostgreSQL
│   ├── init.sql
│   └── migrations/
├── docs/                     # Documentación
│   ├── api/
│   └── user-manual/
├── tests/                    # Pruebas automatizadas
├── docker-compose.yml        # Configuración Docker Compose
└── README.md                # Este archivo
```

## 🔧 Configuración

### Variables de Entorno

```env
# Base de datos PostgreSQL
SPRING_DATASOURCE_URL=jdbc:postgresql://localhost:5432/nodonexus
SPRING_DATASOURCE_USERNAME=nodonexus_user
SPRING_DATASOURCE_PASSWORD=your_password

# Configuración de Spring Boot
SPRING_PROFILES_ACTIVE=dev
SERVER_PORT=8080
JWT_SECRET=your-jwt-secret-key

# Configuración de correo
SPRING_MAIL_HOST=smtp.gmail.com
SPRING_MAIL_PORT=587
SPRING_MAIL_USERNAME=your-email@gmail.com
SPRING_MAIL_PASSWORD=your-app-password

# Frontend React
REACT_APP_API_URL=http://localhost:8080/api
REACT_APP_ENVIRONMENT=development
```

### Configuración Docker

El proyecto incluye una configuración Docker completa para facilitar el despliegue:

```yaml
# docker-compose.yml
version: '3.8'
services:
  frontend:
    build: ./frontend
    ports:
      - "3000:3000"
  
  backend:
    build: ./backend
    ports:
      - "8000:8000"
    depends_on:
      - database
  
  database:
    image: postgres:13
    environment:
      POSTGRES_DB: nodonexus
      POSTGRES_USER: user
      POSTGRES_PASSWORD: password
```

## 🧪 Testing

### Ejecutar Pruebas

```bash
# Pruebas del backend (Spring Boot)
cd backend
./mvnw test

# Pruebas del frontend (React + Redux)
cd frontend
npm test

# Pruebas de integración
docker-compose -f docker-compose.test.yml up --abort-on-container-exit
```

### Cobertura de Código

```bash
# Generar reporte de cobertura (Backend)
cd backend
./mvnw jacoco:report

# Generar reporte de cobertura (Frontend)
cd frontend
npm run test -- --coverage
```

## 📖 Documentación

- **[Documentación de API](docs/api/README.md)**: Endpoints y ejemplos de uso
- **[Manual de Usuario](docs/user-manual/README.md)**: Guía completa para usuarios
- **[Guía de Contribución](CONTRIBUTING.md)**: Cómo contribuir al proyecto
- **[Changelog](CHANGELOG.md)**: Historial de cambios

## 🤝 Contribución

¡Las contribuciones son bienvenidas! Por favor, sigue estos pasos:

1. **Fork el proyecto**
2. **Crea una rama para tu feature** (`git checkout -b feature/AmazingFeature`)
3. **Commit tus cambios** (`git commit -m 'Add some AmazingFeature'`)
4. **Push a la rama** (`git push origin feature/AmazingFeature`)
5. **Abre un Pull Request**

### Guías de Contribución

- Sigue los estándares de código establecidos
- Asegúrate de que las pruebas pasen
- Documenta los cambios en el CHANGELOG
- Actualiza la documentación si es necesario

## 🐛 Reporte de Bugs

Si encuentras un bug, por favor:

1. Verifica que no esté ya reportado en [Issues](https://github.com/NodoStudioNexus/NODONEXUS-PROJECT/issues)
2. Crea un nuevo issue con:
   - Descripción detallada del problema
   - Pasos para reproducir el bug
   - Comportamiento esperado vs actual
   - Screenshots (si aplica)
   - Información del entorno

## 🔄 Roadmap

### Versión 1.1.0 (Próxima)
- [ ] Integración con herramientas de CI/CD
- [ ] Módulo de reportes avanzados
- [ ] API REST v2
- [ ] Soporte para múltiples idiomas

### Versión 1.2.0 (Futura)
- [ ] Aplicación móvil
- [ ] Integración con Slack/Teams
- [ ] Módulo de tiempo y facturación
- [ ] Dashboard personalizable

## 📄 Licencia

Este proyecto está licenciado bajo la **Licencia de Código Fuente Disponible (Source-Available License)**. 

**Términos de la Licencia:**
- ✅ **Permitido**: Ver, estudiar y hacer fork del código
- ✅ **Permitido**: Usar para fines educativos y de investigación
- ✅ **Permitido**: Contribuir con mejoras al proyecto original
- ❌ **Prohibido**: Uso comercial sin autorización explícita
- ❌ **Prohibido**: Redistribución del código modificado sin autorización
- ❌ **Prohibido**: Crear productos derivados para uso comercial

Para uso comercial o redistribución, contacta a: **info@nodostudio.com**

Consulta el archivo [LICENSE](LICENSE) para más detalles completos.

## 👥 Equipo

**Nodo Estudio**
- Website: [nodostudio.com](https://nodostudio.com.co)
- Email: dev.nodostudio@gmail.com

## 🙏 Agradecimientos

- A todos los contribuidores del proyecto
- A la comunidad open source
- A las herramientas y librerías utilizadas

---

<p align="center">
  Hecho con ❤️ por <a href="https://nodostudio.com.co">JOSE DANIEL ANACONA</a>
</p>

<p align="center">
  <a href="https://github.com/NodoStudioNexus/NODONEXUS-PROJECT/stargazers">⭐ ¡Dale una estrella si te gusta el proyecto!</a>
</p>
