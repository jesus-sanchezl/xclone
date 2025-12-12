# Frontend – XClone (React + Vite + Material UI)

Este es el frontend de **XClone**, un clon funcional de Twitter/X desarrollado con **React**, **Vite** y **Material UI**.  
La aplicación incluye autenticación, feed dinámico, interacciones (likes, comentarios, retweets), páginas de perfil y edición de usuario, además de un diseño responsive inspirado en Twitter.

---

## 🚀 Tecnologías

- **React 18** – Biblioteca principal de la UI  
- **Vite** – Entorno de desarrollo rápido  
- **Material UI** – Componentes estilizados  
- **React Router** – Navegación entre páginas  
- **Context API** – Estado global (auth y tweets)  
- **date-fns** – Formateo de fechas  
- **Emoji Picker** – Selección de emojis  
- **PropTypes** – Validación de props  
- **Fetch API** – Llamadas al backend

Arquitectura basada en componentes reutilizables, contexto global y hooks personalizados.

---

## ⚙️ Instalación y ejecución
Antes de ejecutar el frontend, asegúrate de haber creado el archivo `.env`  
con la URL del backend.

```bash
cd frontend
npm install
npm run dev
```

La aplicación se ejecuta en:

```
http://localhost:5173
```

---

## 🔐 Variables de entorno

Crear un archivo `.env` en la carpeta `frontend`.
**Este archivo es obligatorio para que el frontend funcione.**

Ejemplo:

```env
VITE_BACKEND=http://localhost:7000/api/v1
```

Esta variable permite conectar el frontend con el backend de XClone.

---

## 🧱 Estructura del proyecto

```bash
frontend/
  src/
    assets/        → Imágenes y recursos estáticos
    components/    → Componentes reutilizables (UI, formularios, layout, modales…)
    context/       → Estado global (AuthContext, TweetsContext)
    hooks/         → Hooks personalizados para separar la lógica
    pages/         → Páginas principales de la aplicación
    services/      → Servicios que consumen la API REST (auth, tweets, likes…)
    utils/         → Funciones auxiliares y helpers
    App.jsx        → Configuración general de rutas y layout
    main.jsx       → Punto de entrada de la aplicación
  public/
  .env
  package.json
  vite.config.js

```


## ✨ Funcionalidades implementadas

### 👤 Autenticación
- Registro **multipaso** con validaciones.
- Login dinámico: versión **modal** y versión en **página completa**.
- Sesiones persistentes con **Context API**.

---

### 📝 Tweets
- Crear tweet (texto + imagen opcional).
- Listado de tweets en la Home.
- Página de tweet individual.
- Contadores actualizados en tiempo real.

---

### ❤️ Likes
- Like y unlike.
- Icono dinámico.
- Contador sincronizado con el backend.

---

### 💬 Comentarios
- Añadir comentarios dentro del tweet.
- Contador actualizado en tiempo real.

---

### 🔁 Retweets
- Retweet y unretweet.
- Indicador visual (“Reposteaste”).
- Contador sincronizado.

---

### 👥 Perfil de usuario
- Tweets + retweets del usuario.
- Información del perfil.
- Edición completa:
  - Nombre
  - Email
  - Username
  - Contraseña
  - Foto de perfil
  - Foto de portada

---

### 📱 Responsive estilo Twitter
- Sidebar izquierdo fijo.
- Columna central con scroll independiente.
- Sidebar derecho para extras.
- Diseño adaptado a móvil y escritorio.

---

## 🟡 Funcionalidades preparadas (backend listo, UI pendiente)

Estas funcionalidades **ya existen en el backend**, pero **aún no tienen implementación en el frontend**.  
La integración se realizará en futuras versiones de la interfaz:

- 🔔 Notificaciones  
- ⚙️ Ajustes de cuenta  
- 🔐 Privacidad  
- 🌓 Tema claro/oscuro  
- #️⃣ Página de hashtags  
- 🔍 Búsqueda  

Los endpoints están completos y operativos en el backend; el frontend todavía no incluye la UI ni la lógica para utilizarlos.

---


## ✔️ Estado actual

El frontend de XClone es completamente funcional y ofrece:

- Autenticación con sesiones persistentes  
- Feed dinámico con actualización de estados  
- Interacciones completas (likes, comentarios, retweets)  
- Perfiles de usuario y página de edición  
- Navegación y diseño inspirados en Twitter  
- Interfaz responsive adaptada a móvil y escritorio  

La base del proyecto está consolidada y lista para la integración de módulos avanzados en futuras versiones.


