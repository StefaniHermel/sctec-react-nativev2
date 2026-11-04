const precos = [
  49.90, 129.90, 39.90, 259.90, 15.50, 89.90, 199.90, 320.00, 45.00, 12.90,
  67.80, 145.00, 22.50, 399.90, 78.90, 33.20, 210.00, 56.70, 99.00, 149.90,
  8.90, 275.00, 61.40, 118.60, 29.90, 450.00, 74.50, 19.90, 165.30, 38.00
];

// 1. Aplicar 20% de desconto
const precosComDesconto = precos.map(preco => Number((preco * 0.8).toFixed(2)));

// 2. Filtrar preços entre R$ 30,00 e R$ 150,00 (inclusive)
const produtosPopulares = precos.filter(preco => preco >= 30 && preco <= 150);

// 3. Encontrar o primeiro preço premium (maior que R$ 300,00)
const produtoPremium = precos.find(preco => preco > 300);

// Exibir os resultados
console.log("=== PREÇOS COM DESCONTO ===");
console.log(precosComDesconto);

console.log("=== PRODUTOS POPULARES ===");
console.log(produtosPopulares);

console.log("=== PRODUTO PREMIUM ===");
console.log(produtoPremium);
