const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');  // Asegúrate de tener bcryptjs instalado

// Definir el esquema para el usuario
const userSchema = new mongoose.Schema({
    email: { type: String, required: true },
    name: { type: String, required: true },
    password: { type: String, required: true },
    employeeId: { type: String, required: true },
    id: { type: String, required: true, unique: true }  // Asegúrate de que el 'id' sea único
});

// Crear el modelo
const User = mongoose.model('User', userSchema);

// Conectar a MongoDB (asegúrate de usar la URL de conexión correcta)
mongoose.connect('mongodb://localhost:27017/time-tracking', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => {
        console.log('Conectado a MongoDB');

        // Crear un nuevo usuario
        const newUser = new User({
            email: 'shahzaibam05@gmail.com',
            name: 'Shah Zaib',
            password: '123456', // Contraseña original antes de cifrar
            employeeId: 'Alex1'
        });

        // Generar un id único concatenando el 'name' y 'employeeId'
        newUser.id = newUser.name + newUser.employeeId;

        // Cifrar la contraseña antes de guardarla en la base de datos
        bcrypt.hash(newUser.password, 10, (err, hashedPassword) => {
            if (err) {
                console.error('Error al cifrar la contraseña', err);
                mongoose.connection.close();  // Cerrar la conexión si hay error
                return;
            }

            // Asignar la contraseña cifrada al nuevo usuario
            newUser.password = hashedPassword;

            // Guardar el nuevo usuario en la base de datos
            newUser.save()
                .then(() => {
                    console.log('Usuario insertado correctamente');
                    mongoose.connection.close(); // Cerrar la conexión
                })
                .catch((err) => {
                    console.error('Error al insertar el usuario', err);
                    mongoose.connection.close(); // Cerrar la conexión si hay error
                });
        });
    })
    .catch((err) => {
        console.error('Error de conexión a MongoDB', err);
    });
