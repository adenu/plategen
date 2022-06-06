
function randomizeNumbers() {
fetch("./lista-final.json")
  .then(response => {
    return response.json();
  })
  .then(data => {
    let numeroPlaca = document.querySelector('span#numero-placa');
    randomPlaca = data[Math.floor(Math.random() * data.length)]
    randomPlaca = randomPlaca.substring(0, 3) + " " + randomPlaca.substring(2 + 1);
    numeroPlaca.innerHTML = randomPlaca;
  });
};

randomizeNumbers();