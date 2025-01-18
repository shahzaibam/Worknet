const express = require("express");
const Clocking = require("../models/Clocking");
const router = express.Router();

// Ruta para registrar entrada
router.post('/clockin', async (req, res) => {
  try {
    const { employeeId } = req.body;
    console.log(employeeId)
    const clockInTime = new Date();

    const newClocking = new Clocking({
      employeeId,
      clockIn: clockInTime,
    });

    await newClocking.save();
    res.status(200).json({ message: 'Entrada registrada', clockInTime });
  } catch (error) {
    console.error("Error al registrar entrada:", error); // Agregar detalles del error en la consola
    res.status(500).json({ message: 'Error al registrar entrada', error: error.message });
  }
});


// Ruta para registrar salida
router.post("/clockout", async (req, res) => {
  try {
    const { employeeId } = req.body;
    const clockOutTime = new Date();

    const clocking = await Clocking.findOne({
      employeeId,
      clockOut: { $exists: false },
    });

    if (!clocking) {
      return res
        .status(400)
        .json({ message: "No se encontró registro de entrada" });
    }

    clocking.clockOut = clockOutTime;
    await clocking.save();

    res.status(200).json({ message: "Salida registrada", clockOutTime });
  } catch (error) {
    res.status(500).json({ message: "Error al registrar salida" });
  }
});


router.get("/getclockingall", async (req, res) => {
  try {

    // Buscar todos los registros de entrada/salida del empleado
    const clockingRecords = await Clocking.find();


    if (clockingRecords.length === 0) {
      return res
          .status(400)
          .json({ message: "No se encontró registros para el empleado" });
    }

    res.status(200).json({clockingRecords});
  } catch (error) {
    console.error("Error al obtener registros:", error); // Registro del error
    res.status(500).json({ message: "Error al obtener registros", error: error.message });
  }
});

module.exports = router;
