const fs = require("fs");
const request = require("request");

const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
const ffmpeg = require('fluent-ffmpeg');
ffmpeg.setFfmpegPath(ffmpegPath);

//const file = "./audio/file.ogg";

//const url = "https://stream.watsonplatform.net/speech-to-text/api/v1/recognize?model=pt-BR_NarrowbandModel";

/*const options = {
    method: "post",
    strictSSL: false,
    body: fs.createReadStream(file),
    headers: {
        "Content-Type": "audio/ogg",
        "Authorization": `Basic ${Buffer.from("apikey:7BWwaCIZrEWjb5NshVUz4bAS2KMZb7CKnWFUyjBl3bz0").toString("base64")}`
    }
}*/

function convertFileFormat(file, destination, error, progressing, finish) {

ffmpeg(file)
    .on('error', (err) => {
        console.log('An error occurred: ' + err.message);
        if (error) {
            error(err.message);
        }
    })
    .on('progress', (progress) => {
        // console.log(JSON.stringify(progress));
        console.log('Processing: ' + progress.targetSize + ' KB converted');
        if (progressing) {
            progressing(progress.targetSize);
        }
    })
    .on('end', () => {
        console.log('converting format finished !');
        if (finish) {
            finish();
        }
    })
    .save(destination);

    }

    convertFileFormat('./audio/Gcb.m4a', './audio/file.ogg', function (errorMessage) {

        }, null, function () {
            console.log("success");
        });


/*function comandoVoz(url, options) {
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
    }catch(e){
        console.log("Houve um erro na requisição da api")
    }
}

comandoVoz(url, options)
    .then(res => console.log(res))
    .catch(error => console.log("Erro", error))*/