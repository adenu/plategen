
const numeroPlaca = document.querySelector('span#numero-placa');
const possibleLetters = ["i", "e", "a", "s", "b", "t", "o"];
const possibleNumbers = ["1", "3", "4", "5", "6", "7", "0"];
let normalWord;

const randomizeNumbers = () => {
fetch("./lista-final.json")
  .then(response => {
    return response.json();
  })
  .then(data => {
    randomPlaca = data[Math.floor(Math.random() * data.length)]
    randomPlaca = randomPlaca.substring(0, 3) + " " + randomPlaca.substring(2 + 1);
    numeroPlaca.innerHTML = randomPlaca;
    normalWord = randomPlaca;
    numeroPlaca.setAttribute('original', randomPlaca);

    possibleNumbers.forEach(number => {
      let letter = possibleLetters[possibleNumbers.indexOf(number)];
      normalWord = normalWord.replaceAll(number, letter.toUpperCase());
    })
    numeroPlaca.setAttribute('translated', normalWord.replace(' ', ''));
  });
};

randomizeNumbers();

const replaceNumbers = () => {

  if (numeroPlaca.innerHTML == numeroPlaca.getAttribute('translated')) {
    numeroPlaca.innerHTML = numeroPlaca.getAttribute('original');
  } else {
    numeroPlaca.innerHTML = numeroPlaca.getAttribute('translated');
  }
}

