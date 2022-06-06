// Converte o txt para json
const fs = require("fs");
const raw = fs.readFileSync("./palavras.txt").toString().replace('\r','');
const data = raw.split("\n");
const headers = data.shift().split("|");
let json = [];
for (let i = 0; i < data.length; i++) {
  if (/^\s*$/.test(data[i])) continue;
  const contentCells = data[i].split("|");
  let jsonLine = {};
  for (let i = 0; i < contentCells.length; i++)
    jsonLine[headers[i]] = contentCells[i];
  json.push(jsonLine);
}

// Filtros
let filtroTamanho = [];
let filtroChars = [];

json.forEach((entrada) => {
  let tamanhoPalavra = entrada.palavra.length;
  entrada.palavra = entrada.palavra.replace('\r', '')
  if (tamanhoPalavra === 8) {
    entrada.palavra = entrada.palavra.replace("ç", "c");
    entrada.palavra = entrada.palavra.replace("ã", "a");
    entrada.palavra = entrada.palavra.replace("á", "a");
    entrada.palavra = entrada.palavra.replace("é", "e");
    entrada.palavra = entrada.palavra.replace("ê", "e");
    entrada.palavra = entrada.palavra.replace("í", "i");
    entrada.palavra = entrada.palavra.replace("ó", "o");
    entrada.palavra = entrada.palavra.replace("ô", "o");
    entrada.palavra = entrada.palavra.replace("õ", "o");
    entrada.palavra = entrada.palavra.replace("ú", "u");
    filtroTamanho.push(entrada.palavra);
  }
});

filtroTamanho.forEach((entrada) => {
  let terceiroCaracter = entrada.charAt(3).toLowerCase();
  if (terceiroCaracter == "i") {
    entrada = entrada.substring(0, 3) + "1" + entrada.substring(3 + 1);
  } else if (terceiroCaracter == "e") {
    entrada = entrada.substring(0, 3) + "3" + entrada.substring(3 + 1);
  } else if (terceiroCaracter == "a") {
    entrada = entrada.substring(0, 3) + "4" + entrada.substring(3 + 1);
  } else if (terceiroCaracter == "s") {
    entrada = entrada.substring(0, 3) + "5" + entrada.substring(3 + 1);
  } else if (terceiroCaracter == "b") {
    entrada = entrada.substring(0, 3) + "6" + entrada.substring(3 + 1);
  } else if (terceiroCaracter == "t") {
    entrada = entrada.substring(0, 3) + "7" + entrada.substring(3 + 1);
  } else if (terceiroCaracter == "o") {
    entrada = entrada.substring(0, 3) + "0" + entrada.substring(3 + 1);
  }

  let quintoCaracter = entrada.charAt(5).toLowerCase();
  if (quintoCaracter == "i") {
    entrada = entrada.substring(0, 5) + "1" + entrada.substring(5 + 1);
  } else if (quintoCaracter == "e") {
    entrada = entrada.substring(0, 5) + "3" + entrada.substring(5 + 1);
  } else if (quintoCaracter == "a") {
    entrada = entrada.substring(0, 5) + "4" + entrada.substring(5 + 1);
  } else if (quintoCaracter == "s") {
    entrada = entrada.substring(0, 5) + "5" + entrada.substring(5 + 1);
  } else if (quintoCaracter == "b") {
    entrada = entrada.substring(0, 5) + "6" + entrada.substring(5 + 1);
  } else if (quintoCaracter == "t") {
    entrada = entrada.substring(0, 5) + "7" + entrada.substring(5 + 1);
  } else if (quintoCaracter == "o") {
    entrada = entrada.substring(0, 5) + "0" + entrada.substring(5 + 1);
  }

  let sextoCaracter = entrada.charAt(6).toLowerCase();
  if (sextoCaracter == "i") {
    entrada = entrada.substring(0, 6) + "1" + entrada.substring(6 + 1);
    filtroChars.push(entrada.toUpperCase());
  } else if (sextoCaracter == "e") {
    entrada = entrada.substring(0, 6) + "3" + entrada.substring(6 + 1);
    filtroChars.push(entrada.toUpperCase());
  } else if (sextoCaracter == "a") {
    entrada = entrada.substring(0, 6) + "4" + entrada.substring(6 + 1);
    filtroChars.push(entrada.toUpperCase());
  } else if (sextoCaracter == "s") {
    entrada = entrada.substring(0, 6) + "5" + entrada.substring(6 + 1);
    filtroChars.push(entrada.toUpperCase());
  } else if (sextoCaracter == "b") {
    entrada = entrada.substring(0, 6) + "6" + entrada.substring(6 + 1);
    filtroChars.push(entrada.toUpperCase());
  } else if (sextoCaracter == "t") {
    entrada = entrada.substring(0, 6) + "7" + entrada.substring(6 + 1);
    filtroChars.push(entrada.toUpperCase());
  } else if (sextoCaracter == "o") {
    entrada = entrada.substring(0, 6) + "0" + entrada.substring(6 + 1);
    filtroChars.push(entrada.toUpperCase());
  }

});


const listaFinal = JSON.stringify(filtroChars);

function writeNewFile() {
  fs.writeFile("./lista-final.json", listaFinal, "utf8", function (err) {
    if (err) {
      return console.log(err);
    }

    console.log("The file was saved!");
  });
}

// Reescrever arquivo lista-final
writeNewFile();