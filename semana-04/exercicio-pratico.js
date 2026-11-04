const produtos = ["Mouse", "Teclado", "Monitor", "Notebook", "Headset"];
const precos = [80, 150, 950, 4200, 320];
const produtosMaiusculos = produtos.map((item) => item.toUpperCase());


const precosMaiores300 = precos.filter(item => item > 300);


const produtoEncontrado = produtos.find(item => item === "Notebook");

console.log(produtosMaiusculos);
console.log(precosMaiores300);
console.log(produtoEncontrado);
