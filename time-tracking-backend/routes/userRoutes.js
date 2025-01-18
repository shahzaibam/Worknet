const express = require("express");
const Clocking = require("../models/User");
const router = express.Router();
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

        if (isPasswordValid) {
            // Si la contraseña es válida, dar acceso
            return res.status(200).json({ message: "Has entrado correctamente" });
        } else {
            // Si la contraseña no es válida
            return res.status(400).json({ message: "Contraseña incorrecta" });
        }

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
