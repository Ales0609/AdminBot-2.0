import { db } from "../config/db.js";
import bcrypt from "bcrypt"

// Get obtener usuarios 
export const getUsuarios = async (req, res) => {
    try{
        const [rows] = await db.execute(
            `SELECT id, nombres, apellidos, correo, telefono, rol, activo, created_at
            FROM usuarios`
        )

        res.json(rows)
    } catch (error){
        console.error(error)
        res.status(500).json({
            message: "Error al obtener usuarios"
        })
    }
}


// Post crear usuaio
export const createUsuario = async (req, res) => {
    try{
        const {
            nombres,
            apellidos,
            correo,
            password,
            telefono,
            rol
        } = req.body

        const saltRounds = 10
        const password_hash = await bcrypt.hash(password, saltRounds)

        await db.execute(
            `INSERT INTO usuarios
            (id, nombres, apellidos, correo, password_hash, telefono, rol, created_at)
            VALUES (UUID(), ?, ?, ?, ?, ?, ?, NOW())`,
            [
                nombres, 
                apellidos, 
                correo, 
                password_hash, 
                telefono, 
                rol || "admin"
            ]
        )

        res.status(201).json({
            message: "Usuario creado correctamente"
        })
    } catch (error){
        console.log(error)
        res.status(500).json({
            message: "Error al crear usuario"
        })
    }
}