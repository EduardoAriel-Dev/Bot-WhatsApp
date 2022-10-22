require('dotenv').config()
const fs = require('fs');
const express = require('express');
const cors = require('cors')
const qrcode = require('qrcode-terminal');
const { Client,LocalAuth  } = require('whatsapp-web.js');
const mysqlConnection = require('./config/mysql')
const { middlewareClient } = require('./middleware/client')
const { generateImage, cleanNumber, checkEnvFile, createClient, isValidNumber } = require('./controllers/handle')
const { connectionReady, connectionLost } = require('./controllers/connection')
const { saveMedia } = require('./controllers/save')
const { getMessages, responseMessages, bothResponse } = require('./controllers/flows')
const { sendMedia, sendMessage, lastTrigger, sendMessageButton, readChat } = require('./controllers/send');
const { response } = require('express');
const { Console } = require('console');

//Datos
const { graph } = require('./paths/Dijkstra.js');
const { aulasSavioPB, aulasSavioP1 } = require ('./paths/aulas.js');
const { horariosAvanzados } = require('./flow/responseFunctions.js')
//=====

const app = express();
app.use(cors())
app.use(express.json())
const MULTI_DEVICE = process.env.MULTI_DEVICE || 'true';
const server = require('http').Server(app)

const port = process.env.PORT || 3000
var client;
app.use('/', require('./routes/web'))

//Escuchador de mensajes
const listenMessage = () => client.on('message', async msg => {
    const { from, body, hasMedia } = msg;

    if(!isValidNumber(from)){
        return
    }
    if (from === 'status@broadcast') {
        return
    }
    message = body.toLowerCase();
    console.log('(*) Mensaje Recibido: -> ', message)
    const number = cleanNumber(from)
    await readChat(number, message)

    //Guardamos archivo multimedia que envia
    if (process.env.SAVE_MEDIA && hasMedia) {
        const media = await msg.downloadMedia();
        saveMedia(media);
    }

    /**
     * Si estas usando dialogflow solo manejamos una funcion todo es IA
     */

    if (process.env.DATABASE === 'dialogflow') {
        if(!message.length) return;
        const response = await bothResponse(message);
        await sendMessage(client, from, response.replyMessage);
        if (response.media) {
            sendMedia(client, from, response.media);
        }
        return
    }

    /**
    * Ver si viene de un paso anterior
    * Aqui podemos ir agregando más pasos
    * a tu gusto!
    */

    const lastStep = await lastTrigger(from) || null;
    if (lastStep) {
        const response = await responseMessages(lastStep)
        await sendMessage(client, from, response.replyMessage);
    }

    //*Responder con palabras claves
    const step = await getMessages(message);

    if (step) {
        const response = await responseMessages(step);
        await sendMessage(client, from, response.replyMessage, response.trigger);

        if(response.hasOwnProperty('actions')){
            const { actions } = response;
            await sendMessageButton(client, from, null, actions);
            return
        }

        if (!response.delay && response.media) {
            sendMedia(client, from, response.media);
        }
        if (response.delay && response.media) {
            setTimeout(() => {
                sendMedia(client, from, response.media);
            }, response.delay)
        }
        return
    }

    //ejemplo de flujo de mensaje
    var aux = message.replace(/\s/g, '')
    
    // if (aux.includes('savio')) {
    //     if (aulasSavioPB.includes(aux)) {
    //         let camino = graph.Dijkstra("Entrada Calchaqui", "Savio PB")
    //         console.log(camino)
    //         await sendMessage(client, from, camino.toString())
    //         //await sendMessage(client, from, "Esa aula en el edificio Savio existe")
    //     }
    //     // else {
    //     //     await sendMessage(client, from, "Esa aula en el edificio Savio NO existe")
    //     // }
    //     if (aulasSavioP1.includes(aux)) {
    //         let camino = graph.Dijkstra("Entrada Calchaqui", "Savio P1")
    //         console.log(camino)
    //         await sendMessage(client, from, camino.toString())
    //     }
    // }

    //Llamadas a funciones
    horariosAvanzados(client, from, aux)

    //Si quieres tener un mensaje por defecto
    if (process.env.DEFAULT_MESSAGE === 'true') {
        const response = await responseMessages('DEFAULT')
        await sendMessage(client, from, response.replyMessage, response.trigger);
      
        if(response.hasOwnProperty('actions')){
            const { actions } = response;
            await sendMessageButton(client, from, null, actions);
        }
        return
    }
});

//*Creación de nuevo Cliente
client = new Client({
        authStrategy: new LocalAuth(),
        puppeteer: { headless: true }
    });
    
client.on('qr', qr => generateImage(qr, () => {
        qrcode.generate(qr, { small: true });
        
        console.log(`Ver QR generado -> http://localhost:${port}/qr`)
        socketEvents.sendQR(qr)
}))

client.on('ready', (a) => {
        connectionReady()
        listenMessage()
        // socketEvents.sendStatus(client)
});

client.on('auth_failure', (e) => {
    //Fallo al identificar nuevo usuario
});

client.on('authenticated', () => {
        console.log('\n*El usuario fue AUTENTICADO!*');
        console.log("[El chatBOT UNAJ debería ya estar funcionando... ]") 
});

client.initialize();



//Verificacion conexion con base de datos
if (process.env.DATABASE === 'mysql') {
    mysqlConnection.connect()
}

server.listen(port, () => {
    console.log(`El server esta listo por el puerto ${port}`);
})
checkEnvFile();

