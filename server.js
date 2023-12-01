require("dotenv").config();

const express = require("express");
const mysql = require("mysql");
const app = express();
const port = 3001;
const todoRoutes = require("./apiRoutes/todo");

// Créez une connexion à la base de données
const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  port: process.env.DB_PORT,
  connectionLimit: 10,
});

app.use(express.json());

// api routes avec en parametre la conexion à la base de donnée
app.use(todoRoutes(db));

// Fermeture de la connexion à la base de données avant de quitter le serveur
process.on("SIGINT", () => {
  db.end((err) => {
    if (err) console.error(err);
    process.exit();
  });
});

app.listen(port, () => {
  console.log(`Serveur en cours d'exécution sur le port ${port}`);
});
