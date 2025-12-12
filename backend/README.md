# Backend – XClone (API REST con Node.js + Express + MySQL)

Este es el backend de **XClone**, un clon de Twitter/X construido con **Node.js**, **Express** y **MySQL**.  
Incluye autenticación con JWT, gestión de usuarios, tweets, likes, comentarios, retweets y seguidores.

La base de datos se llama **`simpletwitter`**, ya que el proyecto comenzó con ese nombre.

---

## 🚀 Tecnologías

-   Node.js + Express – API REST principal
-   MySQL – Base de datos relacional
-   MySQL2 – Cliente para conexión y consultas
-   JWT – Autenticación basada en tokens
-   bcrypt – Hashing de contraseñas
-   Joi – Validaciones de datos
-   express-fileupload – Gestión de imágenes (perfil, portada, tweets, comentarios)
-   dotenv – Variables de entorno
-   cors & morgan – Seguridad y logging

Arquitectura organizada en rutas, controladores, repositorios, middlewares y esquemas de validación para mantener una estructura modular y escalable.

---

## ⚙️ Instalación y ejecución

Antes de ejecutar el servidor, asegúrate de haber creado el archivo `.env`  
con la configuración de base de datos y JWT.

```bash
cd backend
npm install
npm run dev
```

El servidor se ejecuta en:

```
http://localhost:7000/api/v1
```

---

### 🔐 Variables de entorno

Crear un archivo `.env` basado en `template.env`.
**Este archivo es obligatorio para que el backend funcione.**

Ejemplo:

```env
PORT=7000
JWT_SECRET=tu_clave
TOKEN_EXPIRY_TIME=7d

MYSQL_HOST=localhost
MYSQL_USER=usuario
MYSQL_PASSWORD=password
MYSQL_DATABASE=simpletwitter
```

### 🗄️ Base de datos

Para inicializar las tablas:

```bash
node src/database/initDB.js
```

Este script crea la base de datos y todas las tablas necesarias  
(usuarios, tweets, likes, comentarios, retweets, seguidores, etc.).

---

### 🧪 Datos de ejemplo (uso interno)

Durante el desarrollo se utilizan datos de ejemplo para realizar pruebas locales (usuarios, tweets, likes, comentarios y retweets).
Estos datos **no forman parte del proceso de instalación** y están pensados únicamente para facilitar el trabajo de desarrollo.

---


### 📁 Estructura

```bash
backend/
  src/
    controllers/      → Lógica de cada endpoint (usuarios, tweets, likes, etc.)
    routes/           → Definición de rutas de la API (users, tweets, comments...)
    repositories/     → Acceso a la base de datos (consultas MySQL)
    middlewares/      → Autenticación, validaciones y manejo previo de peticiones
    schemas/          → Esquemas Joi para validación de datos
    utils/            → Funciones de ayuda (helpers, manejo de errores, etc.)
    database/         → Configuración y scripts de base de datos (incluye initDB.js)
  public/
    profileImages/    → Imágenes de perfil de usuario
    coverImages/      → Imágenes de portada
    tweetMedia/       → Imágenes asociadas a tweets
    commentMedia/     → Imágenes asociadas a comentarios
  template.env        → Plantilla de variables de entorno
  package.json        → Dependencias y scripts del backend
```

### 🔗 Endpoints principales

A continuación se muestran los endpoints más importantes de la API.  
Cada módulo incluye más rutas y validaciones internas que pueden consultarse en el código.

---

### 👤 Usuarios  
**Base:** `/api/v1/users`

- **POST** `/register` – Registrar un nuevo usuario  
- **POST** `/login` – Iniciar sesión  
- **GET** `/userinfo` – Obtener perfil del usuario autenticado  
- **PUT** `/update-password` – Actualizar contraseña  
- **PUT** `/update-email` – Actualizar email  
- **PUT** `/update-photo` – Actualizar imagen de perfil  
- **PUT** `/cover-image` – Actualizar imagen de portada  
- **PUT** `/me` – Actualizar nombre y biografía  
- **GET** `/:id` – Obtener perfil público de un usuario  
- **GET** `/:userId/tweets/count` – Obtener número total de tweets de un usuario  
- **GET** `/` – Listado de usuarios  

