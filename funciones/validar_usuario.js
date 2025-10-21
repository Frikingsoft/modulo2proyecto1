import { query } from "../config.js"

const validar= async (req,res,next)=>{
  const {usuario,contra,correo} =req.body
  
  if(correo!="" && usuario!="" && contra!=""){
    try{
        const buscar_correo = await query(
       "SELECT * FROM usuarios WHERE correo = ?", 
                [correo]
        )
        
      
        if(buscar_correo.length > 0){
            res.status(400).json("El usuario ya existe")
        }
       else{
             next()
        }
    }
    catch(error){
        console.error("Error al buscar usuario:", error);
        res.status(500).send("Error en el servidor")
    }
    
    
  }
  else{
    res.status(400).json("Debe ingresar datos correctos")
  }
}
export{
    validar
}