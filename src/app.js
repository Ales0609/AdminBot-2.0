import express from "express"
import cors from "cors"
import dotenv from "dotenv"

import estudiantesRoutes from "./routes/estudiantesRoutes.js"
import acudientesRoutes from "./routes/acudientesRoutes.js"
import usuariosRoutes from "./routes/usuariosRoutes.js"
import pagosRoutes from "./routes/pagosRoutes.js"
import asistenciasRoutes from "./routes/asistenciasRoutes.js"
import notificacionesRoutes from "./routes/notificacionesRoutes.js"

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())

app.use("/api", estudiantesRoutes)
app.use("/api", acudientesRoutes)
app.use("/api", usuariosRoutes)
app.use("/api", pagosRoutes)
app.use("/api", asistenciasRoutes)
app.use("/api", notificacionesRoutes)


app.listen(process.env.PORT, () => {
    console.log("Servidor corriendo en puerto", process.env.PORT)
})