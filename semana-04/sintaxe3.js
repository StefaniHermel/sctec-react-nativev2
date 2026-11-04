const numeros = [10, 20, 30, 40];

// Somar todos os números do array
const resultado = numeros.reduce((acumulador, numero) => {
  console.log(`${acumulador} Numero: ${numero}`);
  return acumulador + numero;
}, 0);

console.log(resultado);