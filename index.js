import { servidor, inicializarBaseDeDatos, query, conexion } from "./config.js";
import bcrypt from "bcryptjs";

// Inicializar base de datos
inicializarBaseDeDatos();
const validar=(req,res,next)=>{
  const {usuario,contra,correo} =req.body
  if(correo!="" && usuario!="" && contra!=""){
    next()
  }
  else{
    res.status(400).json("Debe ingresar datos correctos")
  }
}
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
servidor.put("/carrito", validar ,(req, res) => {
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
servidor.post("/registro", async (req, res) => {
  const { usuario , contra } = req.body
  console.log(usuario,contra)
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