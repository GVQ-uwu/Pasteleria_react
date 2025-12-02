# 🍰 Pastelería Sabores (Backend + MySQL + Swagger + Frontend)

Este repositorio contiene la solución completa de la Pastelería Sabores, incluyendo el servidor de la aplicación (Backend), la base de datos (MySQL) y la interfaz de usuario (Frontend), además de la documentación de API generada con Swagger.

**Integrantes:**
* @FizzelPopBT
* @GVQ-uwu

---

## 🚀 Guía de Instalación y Ejecución del Proyecto

Sigue estos pasos para levantar el entorno de desarrollo completo.

### 1. ⚙️ Configuración del Entorno Local (XAMPP)

Necesitas un servidor web local para el Backend (si es PHP) y la base de datos.

| Tarea | Instrucciones |
| :--- | :--- |
| **Abrir el Panel de Control** | Localiza y abre la aplicación del **Panel de Control de XAMPP**. |
| **Iniciar Apache** | Haz clic en **Start (Iniciar)** junto a **Apache**. |
| **Iniciar MySQL** | Haz clic en **Start (Iniciar)** junto a **MySQL**. |

> **Verificación:** Los módulos Apache y MySQL deben mostrar un color verde.

### 2. 🗄️ Configuración de la Base de Datos (MySQL)

Es fundamental tener la base de datos lista para que el Backend pueda operar.

1.  **Acceder a phpMyAdmin:** Abre tu navegador y dirígete a `http://localhost/phpmyadmin/`.
2.  **Crear la Base de Datos:**
    * Crea una nueva base de datos con el nombre: `pasteleria`.
3.  **Importar el Esquema:**
    * Ve a la pestaña **Importar** de la base de datos `pasteleria`.
    * Selecciona el archivo SQL del proyecto (e.g., `pasteleria`) y ejecútalo para crear las tablas y datos iniciales.

---

### 3. 💻 Ejecución del Backend (Servidor API)

El Backend debe ejecutarse primero para que el Frontend pueda consumir sus servicios.

1.  **Navegar al Directorio:** Abre la terminal y navega a la carpeta principal del Backend:
    ```bash
    cd [ruta-a-tu-proyecto]/backend
    ```
2.  **Instalar Dependencias (Solo la primera vez):**
    ```bash
    npm install
    ```
3.  **Ejecutar el Servidor:**
    ```bash
    # Usar el comando de inicio definido en package.json
    npm start
    ```
    > **Resultado Esperado:** El servidor se inicia y se indica el puerto de escucha (e.g., "Servidor corriendo en el puerto 3001").

#### 📑 Documentación de API (Swagger)

Una vez que el Backend esté corriendo, puedes acceder a la documentación de la API:
* **URL:** `http://localhost:[Puerto-del-Backend]/api-docs`
    *(Reemplaza `[Puerto-del-Backend]` con el puerto real, ej: 3001)*

---

### 4. 🌐 Ejecución del Frontend (React)

El Frontend interactúa con el usuario y se conecta al Backend.

1.  **Navegar al Directorio:** Abre una **nueva terminal** y navega a la carpeta del Frontend:
    ```bash
    cd [ruta-a-tu-proyecto]/frontend
    ```
2.  **Instalar Dependencias (Solo la primera vez):**
    ```bash
    npm install
    ```
3.  **Iniciar la Aplicación:**
    ```bash
    npm start
    ```

**¡Listo!** La aplicación se abrirá automáticamente en tu navegador (normalmente en `http://localhost:3000`).
