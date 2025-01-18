const express = require("express");
const User = require("../models/User");
const router = express.Router();
const jwt = require('jsonwebtoken');  // Importamos jsonwebtoken
const bcrypt = require('bcryptjs');  // Para encriptar la contraseña

//LOGIN FOR EMPLOYEES
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;


        const existUser = await User.findOne({ email: email });

        if (!existUser) {
            return res
                .status(400)
                .json({ message: "No estás registrado" });
        }


        const isPasswordValid = await bcrypt.compare(password, existUser.password);

        if (!isPasswordValid) {
            // Si la contraseña no es válida
            return res.status(400).json({ message: "Contraseña incorrecta" });
        }

        // Crear un payload para el token JWT
        const payload = {
            id: existUser.id,
            email: existUser.email,
            name: existUser.name
        };

        // Crear un token JWT
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Responder con el token
        res.status(200).json({
            message: "Has entrado correctamente",
            token: token
        });

    } catch (error) {
        console.error("Error al obtener registros:", error); // Registro del error
        res.status(500).json({ message: "Error al obtener registros", error: error.message });
    }
});


router.post("/register", async (req, res) => {
    try {
        const { email, password, name } = req.body;

        if (!email || !password || !name) {
            return res.status(400).json({ message: "Todos los campos son requeridos." });
        }

        // Verificar si el usuario ya existe
        const existingUser = await User.findOne({ email: email });
        if (existingUser) {
            return res.status(400).json({ message: "El usuario ya existe" });
        }

        // Hashear la contraseña antes de guardarla
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            email,
            password: hashedPassword,
            name
        });

        await newUser.save();

        return res.status(201).json({ message: "Usuario registrado exitosamente" });

    } catch (error) {
        console.error("Error al registrar usuario:", error);
        res.status(500).json({ message: "Error al registrar el usuario", error: error.message });
    }
});


module.exports = router;
