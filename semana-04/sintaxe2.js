const precosBrutos = [100, 200, 300];
const precosComImposto = precosBrutos.map((preco) => {
  return Number((preco * 1.1).toFixed(2));
});
 console.log(precosComImposto);
 console.log(precosBrutos);