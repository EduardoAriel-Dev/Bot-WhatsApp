const connectionReady = (cb = () =>{}) => {
    console.log('El bot esta listo para funcionar...')
    console.log('Prueba su funcionamiento escribiendo "hola"');
    cb()
}

const connectionLost = (cb = () =>{}) => {
    console.log('** Error de autentificacion vuelve a generar el QRCODE (Borrar el archivo session.json) **');
    cb()
}


module.exports = {connectionReady, connectionLost}