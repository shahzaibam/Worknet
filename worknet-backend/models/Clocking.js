const mongoose = require('mongoose');

// Definir el esquema
const clockingSchema = new mongoose.Schema({
  employeeId: { type: String, required: true }, // Asegúrate de que este campo sea requerido
  clockIn: { type: Date, required: true },      // La hora de entrada debe ser obligatoria
  clockOut: { type: Date }                      // La hora de salida no es obligatoria al inicio
});


// Crear el modelo basado en el esquema
const Clocking = mongoose.model('Clocking', clockingSchema);

// Exportar el modelo
module.exports = Clocking;
