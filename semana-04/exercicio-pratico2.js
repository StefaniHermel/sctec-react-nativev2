const precos = [80, 150, 950, 4200, 320];

const todosAcimaDe50 = precos.every(preco => preco > 50);
console.log(todosAcimaDe50);
console.log(todosAcimaDe50 ? "Produtos acima de R$ 50,00: " + todosAcimaDe50 : "Nem todos os produtos estão acima de R$ 50,00.");
console.log(existeProdutoAcimaDe4000 ? "Existe produto acima de R$ 4.000,00: " + existeProdutoAcimaDe4000 : "Nenhum produto está acima de R$ 4.000,00.");



const existeProdutoAcimaDe4000 = precos.some(preco => preco > 4000);
console.log(existeProdutoAcimaDe4000);


const total = precos.reduce((acumulador, preco) => acumulador + preco, 0);
console.log(total);