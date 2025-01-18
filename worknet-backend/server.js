const dotenv = require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const clockingRoutes = require("./routes/clockingRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

console.log("Cargando rutas...");



// Conexión a MongoDB local
mongoose.connect("mongodb://localhost:27017/time-tracking", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("connected", () => {
  console.log("Conectado a MongoDB localmente");
});

mongoose.connection.on("error", (err) => {
  console.log("Error de conexión:", err);
});

// Rutas
app.use("/api/clocking", clockingRoutes);  // Asegúrate de que el prefijo `/api/clocking` esté correcto
app.use("/api/users", userRoutes);  // Asegúrate de que el prefijo `/api/users` esté correcto

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
