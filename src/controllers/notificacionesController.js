import { db } from "../config/db.js"

// Get obtener notificaciones
export const getNotificaciones = async (req, res) => {
    try {

        const [rows] = await db.execute(
            `SELECT n.id, n.telefono_destino, n.mensaje, n.estado_envio, n.fecha_envio,
            e.nombres AS estudiante,
            a.nombres AS acudiente
            FROM notificaciones_whatsapp n
            JOIN estudiantes e ON n.estudiante_id = e.id
            JOIN acudientes a ON n.acudiente_id = a.id`
        )

        res.json(rows)

    } catch (error) {

        console.error(error)

        res.status(500).json({
            message: "Error al obtener notificaciones"
        })

    }
}


// Post crear notificación
export const createNotificacion = async (req, res) => {
    try {

        const {
            estudiante_id,
            acudiente_id,
            cuenta_por_cobrar_id,
            telefono_destino,
            mensaje
        } = req.body

        // Validar estudiante
        const [estudiante] = await db.execute(
            "SELECT id FROM estudiantes WHERE id = ?",
            [estudiante_id]
        )

        if (estudiante.length === 0) {
            return res.status(400).json({
                message: "El estudiante no existe"
            })
        }

        // Validar acudiente
        const [acudiente] = await db.execute(
            "SELECT id FROM acudientes WHERE id = ?",
            [acudiente_id]
        )

        if (acudiente.length === 0) {
            return res.status(400).json({
                message: "El acudiente no existe"
            })
        }

        // Validar cuenta_por_cobrar_id
        if (cuenta_por_cobrar_id) {
            const [cuenta] = await db.execute(
                "SELECT id FROM cuentas_por_cobrar WHERE id = ?",
                [cuenta_por_cobrar_id]
            )

            if (cuenta.length === 0) {
                return res.status(400).json({
                    message: "La cuenta por cobrar no existe"
                })
            }
        }

        await db.execute(
            `INSERT INTO notificaciones_whatsapp
            (id, estudiante_id, acudiente_id, cuenta_por_cobrar_id, telefono_destino, mensaje, estado_envio, created_at)
            VALUES (UUID(), ?, ?, ?, ?, ?, 'pendiente', NOW())`,
            [
                estudiante_id,
                acudiente_id,
                cuenta_por_cobrar_id || null,
                telefono_destino,
                mensaje
            ]
        )

        res.status(201).json({
            message: "Notificación creada correctamente"
        })

    } catch (error) {

        console.error(error)

        res.status(500).json({
            message: "Error al crear notificación"
        })

    }
}