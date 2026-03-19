import { db } from "../config/db.js"

// Get obtener acudientes

export const getAcudientes = async (req, res) => {
    try{
        const [rows] = await db.execute(
            "SELECT * FROM acudientes" 
        )

        res.json(rows)
    } catch (error){

        res.status(500).json({
            message: "Error al obtener acudientes"
        })
    }
}


// Post crear acudientes

export const createAcudiente = async (req, res) => {
    try{
        const{
            nombres,
            apellidos,
            telefono,
            correo,
            direccion
        } = req.body

        await db.execute(
        `INSERT INTO acudientes
        (id, nombres, apellidos, telefono, correo, direccion)
        VALUES (UUID(), ?, ?, ?, ?, ?)`,
        [
            nombres,
            apellidos,
            telefono,
            correo,
            direccion
        ]
        )
    } catch (error){
        res.status(500).json({
            message: "Error al crear acudiente"
        })
    }
}