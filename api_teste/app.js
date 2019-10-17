const fs = require("fs");
const request = require("request");
const ffmpeg = require("fluent-ffmpeg");


const file = "./audio/Aplication.ogg";

const url = "https://stream.watsonplatform.net/speech-to-text/api/v1/recognize?model=pt-BR_NarrowbandModel";

const options = {
    method: "post",
    strictSSL: false,
    body: fs.createReadStream(file),
    headers: {
        "Content-Type": "audio/ogg",
        "Authorization": `Basic ${Buffer.from("apikey:7BWwaCIZrEWjb5NshVUz4bAS2KMZb7CKnWFUyjBl3bz0").toString("base64")}`
    }
}

function convert(input, output, callback) {
    ffmpeg(input)
        .output(output)
        .on('end', function() {                    
            console.log('conversion ended');
            callback(null);
        }).on('error', function(err){
            console.log('error: ', err);
            callback(err);
        }).run();
}

convert('./audio/Gcb.m4a', './audio/output.ogg', function(err){
   if(!err) {
       console.log('conversion complete');
   }
});



function comandoVoz(url, options) {
    try {
        return new Promise((resolve, reject) => {
            request(url, options, (erro, response, data) => {
                if (erro || response.statusCode != 200) {
                    let tipoErro = erro ? erro : response.statusCode;
                    tipoErro = !isNaN(tipoErro) ? parseInt(tipoErro) : (`${tipoErro}`).replace("Error:", "").trim();
                    reject(tipoErro);
                } else {
                    const resultado = JSON.parse(data).results[0].alternatives[0].transcript;
                    resolve(resultado);
                }
            })
        })
    }catch{
        console.log("Houve um erro na requisição da api")
    }
}

comandoVoz(url, options)
    .then(res => console.log(res))
    .catch(error => console.log("Erro", error))