---

### 📝 Tweets  
**Base:** `/api/v1/tweets`

- **GET** `/` – Listar tweets  
- **POST** `/` – Crear un tweet  
- **GET** `/:id` – Obtener un tweet por ID  
- **PUT** `/:id` – Actualizar un tweet  
- **DELETE** `/:id` – Borrar un tweet  
- **GET** `/user/:user_id` – Listar tweets de un usuario  

---

### ❤️ Likes (Tweets)  
**Base:** `/api/v1/likes`

- **POST** `/:id` – Dar like a un tweet  
- **DELETE** `/:id` – Quitar like a un tweet  
- **GET** `/:id/users` – Usuarios que han dado like a un tweet  
- **GET** `/user/:id` – Tweets a los que un usuario ha dado like  

---

### 💬 Likes (Comentarios)  
**Base:** `/api/v1/likes/comment`

- **POST** `/:id` – Dar like a un comentario  
- **DELETE** `/:id` – Quitar like a un comentario  
- **GET** `/:id/users` – Usuarios que han dado like a un comentario  

---

### 💭 Comentarios  
**Base:** `/api/v1/comments`

- **POST** `/tweet/:id` – Crear comentario en un tweet  
- **GET** `/tweet/:id` – Obtener comentarios de un tweet  

---

### 🔁 Retweets  
**Base:** `/api/v1/retweets`

- **GET** `/:tweetId` – Listar retweets de un tweet  
- **POST** `/:tweetId` – Crear retweet  
- **DELETE** `/:tweetId` – Eliminar retweet  
- **GET** `/user/:userId` – Retweets realizados por un usuario  

---

### 👥 Seguidores  
**Base:** `/api/v1/followers`

- **GET** `/following/:userId` – Usuarios que sigue un usuario  
- **GET** `/:userId` – Seguidores de un usuario  
- **POST** `/:followedId` – Seguir a un usuario  
- **DELETE** `/:followedId` – Dejar de seguir a un usuario  

---

### #️⃣ Hashtags  
**Base:** `/api/v1/hashtags`

- **GET** `/` – Listado de hashtags  
- **GET** `/:name` – Tweets asociados a un hashtag  

---

### 🔔 Notificaciones  
**Base:** `/api/v1/notifications`

- **GET** `/` – Listado de notificaciones del usuario  
- **PUT** `/:id` – Marcar notificación como leída  
- **DELETE** `/:id` – Eliminar una notificación  
- **PUT** `/settings` – Ajustar preferencias de notificaciones  

---



### 🟡 Funcionalidades preparadas (backend listo)

El backend incluye módulos completamente implementados a nivel de lógica, base de datos y rutas, pero todavía no integrados en el frontend:

-   🔔 Notificaciones
-   ⚙️ Ajustes de cuenta
-   🔐 Privacidad
-   🌓 Apariencia (tema claro/oscuro)
-   #️⃣ Hashtags

Los controladores, repositorios y tablas correspondientes ya existen, pero la UI aún no consume estos endpoints.

### 🧪 Datos de ejemplo

El script `initDB.js` puede incluir:

-   Usuarios de ejemplo
-   Tweets iniciales
-   Likes, comentarios y retweets preconfigurados

Esto facilita probar la API y evita que la aplicación arranque vacía.

### ✔️ Estado actual

El backend está completamente funcional para el MVP de XClone, incluyendo:

-   Usuarios
-   Tweets
-   Likes
-   Comentarios
-   Retweets
-   Seguidores

Además, módulos avanzados ya están preparados a nivel de backend para futuras iteraciones:

-   Notificaciones
-   Ajustes de cuenta
-   Hashtags
-   Privacidad
-   Apariencia (tema claro/oscuro)
