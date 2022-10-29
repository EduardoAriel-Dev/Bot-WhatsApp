const { sendMedia, sendMessage, lastTrigger, sendMessageButton, readChat } = require('../controllers/send');
let json = require ('../flow/horarios.json')


async function horariosAvanzados(client, from, message) {
    let msg = `👨‍🎓 Aqui tiene el link con los horarios de avanzados: `

    switch (true) {
        //**Ingenieria
        case message.includes("informatica"):
            msg += `\n${json["ing petroleo-avanzado"]}`; break;
        case message.includes("petro"):
            msg += `\n${json["ing petroleo-avanzado"]}`; break;
        case message.includes("bioing"):
            msg += `\n${json["ing bioingenieria-avanzado"]}`; break;
        case message.includes("electro"):
            msg += `\n${json["ing electromecanica-avanzado"]}`; break;
        case message.includes("industria"):
            msg += `\n${json["ing industrial-avanzado"]}`; break;
        case message.includes("agraria"):
            msg += `\n${json["ing agraria-avanzado"]}`; break;
        case message.includes("transporte"):
            msg += `\n${json["ing transporte-avanzado"]}`; break;

        //**Salud
        case message.includes("medicina"):
            msg += `\n${json["salud medicina-avanzado"]}`; break;
        case message.includes("bioqui"):
            msg += `\n${json["salud bioquimica-avanzado"]}`; break;        
        case message.includes("enfermeria"):
            msg += `\n${json["salud enfermeria-avanzado"]}`; break;
        case message.includes("kine"):
            msg += `\n${json["salud kine-avanzado"]}`; break;
        case message.includes("emergencias"):
            msg += `\n${json["salud emergencias-avanzado"]}`; break;
        case message.includes("gestion de pacientes"):
            msg += `\n${json["salud gestion pacientes-avanzado"]}`; break;

        //*Administracion
        case message.includes("economia"):
            msg += `\n${json["salud medicina-avanzado"]}`; break;
        case message.includes("trabajo"):
            msg += `\n${json["salud medicina-avanzado"]}`; break;
        case message.includes("administracion"):
            msg += `\n${json["salud medicina-avanzado"]}`; break;
        case message.includes("ambiental"):
            msg += `\n${json["salud medicina-avanzado"]}`; break;
        case message.includes("relaciones"):
            msg += `\n${json["salud medicina-avanzado"]}`; break;           
    }

    await sendMessage(client, from, msg)
}

async function horariosIngresantes(client, from, message) {
    let msg = `👨‍🎓 Aqui tiene el link con los horarios de ingresantes: `

    switch (true) {
        //**Ingenieria
        case message.includes("informatica"):
            msg += `\n${json["ing petroleo-ingresantes"]}`; break;
        case message.includes("petro"):
            msg += `\n${json["ing petroleo-ingresantes"]}`; break;
        case message.includes("bioing"):
            msg += `\n${json["ing bioingenieria-ingresantes"]}`; break;
        case message.includes("electro"):
            msg += `\n${json["ing electromecanica-ingresantes"]}`; break;
        case message.includes("industria"):
            msg += `\n${json["ing industrial-ingresantes"]}`; break;
        case message.includes("agraria"):
            msg += `\n${json["ing agraria-ingresantes"]}`; break;
        case message.includes("transporte"):
            msg += `\n${json["ing transporte-ingresantes"]}`; break;

        //**Salud
        case message.includes("medicina"):
            msg += `\n${json["salud medicina-ingresantes"]}`; break;
        case message.includes("bioqui"):
            msg += `\n${json["salud bioquimica-ingresantes"]}`; break;        
        case message.includes("enfermeria"):
            msg += `\n${json["salud enfermeria-ingresantes"]}`; break;
        case message.includes("kine"):
            msg += `\n${json["salud kine-ingresantes"]}`; break;
        case message.includes("emergencias"):
            msg += `\n${json["salud emergencias-ingresantes"]}`; break;
        case message.includes("gestion de pacientes"):
            msg += `\n${json["salud gestion pacientes-ingresantes"]}`; break;

        //*Administracion
        case message.includes("economia"):
            msg += `\n${json["salud medicina-ingresantes"]}`; break;
        case message.includes("trabajo"):
            msg += `\n${json["salud medicina-ingresantes"]}`; break;
        case message.includes("administracion"):
            msg += `\n${json["salud medicina-ingresantes"]}`; break;
        case message.includes("ambiental"):
            msg += `\n${json["salud medicina-ingresantes"]}`; break;
        case message.includes("relaciones"):
            msg += `\n${json["salud medicina-ingresantes"]}`; break;           
    }

    await sendMessage(client, from, msg)
}

module.exports = { horariosAvanzados, horariosIngresantes }