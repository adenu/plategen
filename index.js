// Converte o txt para json
const fs = require("fs");
const raw = fs.readFileSync("./palavras.txt").toString().replace('\r', '');
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

json.forEach(entrada => {
  let tamanhoPalavra = entrada.palavra;
  tamanhoPalavra = tamanhoPalavra.length;

  let specialChars = ['ç', 'ã', 'á', 'é', 'ê', 'í', 'ó', 'ô', 'õ', 'ú']
  let commonChars = ['c', 'a', 'a', 'e', 'e', 'i', 'o', 'o', 'o', 'u']

  const replaceSpecialChars = sc => {
    let cc = commonChars[specialChars.indexOf(sc)];
    entrada.palavra = entrada.palavra.replace(sc, cc);
  }

  if (tamanhoPalavra === 8) {
    specialChars.forEach(sc => replaceSpecialChars(sc))
    filtroTamanho.push(entrada.palavra.slice(0, -1));
  }
});

filtroTamanho.forEach(entrada => {

  entrada = entrada.toLowerCase();

  let possiblePos = [3, 5, 6];
  let possibleLetters = ["i", "e", "a", "s", "b", "t", "o"];
  let possibleNumbers = ["1", "3", "4", "5", "6", "7", "0"];
  let entradaScore = 0;

  const testChar = pos => {
    possibleLetters.forEach(letter => {
      let index = possibleNumbers[possibleLetters.indexOf(letter)];
      entrada.charAt(pos) == letter && (entrada = entrada.substring(0, pos) + index + entrada.substring(pos + 1), entradaScore++);
    })
  }

  possiblePos.forEach(pos => testChar(pos))
  entradaScore === 3 && filtroChars.push(entrada.toUpperCase());

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