import express from "express"
import { getAsistencias, createAsistencia } from "../controllers/asistenciasController.js"

const router = express.Router()

router.get("/asistencias", getAsistencias)
router.post("/asistencias", createAsistencia)

export default router