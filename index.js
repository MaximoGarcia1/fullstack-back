const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
require("dotenv").config();

//Setting Server and Database connection
const PORT = process.env.PORT;
mongoose
  .connect(process.env.MONGODB_URL)
  .then((err) => {
    console.log("Database is connected");
  })
  .catch((err) => {
    console.log("Hubo un error al conectarse a la base de datos ", { err });
  });

//Setting middlewares
app.use((req, res, next) => {
  console.log("No se especifico como debe ser el inicio de la ruta");
  console.log("Middleware 1");
  next();
});
app.use(express.json());
app.use(express.static("public"));

//Setting Database Schema
const taskSchema = new Schema({
  name: String,
  done: Boolean,
});
const Task = mongoose.model("Task", taskSchema, "Tasks");

//SETTING ROUTES
app.get("/", (req, res) => {
  res.send("Hola mundo");
});

app.get("/api/tasks", (req, res) => {
  Task.find()
    .then((tasks) => {
      res.status(200).json({ ok: true, data: tasks });
    })
    .catch(() => {
      res
        .status(400)
        .json({ ok: true, message: "Hubo un error al obtener las tareas" });
    });
});

app.post("/api/tasks", function (req, res) {
  const body = req.body;
  console.log({ body });
  Task.create({
    name: body.text,
    done: false,
  })
    .then((createdtask) => {
      res.status(201).json({
        ok: true,
        message: "Tarea creada correctamente",
        data: createdtask,
      });
    })
    .catch((err) => {
      res.status(400).json({ ok: false, message: "Error al crear su tarea" });
    });
});

app.put("/api/tasks/:id", function (req, res) {
  const body = req.body;
  const id = req.params.id
  console.log({ body });
  Task.findByIdAndUpdate(id , {
    name: body.text,
  })
    .then((updatedTask) => {
      res.status(200).json({
        ok: true,
        message: "Tarea editada correctamente",
        data: updatedTask,
      });
    })
    .catch((err) => {
      res.status(400).json({ ok: false, message: "Error al editar su tarea" });
    });
});

app.delete("/api/tasks/:id", function (req, res) {
  const id = req.params.id;
  Task.findByIdAndDelete(id)
    .then((deletedTask) => {
      res
        .status(200)
        .json({ ok: true, message: "Tarea eliminada correctamente" });
    })
    .catch((err) => {
      res
        .status(400)
        .json({ ok: true, message: "Hubo un error al eliminar la tarea" });
    });
});

//PONER A ESCUCHAR LA APP EN EL PUERTO 4000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
