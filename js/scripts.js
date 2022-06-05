fetch("./lista-final.json")
  .then(response => {
    return response.json();
  })
  .then(data => {
    let placa = document.body.getElementById('placa');
  });