const enviar =async()=>{
    // si es id # , si es clase .
    let usuario = document.querySelector("#usuario").value
    let contra = document.querySelector("#contra").value
    let persona={
        usuario,
        contra
    } 
    await fetch("/registro",{
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(persona)
    })

}
