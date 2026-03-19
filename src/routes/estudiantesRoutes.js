import express from "express"
import { getEstudiantes, createEstudiante } from "../controllers/estudiantesController.js"

const router = express.Router()

router.get("/estudiantes", getEstudiantes)
router.post("/estudiantes", createEstudiante)

export default router