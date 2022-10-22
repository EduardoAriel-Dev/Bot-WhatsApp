const { sendMedia, sendMessage, lastTrigger, sendMessageButton, readChat } = require('../controllers/send');

async function horariosAvanzados(client, from, message) {
    if (message.includes("avanzado") && message.includes("informatica") ) {
        await sendMessage(client, from, "Funciona?")
        //await sendMedia(client, from, "https://docs.google.com/spreadsheets/d/1mV2vkIyn0UcVfLDgWefeRPyMaivvVOGUB-7vzHgydSs/export?format=xlsx&id=1mV2vkIyn0UcVfLDgWefeRPyMaivvVOGUB-7vzHgydSs")
        await sendMedia(client, from, "../mediaSend/Horarios Ing. en Informática 2C 2022.xlsx")
    }
}

module.exports = { horariosAvanzados }