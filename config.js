import express from "express";
import hbs from "hbs";
import path from "path";
import mysql from "mysql2";
import util from 'util';
import { fileURLToPath } from 'url';



const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuración de la conexión MySQL
const conexion = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "unisoft"
});

// Promisificar los métodos de conexión
const connectar = util.promisify(conexion.connect).bind(conexion);
const query = util.promisify(conexion.query).bind(conexion);

// Iniciar Base de datos
async function inicializarBaseDeDatos() {
  try {
    await connectar();
    console.log("Conectado a la base de datos MySQL");
  } catch (error) {
    console.error("Error al conectar a MySQL:", error);
  }
}

let pagina = path.join(__dirname, "views");
const servidor = express();
servidor.use(express.json());
servidor.use(express.urlencoded({ extended: true })); // Para procesar formularios
servidor.use(express.static(pagina));
servidor.use(express.static(path.join(__dirname,"node_modules/bulma/css")))
servidor.set("view engine", "hbs");
hbs.registerPartials(path.join(__dirname, '/views/partials'));

export {
  inicializarBaseDeDatos,
  servidor,
  query,
  conexion
};
