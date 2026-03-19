import express from "express"
import { getUsuarios, createUsuario } from "../controllers/usuariosController.js"

const router = express.Router()

router.get("/usuarios", getUsuarios)
router.post("/usuarios", createUsuario)

export default router