import { db } from "../config/db.js"

// GET - obtener asistencias
export const getAsistencias = async (req, res) => {
    try {

        const [rows] = await db.execute(
            `SELECT a.id, a.fecha, a.estado, a.hora_ingreso, a.hora_salida,
            e.nombres AS estudiante,
            u.nombres AS registrado_por
            FROM asistencias a
            JOIN estudiantes e ON a.estudiante_id = e.id
            LEFT JOIN usuarios u ON a.registrado_por_id = u.id`
        )

        res.json(rows)

    } catch (error) {

        console.error(error)

        res.status(500).json({
            message: "Error al obtener asistencias"
        })

    }
}


// POST - registrar asistencia
export const createAsistencia = async (req, res) => {
    try {

        const {
            estudiante_id,
            fecha,
            estado,
            hora_ingreso,
            hora_salida,
            observacion,
            registrado_por_id
        } = req.body

        // 🔍 Validar estudiante
        const [estudiante] = await db.execute(
            "SELECT id FROM estudiantes WHERE id = ?",
            [estudiante_id]
        )

        if (estudiante.length === 0) {
            return res.status(400).json({
                message: "El estudiante no existe"
            })
        }

        // 🔍 Validar usuario
        const [usuario] = await db.execute(
            "SELECT id FROM usuarios WHERE id = ?",
            [registrado_por_id]
        )

        if (usuario.length === 0) {
            return res.status(400).json({
                message: "El usuario no existe"
            })
        }

        // 🔍 Validar duplicado (por UNIQUE)
        const [existe] = await db.execute(
            "SELECT id FROM asistencias WHERE estudiante_id = ? AND fecha = ?",
            [estudiante_id, fecha]
        )

        if (existe.length > 0) {
            return res.status(400).json({
                message: "Ya existe asistencia para este estudiante en esa fecha"
            })
        }

        // ✅ Insert
        await db.execute(
            `INSERT INTO asistencias
            (id, estudiante_id, fecha, estado, hora_ingreso, hora_salida, observacion, registrado_por_id, created_at)
            VALUES (UUID(), ?, ?, ?, ?, ?, ?, ?, NOW())`,
            [
                estudiante_id,
                fecha,
                estado,
                hora_ingreso,
                hora_salida,
                observacion,
                registrado_por_id
            ]
        )

        res.status(201).json({
            message: "Asistencia registrada correctamente"
        })

    } catch (error) {

        console.error(error)

        res.status(500).json({
            message: "Error al registrar asistencia"
        })

    }
}