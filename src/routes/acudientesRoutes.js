import express from "express"
import { getAcudientes, createAcudiente } from "../controllers/acudientesController.js"

const router = express.Router()

router.get("/acudientes", getAcudientes)
router.post("/acudientes", createAcudiente)

export default router
