# 🎓 Sistema de Gestión Escolar (Backend)

API REST desarrollada con Node.js y Express para la gestión de estudiantes, acudientes, pagos, asistencias y notificaciones en un entorno escolar.

---

## 🚀 Tecnologías utilizadas

* Node.js
* Express
* MySQL
* bcrypt
* UUID
* Nodemon

---

## 📂 Estructura del proyecto

```
src/
│
├── config/
│   └── db.js
│
├── controllers/
│   ├── usuariosController.js
│   ├── estudiantesController.js
│   ├── acudientesController.js
│   ├── pagosController.js
│   ├── asistenciasController.js
│   └── notificacionesController.js
│
├── routes/
│   ├── usuariosRoutes.js
│   ├── estudiantesRoutes.js
│   ├── acudientesRoutes.js
│   ├── pagosRoutes.js
│   ├── asistenciasRoutes.js
│   └── notificacionesRoutes.js
│
└── app.js
```

---

## ⚙️ Instalación

1. Clonar el repositorio

```
git clone https://github.com/Ales0609/AdminBot-2.0
cd AdminBot-2.0
```

2. Instalar dependencias

```
npm install
```

3. Crear archivo `.env`

```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=tu_password
DB_NAME=colegio
PORT=3000
```

4. Ejecutar el servidor

```
npm run dev
```

---

## 🗄️ Base de datos

El sistema utiliza MySQL con las siguientes entidades principales:

* Usuarios
* Estudiantes
* Acudientes
* Cuentas por cobrar
* Pagos
* Asistencias
* Notificaciones

---

## 🔗 Endpoints principales

### 👤 Usuarios

* `GET /api/usuarios`
* `POST /api/usuarios`

### 👨‍🎓 Estudiantes

* `GET /api/estudiantes`
* `POST /api/estudiantes`

### 👨‍👩‍👧 Acudientes

* `GET /api/acudientes`
* `POST /api/acudientes`

### 💰 Pagos

* `GET /api/pagos`
* `POST /api/pagos`

### 📊 Asistencias

* `GET /api/asistencias`
* `POST /api/asistencias`

### 📲 Notificaciones

* `GET /api/notificaciones`
* `POST /api/notificaciones`

---

## 🔐 Seguridad

* Las contraseñas se almacenan usando **bcrypt (hash seguro)**
* No se exponen datos sensibles en los endpoints
* Validaciones de claves foráneas para integridad de datos

---

## 🧪 Pruebas

Se recomienda usar Postman para probar los endpoints:

Ejemplo:

```
POST /api/usuarios
```

```json
{
  "nombres": "Pepe",
  "apellidos": "Torres",
  "correo": "pepe@gmail.com",
  "password": "123456"
}
```

---

## 📌 Funcionalidades

✔ Registro de usuarios
✔ Gestión de estudiantes y acudientes
✔ Control de pagos y cuentas por cobrar
✔ Registro de asistencias
✔ Sistema de notificaciones

---

## 🧠 Autor

Proyecto desarrollado por **Ales** 🚀

---

## ⭐ Notas

Este proyecto representa un backend funcional con arquitectura REST, relaciones entre entidades y lógica de negocio aplicada.

Ideal como base para un sistema completo full-stack.
