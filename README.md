# 🍰 Proyecto Fullstack de Pastelería

## 📋 Propósito

Sistema web fullstack para la gestión integral de una pastelería, que permite a los clientes explorar productos, realizar compras y gestionar sus pedidos, mientras que los administradores pueden administrar el inventario, productos y usuarios de manera eficiente.

---

## 🛠️ Tecnologías Utilizadas

### **Frontend - React**
- **Framework principal:** React 18.3.1
- **Enrutamiento:** React Router DOM 6.26.2
- **Estilos:** Bootstrap 5.3.3
- **Peticiones HTTP:** Axios 1.13.2
- **Herramientas de desarrollo:**
  - Create React App (react-scripts 5.0.1)
  - CRACO 7.1.0 (configuración personalizada)
  - Jasmine 5.4.0 (testing)
- **Polyfills para Node.js en navegador:**
  - crypto-browserify
  - buffer
  - stream-browserify
  - process
  - assert

**Repositorio Frontend:** [Pasteleria_react](https://github.com/GenesisValdebenito/Pasteleria_react.git)

### **Backend - Spring Boot**
- **Framework:** Spring Boot 3.2.1
- **Lenguaje:** Java 17
- **Gestor de dependencias:** Maven
- **Base de datos:** MySQL
- **Dependencias principales:**
  - **Spring Boot Starter Data JPA** - Persistencia y ORM
  - **Spring Boot Starter Security** - Autenticación y autorización
  - **Spring Boot Starter Web** - API REST
  - **MySQL Connector J** - Conexión con base de datos MySQL
  - **Lombok** - Reducción de código boilerplate
  - **JWT (JSON Web Tokens):**
    - jjwt-api 0.11.5
    - jjwt-impl 0.11.5
    - jjwt-jackson 0.11.5
  - **SpringDoc OpenAPI** 2.5.0 - Documentación de API (Swagger)
  - **Spring Boot Starter Test** - Testing

**Repositorio Backend:** [pasteleria-SB](https://github.com/GenesisValdebenito/pasteleria-SB.git)

---

## ✨ Características Principales

### 🛒 **Carrito de Compras**
Sistema completo de carrito de compras que permite a los usuarios:
- Agregar productos con diferentes cantidades
- Modificar cantidades de productos
- Eliminar productos del carrito
- Visualizar el total de la compra en tiempo real
- Persistencia del carrito durante la sesión

### 🔐 **Sistema de Autenticación Seguro**
Implementación de seguridad robusta mediante:
- Autenticación basada en JWT (JSON Web Tokens)
- Spring Security para protección de endpoints
- Encriptación de contraseñas
- Gestión de sesiones seguras
- Control de acceso basado en roles

### 👥 **Interfaz Dual: Cliente y Administrador**

**Panel de Cliente:**
- Navegación intuitiva de productos
- Visualización detallada de productos
- Gestión de carrito de compras
- Historial de pedidos
- Perfil de usuario

**Panel de Administrador:**
- Gestión completa de productos (CRUD)
- Administración de usuarios
- Control de inventario
- Visualización de pedidos
- Dashboard con estadísticas

### 🎨 **Diseño Responsivo**
- Interfaz adaptable a diferentes dispositivos
- Experiencia de usuario optimizada
- Diseño moderno con Bootstrap

---

## 👨‍💻 Equipo de Desarrollo

Proyecto grupal desarrollado por **2 estudiantes** como parte de su formación académica en desarrollo de aplicaciones fullstack.

### 🤖 Uso de Inteligencia Artificial

Durante el desarrollo del proyecto se utilizó **IA como herramienta de apoyo** para:
- Resolución de problemas técnicos
- Optimización de código
- Consultas sobre mejores prácticas
- Debugging y solución de errores
- Generación de ideas para funcionalidades

---

## 🚧 Estado del Proyecto

**⚠️ Proyecto en Desarrollo Activo**

Este proyecto se encuentra actualmente en fase de desarrollo y mejora continua. Algunas características están siendo optimizadas y se planean agregar nuevas funcionalidades en futuras versiones.

### Próximas Mejoras Planificadas:
- Integración de pasarela de pagos
- Sistema de notificaciones por email
- Mejoras en la interfaz de usuario
- Optimización del rendimiento
- Ampliación de funcionalidades del panel de administrador
- Implementación de sistema de reseñas y valoraciones

---

## 📦 Instalación y Configuración

### Frontend (React)

```bash
# Clonar el repositorio
git clone https://github.com/GenesisValdebenito/Pasteleria_react.git

# Instalar dependencias
cd Pasteleria_react
npm install

# Iniciar el servidor de desarrollo
npm start
```

### Backend (Spring Boot)

```bash
# Clonar el repositorio
git clone https://github.com/GenesisValdebenito/pasteleria-SB.git

# Configurar la base de datos MySQL en application.properties
cd pasteleria-SB

# Compilar y ejecutar
./mvnw spring-boot:run
```

---

## 📄 Licencia

Proyecto académico desarrollado con fines educativos.

---

## 📧 Contacto

Para consultas o sugerencias sobre el proyecto, por favor contactar a través de los repositorios de GitHub.

---

**Desarrollado con ❤️ y ☕ por estudiantes apasionados por la tecnología**
