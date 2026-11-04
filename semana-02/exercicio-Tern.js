let valorCompra = 180;
let clienteVIP = false;
let frete = null;

frete = valorCompra >= 200 || clienteVIP ? 0 : 15.9;

let mensagem = `Valor do frete: R$ ${frete.toFixed(2)}`;
console.log(mensagem);
