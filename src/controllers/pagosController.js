import { db } from "../config/db.js"

// GET - obtener pagos
export const getPagos = async (req, res) => {
    try {

        const [rows] = await db.execute(
            `SELECT p.id, p.fecha_pago, p.valor_pagado, p.metodo_pago, p.referencia,
            c.estudiante_id,
            u.nombres AS registrado_por
            FROM pagos p
            LEFT JOIN cuentas_por_cobrar c ON p.cuenta_por_cobrar_id = c.id
            LEFT JOIN usuarios u ON p.registrado_por_id = u.id`
        )

        res.json(rows)

    } catch (error) {

        console.error(error)

        res.status(500).json({
            message: "Error al obtener pagos"
        })

    }
}


// POST - crear pago
export const createPago = async (req, res) => {
    try {

        const {
            cuenta_por_cobrar_id,
            registrado_por_id,
            valor_pagado,
            metodo_pago,
            referencia
        } = req.body

        const [cuenta] = await db.execute(
            "SELECT id FROM cuentas_por_cobrar WHERE id = ?",
            [cuenta_por_cobrar_id]
        )

        if (cuenta.length === 0) {
            return res.status(400).json({
                message: "La cuenta por cobrar no existe"
            })
        }

        await db.execute(
            `INSERT INTO pagos
            (id, cuenta_por_cobrar_id, registrado_por_id, fecha_pago, valor_pagado, metodo_pago, referencia, created_at)
            VALUES (UUID(), ?, ?, NOW(), ?, ?, ?, NOW())`,
            [
                cuenta_por_cobrar_id,
                registrado_por_id,
                valor_pagado,
                metodo_pago,
                referencia
            ]
        )

        res.status(201).json({
            message: "Pago registrado correctamente"
        })

    } catch (error) {

        console.error(error)

        res.status(500).json({
            message: "Error al registrar pago"
        })

    }
}