const express  = require('express')

const app = express();
const puerto = 3000;

//conexion bdd
const fs = require('node:fs');
const { DatabaseSync } = require('node:sqlite');

fs.mkdirSync('datos', { recursive: true });

// Abrimos base
const db = new DatabaseSync('datos/tareas.db');

// Crea tareas
db.exec(`
  CREATE TABLE IF NOT EXISTS tareas (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    titulo TEXT NOT NULL,
    completada INTEGER NOT NULL DEFAULT 0
  )
`);

app.use(express.json());

//ruta para comprobar que la api funcionca
app.get('/',(req,res) =>{
    res.send('API DE TAREAS FUNCIONANDO')
})

// Si la tabla esta vacía, cargamos tres tareas de ejemplo
const cantidad = db.prepare('SELECT COUNT(*) AS total FROM tareas').get();

if (cantidad.total === 0) {
  const insertar = db.prepare('INSERT INTO tareas (titulo, completada) VALUES (?, ?)');
  insertar.run('Estudiar Git', 1);
  insertar.run('Armar el Dockerfile', 0);
  insertar.run('Escribir el README', 0);
}

// Devuelve todas las tareas
app.get('/tareas', (req, res) => {
  const tareas = db.prepare('SELECT * FROM tareas').all();
    res.json(tareas);
});

// Devuelve una tarea
app.get('/tareas/:id', (req, res) => {
  const id = Number(req.params.id);
  const tarea = db.prepare('SELECT * FROM tareas WHERE id = ?').get(id);

  if (!tarea) {
    return res.status(404).json({ error: 'Tarea no encontrada' });
  }

  res.json(tarea);
});0

//crear tarea 
app.post('/tareas', (req, res) => {
  const { titulo } = req.body || {};

  if (!titulo) {
    return res.status(400).json({ error: 'El título es obligatorio' });
  }

  const resultado = db.prepare('INSERT INTO tareas (titulo) VALUES (?)').run(titulo);

    const nuevaTarea = {
    id: resultado.lastInsertRowid,
    titulo: titulo,
    completada: 0
    };
  res.status(201).json(nuevaTarea);
});


//INCIAR SERV
app.listen(puerto, ()=>{
    console.log(`SERVIDOR ESCUCHANDO EL PUERTO ${puerto}`);
})

