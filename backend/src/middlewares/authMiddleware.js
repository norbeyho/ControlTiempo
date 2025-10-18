import { verifyToken } from "../utils/token.js";

export const protect = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer")) {
        return res.status(401).json({ error: "No autorizado, token faltante" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = verifyToken(token);

    if (!decoded) {
        return res.status(401).json({ error: "Token invalido o expirado"})
    }

    req.user = decoded;
    next();
};