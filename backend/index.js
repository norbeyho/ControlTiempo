import dotenv from "dotenv";
import app from "./src/app.js";

dotenv.config();
console.log("Mongo URi",process.env.MONGODB_URI)

const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", ()=> {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});

app.get('/', (req, res) => {
    res.send("Api funcionando")
});