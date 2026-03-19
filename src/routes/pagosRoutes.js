import express from "express"
import { getPagos, createPago } from "../controllers/pagosController.js"

const router = express.Router()

router.get("/pagos", getPagos)
router.post("/pagos", createPago)

export default router