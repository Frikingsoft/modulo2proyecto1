import { servidor, inicializarBaseDeDatos, query, conexion } from "./config.js";
import bcrypt from "bcryptjs";

// Inicializar base de datos
inicializarBaseDeDatos();

const menu = [
  { nombre: "inicio", ruta: "/", icono: "" },
  { nombre: "contacto", ruta: "/contacto", icono: "" },
  { nombre: "ofertas", ruta: "/ofertas", icono: "" },
  { nombre: "carrito", ruta: "/carrito", icono: "" },
  { nombre: "login", ruta: "/carrito", icono: "" }
];

const carrito = [
  {
    nombre: "Memoria RAM",
    precio: 90,
    foto: ""
  },
  {
    nombre: "CPU Ryzen 7",
    precio: 500,
    foto: ""
  },
  {
    nombre: "Intel I7",
    precio: 700,
    foto: ""
  }
];

servidor.get("/", (req, res) => {
  res.render("index.hbs", { menu, carrito });
});

servidor.get("/carrito", (req, res) => {
  res.render("carrito.hbs", { menu, carrito });
});

servidor.get("/contacto", (req, res) => {
  res.render("contacto.hbs", { menu });
});

servidor.get("/ofertas", (req, res) => {
  res.render("ofertas.hbs", { menu });
});

servidor.post("/registro", async (req, res) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    let { nombre, apellido, contra, correo } = req.body;
    contra = bcrypt.hashSync(contra, salt);
   
    // Corregida la consulta SQL - los valores deben estar entre comillas
    await query(`INSERT INTO usuarios (nombre, apellido, contra, correo) 
                 VALUES ('${nombre}', '${apellido}', '${contra}', '${correo}')`);
    
    res.send("Usuario guardado correctamente");
  } catch (error) {
    console.error("Error al registrar usuario:", error);
    res.status(500).send("Error al registrar usuario");
  }
});

// Iniciar servidor
servidor.listen(80, () => {
  console.log("Servidor ejecutándose en el puerto 80");
});

// Cerrar conexión al terminar
process.on('SIGINT', () => {
  conexion.end();
  process.exit();
});