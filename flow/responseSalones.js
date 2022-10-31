const { sendMedia, sendMessage, lastTrigger, sendMessageButton, readChat } = require('../controllers/send');
let json = require ('../flow/salones.json')
// let sede=["ypf"];
let edificios=["mosconi","lanteri","savio"];
let salonesMosconi=[1,2,3,4,5,6,7,16,17,52,53,55,120,129,130,131,132,134,136,138,139,140,205,206,212,214,305,306,307,308,310,312,314,316,"407",408,409,410,412,414,416,418,420];
//agregar un array para cada edificio

//let clave= message.split("-");

async function salonesUnaj(client,from,message){
    let clave= message.split("-");
    let msg = `El salon que busca esta en:`;
    await sendMessage(client, from, msg)

    // console.log(clave)

    switch(true){
        case clave[0] === "ypf":
            if (clave[1] === "mosconi") {
                console.log("holaaaaa")
                aulas(client, from, clave[2], message)
            };
        break; 
            // switch(true){
            //     case clave[1]===edificios.includes("mosconi"):
            //         console.log("holaaa")
            //         aulas(client, from, clave[1], message);
            //         break;
            // };
            // break;
    }
}
async function aulas(client, from, aula, msg){
    console.log(aula)

    // if (edificio==="mosconi"){
        if(salonesMosconi.includes(aula)){
            await sendMessage(client, from,`${json[msg]}`)
        }
        else{
            await sendMessage(client, from, "salon no encontrado")
        }
    
}

module.exports = {salonesUnaj}