const { sendMedia, sendMessage, lastTrigger, sendMessageButton, readChat } = require('../controllers/send');

async function horariosAvanzados(client, from, message) {
    switch (true) {
        //**Ingenieria
        case message.includes("informatica"):
            await sendMedia(client, from, "../mediaSend/Horarios Ing. en Informática 2C 2022.xlsx")
            break;
        case message.includes("petro"):
            //excel de petroleo
            break;
        case message.includes("bioing"):
            //excel de bioingenieria
            break;
        case message.includes("electro"):
            //excel de electromecanica
            break;
        case message.includes("industria"):
            //excel de industrial
            break;
        case message.includes("agraria"):
            //excel de ciencias agrarias
            break;
        case message.includes("transporte"):
            //excel de ing transporte
            break;

        //**Salud
        case message.includes("medicina"):
            //excel de medicina
            break;
        case message.includes("bioqui"):
            //excel de bioquimica
            break;
        case message.includes("enfermeria"):
            //excel de enfermeria
            break;
        case message.includes("kine"):
            //excel de kinesiologia
            break;
        case message.includes("emergencias"):
            //excel de emergencias y desastres
            break;
        case message.includes("farmacia"):
            //excel de farmacia hospitalaria
            break;
        case message.includes("gestion de pacientes"):
            //excel de gestion pacientes
            break;

        //*Administracion
        case message.includes("economia"):
            //excel de economia
            break;
        case message.includes("trabajo"):
            //excel de trabajo social
            break;
        case message.includes("administracion"):
            //excel de administracion
            break;
        case message.includes("ambiental"):
            //excel de gestion ambiental
            break;
        case message.includes("relaciones"):
            //excel de relacion y trabajo
            break;        
    }
}

async function horariosIngresantes(client, from, message) {
    switch (true) {
        //**Ingenieria
        case message.includes("informatica"):
            //excel de ingresantes informatica
            break;
        case message.includes("petro"):
            //excel de petroleo
            break;
        case message.includes("bioing"):
            //excel de bioingenieria
            break;
        case message.includes("electro"):
            //excel de electromecanica
            break;
        case message.includes("industria"):
            //excel de industrial
            break;
        case message.includes("agraria"):
            //excel de ciencias agrarias
            break;
        case message.includes("transporte"):
            //excel de ing transporte
            break;

        //**Salud
        case message.includes("medicina"):
            //excel de medicina
            break;
        case message.includes("bioqui"):
            //excel de bioquimica
            break;
        case message.includes("enfermeria"):
            //excel de enfermeria
            break;
        case message.includes("kine"):
            //excel de kinesiologia
            break;
        case message.includes("emergencias"):
            //excel de emergencias y desastres
            break;
        case message.includes("farmacia"):
            //excel de farmacia hospitalaria
            break;
        case message.includes("gestion de pacientes"):
            //excel de gestion pacientes
            break;

        //*Administracion
        case message.includes("economia"):
            //excel de economia
            break;
        case message.includes("trabajo"):
            //excel de trabajo social
            break;
        case message.includes("administracion"):
            //excel de administracion
            break;
        case message.includes("ambiental"):
            //excel de gestion ambiental
            break;
        case message.includes("relaciones"):
            //excel de relacion y trabajo
            break;        
    }
}

module.exports = { horariosAvanzados, horariosIngresantes }