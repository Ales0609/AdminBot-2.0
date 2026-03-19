import express from "express"
import { getNotificaciones, createNotificacion } from "../controllers/notificacionesController.js"

const router = express.Router()

router.get("/notificaciones", getNotificaciones)
router.post("/notificaciones", createNotificacion)

export default router