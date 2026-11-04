const prompt = require("prompt-sync")();

function calcularCarrinho(
  precoItem1,
  precoItem2,
  cupomDesconto,
  quantidadeItens
) {
  let total = Number(precoItem1) + Number(precoItem2);

  if ((cupomDesconto = "PROMO10")) {
    total = total - total * 0.1;
  }

  let freteGratis = quantidadeItens > 0 || total >= 100 ? true : false;

  return `Total: R$ ${total} | Frete grátis: ${freteGratis}`;
}

const precoItem1Input = prompt("Preço do item 1: ");
const precoItem2Input = prompt("Preço do item 2: ");
const cupomInput = prompt("Cupom de desconto (ou deixe vazio): ");
const quantidadeItensInput = prompt("Quantidade de itens: ");

console.log(
  calcularCarrinho(
    precoItem1Input,
    precoItem2Input,
    cupomInput,
    quantidadeItensInput
  )
);