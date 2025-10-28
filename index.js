import { servidor, inicializarBaseDeDatos, query, conexion } from "./config.js";
import { validar } from "./funciones/validar_usuario.js"
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
// get(Obtener) , post(Enviar), put(actualizar) , delete(Borrar)
servidor.get("/", (req, res) => {
  res.render("index.hbs", { menu, carrito });
})

servidor.get("/carrito", (req, res) => {
  res.render("carrito.hbs", { menu, carrito });
})
// middleware: funcion que se ejecuta antes de entrar a la ruta
servidor.put("/carrito", (req, res) => {
  res.render("carrito.hbs", { menu, carrito });
})
servidor.delete("/carrito", (req, res) => {
  res.render("carrito.hbs", { menu, carrito });
})
servidor.get("/contacto", (req, res) => {
  res.render("contacto.hbs", { menu });
});

servidor.get("/ofertas", (req, res) => {
  res.render("ofertas.hbs", { menu });
});
servidor.get("/registro",(req,res)=>{
  res.render("registro.hbs")
})
servidor.post("/registro",async (req, res) => {
  console.log(req.body)
  res.status(200).send("usuario casi registrado")
})

// Iniciar servidor
servidor.listen(80, () => {
  console.log("Servidor ejecutándose en el puerto 80");
});

// Cerrar conexión al terminar
process.on('SIGINT', () => {
  conexion.end();
  process.exit();
});