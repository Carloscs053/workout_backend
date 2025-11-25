const express = require("express") // Importamos la librería express
const router = express.Router() // Creamos el enrutador
const workoutController = require("../../controllers/workout_controller") // Importamos el controlador del servidor
const apicache = require('apicache')
const cache = apicache.middleware;

// Estas son las rutas que vamos a tener y el método del controlador que van a llamar
router.get("/", workoutController.getAllWorkouts)
router.get("/:workoutId", workoutController.getOneWorkout)
router.post("/", workoutController.createNewWorkout)
router.patch("/update/:workoutId", workoutController.updateOneWorkout)
router.delete("/delete/:workoutId", workoutController.deleteOneWorkout)
router.get('/', cache('1 minutes'), workoutController.getAllWorkouts)

module.exports = router // Exportamos el enrutador para que lo pueda usar el index