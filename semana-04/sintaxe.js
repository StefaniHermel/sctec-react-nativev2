const notas = [8, 7, 10, 9];

// Verificar se todas as notas são maiores ou iguais a 7
const resultado = notas.every((nota) => {
  return nota >= 7;
});

console.log(resultado); // true (todas as notas atendem à condição)

// Verificar se todas as notas são maiores ou iguais a 9
const verificacao = notas.every((nota) => {
  return nota >= 9;
});

console.log(verificacao);