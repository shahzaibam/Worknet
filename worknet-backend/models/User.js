const mongoose = require('mongoose');

// Definir el esquema
const userSchema = new mongoose.Schema({
    id: { type: Number, required: true, unique: true },  // El id será de tipo Number y único
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: {type: String, required: true},
    employeeId: { type: String, required: true, unique: true }  // Campo employeeId que se genera automáticamente

});

// Middleware 'pre-save' para incrementar el 'id' automáticamente y generar el 'employeeId'
userSchema.pre('save', async function(next) {
    const user = this;

    // Si el 'id' no está establecido, entonces calcular el siguiente 'id'
    if (!user.id) {
        const latestUser = await User.findOne().sort({ id: -1 }).exec();  // Buscar el último id
        user.id = latestUser ? latestUser.id + 1 : 1;  // Si existe un último id, lo incrementamos; si no, comenzamos desde 1
    }

    // Generar el 'employeeId' combinando el 'name' y el 'id'
    user.employeeId = `${user.name}${user.id}`;

    next();
});

// Crear el modelo de User
const User = mongoose.model('User', userSchema);

module.exports = User;
