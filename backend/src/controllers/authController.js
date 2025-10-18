import bcrypt from "bcryptjs";
import User from "../models/User.js";
import { generateToken } from "../utils/token.js";

export const register = async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password)
            return res.status(400).json({ error: "Faltan campos obligatorios"});

        const userExist = await User.findOne({ username });
        if (userExist) return res.status(400).json({ error: "Usuario ya existe" });

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({ username, password: hashedPassword });

        res.status(201).json({
            message: "Usuario creado exitosamente",
            user: { id: newUser._id, username: newUser.username },
        });
    } catch (error) {
        res.status(500).json({error: "Error en el servidor" });
    }
};

export const login = async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = await User.findOne({ username });
        if (!User) return res.status(401).json({ error: "Usuario no encontrado" });

        const validPassword = await bcrypt.compare(password, user.password);
        if(!validPassword)
            return res.status(401).json({ error: "Contraseña incorrecta" });

        const token = generateToken(user._id);
        res.json({ message: "Login exitoso", token });
    } catch (error) {
        res.status(500).json({ error: "Error en el servidor"});
    }
};