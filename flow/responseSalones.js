const { sendMedia, sendMessage, lastTrigger, sendMessageButton, readChat } = require('../controllers/send');
let json = require ('../flow/salones.json')

//arreglo de los salones
let salonesMosconi= ["1","2","3","4","5","6","7","16","17","52","53","54","55","120","129","130","131","132","134","136","138","139","140","205","206","212","214","305","306","307","308","310","312","314","316","407","408","409","410","412","414","416","418","420"];
let salonesSavio = ["20","21","22","23","24","25","26","27","28","29","30","31","32","33","34","35","36"]
let salonPistarini = ["61","62","63","64","65","66","67","68","69","70"] 


//Funcion Main.
async function salonesUnaj(client,from,message){
    let clave= message.split("-");
    let msg = `Buscando salon, un momento *Porfavor*...:`;
    await sendMessage(client, from, msg)

//Switch de las sedes de la unaj  
    switch(true){
        case clave[0] === "ypf":
            aulas(client, from, clave[2],clave[1], message); break;
        default:
            msg = `La sede buscada no se encontro.`;
            await sendMessage(client, from, msg); break;
    }
}
//Busqueda del salon segun el edificio
async function aulas(client, from, aula,edificio, msg){

    let encotrado=true;
    switch(true){
        case edificio === "mosconi":
            if(salonesMosconi.includes(aula)){
                encotrado=false;
                await sendMessage(client, from,`${json[msg]}`)
            }
            break;
        case edificio==="savio" || edificio==="m.savio":
            if(salonesSavio.includes(aula)){
                encotrado=false;
                await sendMessage(client, from,`${json[msg]}`)
            }
            break;
        case edificio==="pistarini":
            if(salonPistarini.includes(aula)){
                encotrado=false;
                await sendMessage(client,from,`${json[msg]}`)
            }
            break;
        default:
            msg = `No se encontro el edificio buscado.`;
                encotrado=false;
                await sendMessage(client, from, msg);
            break;  
    }
    if(encotrado){
        msg = `No se encontro el salon buscado.`;
        await sendMessage(client, from, msg);
    }

}

module.exports = {salonesUnaj}