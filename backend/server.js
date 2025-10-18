import dotenv from "dotenv";
import app from "./src/app.js";

dotenv.config();
console.log("Mongo URi",process.env.MONGODB_URI)

const PORT = process.env.PORT || 5000;

app.listen(PORT, ()=> {
    console.log(`Servidor corriendo en el puero ${PORT}`);
});