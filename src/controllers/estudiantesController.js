import { db } from "../config/db.js"

export const getEstudiantes = async (req, res) => {
    try {
        const [rows] = await db.execute(
            "SELECT * FROM estudiantes"
        )
        res.json(rows)

    } catch (error) {
        res.status(500).json({
            message: "Error al obtener estudiantes"
        })
    }
}

export const createEstudiante = async (req, res) => {
    try {
        const {
            codigo_estudiante,
            nombres,
            apellidos,
            tipo_documento,
            numero_documento,
            fecha_nacimiento,
            grado,
            anio_lectivo
        } = req.body

        await db.execute(
            `INSERT INTO estudiantes
            (id, codigo_estudiante, nombres, apellidos, tipo_documento, numero_documento, fecha_nacimiento, grado, anio_lectivo)
            VALUES (UUID(), ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                codigo_estudiante,
                nombres,
                apellidos,
                tipo_documento,
                numero_documento,
                fecha_nacimiento,
                grado,
                anio_lectivo
            ]
        )
        res.status(201).json({
            message: "Estudiante creado"
        })
    } catch (error) {
        res.status(500).json({
            message: "Error al crear estudiante"
        })
    }
}