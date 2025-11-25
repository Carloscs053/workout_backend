const workout_service = require("../services/workout_service") // Importamos el service

// Método que trae todos los entrenamientos
const getAllWorkouts = (req, res) => {
    const { mode } = req.query
    const { limit } = req.query;
    const { sort } = req.query;
    try {
        // Guardamos en una lista todos los entrenamientos que recibe a través del método del service
        //const allWorkouts = workout_service.getAllWorkouts()
        const allWorkouts = workout_service.getAllWorkouts({ mode, limit, sort })

        // Enviamos un mensaje del estado de la petición diciendo que ha salido bien y también pasamos la data
        res.status(200).send({status: "OK", data: allWorkouts})
    } catch(error) {
            res
            .status(error?.status || 500)
            .send({status: "FAILED GETALLWORKOUTS", data: {error: error?.message || error}})
    }
}

// Método que trae un solo entrenamiento
const getOneWorkout = (req, res) => {
    const { // Desestructuramos la petición
        // De la desestructuración, nos quedamos con lo que nos interesa, la ID del entrenamiento
        params: { workoutId }
    } = req; // Indicamos que viene del request
    if (!workoutId) { // Si está vacío le decimos que salga
        res
        .status(400)
        .send({
            status: "FAILED", 
            data: { error: "Parameter 'workoutID' can not be empty" }
        })
    }
    try {
    // guardamos en una variable la data que nos traiga el service
    const workout = workout_service.getOneWorkout(workoutId);
    res.status(200).send({status: "OK", data: workout}) // enviamos la respuesta de ok y le enviamos la data
    } catch(error) {
        res.status(500).send({status: error?.status || 500}).send({status: "FAILED", data: {error: error?.status || error}})
    }
}

const createNewWorkout = (req, res) => {
    const { body } = req;
    if (
        !body.name ||
        !body.mode ||
        !body.equipment ||
        !body.exercises ||
        !body.trainerTips
    ) {
        res.status(400).send({
            status: "FAILED",
            data: {
                error:
                "One of the following keys is missing or is empty in request body: ..."
            }
        })
    }
    const newWorkout = {
        name: body.name,
        mode: body.mode,
        equipment: body.equipment,
        exercises: body.exercises,
        trainerTips: body.trainerTips
    }
    try {
        const createNewWorkout = workout_service.createNewWorkout(newWorkout);
        res.status(201).send({ status: "OK", data: createNewWorkout})
    }catch(error) {
        res.status(error?.status || 500).send({ status: "FAILED", data: { error: error?.message || error } })
    }
}

const updateOneWorkout = (req, res) => {
    const {
        body,
        params: { workoutId },
    } = req;
    if (!workoutId) {
        res
        .status(400)
        .send({ 
            status: "FAILED", 
            data: "Parameter ':workoutId' can not be empty" })
    }
    try {
        const updateWorkout = workout_service.updateWorkout(workoutID, body)
        res.send({ status: "OK", data: updateWorkout })
    } catch (error) {
        res
        .status(error?.status || 500)
        .send({ 
            status: "FAILED", 
            data: { error: error?.message || error } })
    }
    
}

const deleteOneWorkout = (req, res) => {
    const {
        params: { workoutId },
    } = req;
    if (!workoutId) {
        res
        .status(400)
        .send({
            status: 'FAILED', 
            data: { error: "Parameter ':workoutId' can not be empty" }
            });
    }
    try {
        workout_service.deleteOneWorkout(workoutId);
        res.status(204).send({ status: "OK" })
    } catch(error) {
        res.status(error?.status || 500).send({ status: 500, data: { error: error?.message || error } })
    }
}

module.exports = {
    getAllWorkouts,
    getOneWorkout,
    createNewWorkout,
    updateOneWorkout,
    deleteOneWorkout
}