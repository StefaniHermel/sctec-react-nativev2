const dadosCliente = {
  nome: "Fernanda Lima",
  idade: 34,
  clienteVIP: false,
  itensCarrinho: [120, 150, 50],
  statusPagamento: 1, // 1, 2, 3 ou qualquer outro valor para testar
};

// 1. Some os valores do carrinho usando um laço de repetição (for ou while)
// TODO: function calcularValorTotal(itens) { ... }
function calcularValorTotal(itens) {
  let total = 0;

  for (let i = 0; i < itens.length; i++) {
    total += itens[i];
  }

  return total;
}

// 2. Calcule o percentual de desconto usando ternário
// TODO: const calcularPercentualDesconto = (valorTotal, clienteVIP) => { ... }
const calcularPercentualDesconto = (valorTotal, clienteVIP) => {
  return valorTotal >= 300 || clienteVIP ? 0.15 : 0;
};

// 3. Aplique o desconto e retorne o valor final
// TODO: const calcularValorComDesconto = (valorTotal, percentualDesconto) => { ... }
const calcularValorComDesconto = (valorTotal, percentualDesconto) =>
  valorTotal - valorTotal * percentualDesconto;

// 4. Classifique a faixa etária usando if/else if
// TODO: function classificarFaixaEtaria(idade) { ... }
function classificarFaixaEtaria(idade) {
  if (idade < 18) {
    return "Menor Idade";
  } else if (idade <= 59) {
    return "Adulto";
  } else {
    return "Idoso";
  }
}

// 5. Traduza o status do pagamento usando switch case
// TODO: function traduzirStatusPagamento(status) { ... }
function traduzirStatusPagamento(status) {
  switch (status) {
    case 1:
      return "Pago";
      break;
    case 2:
      return "Pendente";
      break;
    case 3:
      return "Cancelado";
    default:
      return "Status Inválido";
  }
}

// 6. Monte a mensagem final usando template literal
// TODO: const montarMensagemFinal = (nome, faixaEtaria, valorComDesconto, statusTraduzido) => { ... }
const montarMensagemFinal = (
  nome,
  faixaEtaria,
  valorComDesconto,
  statusTraduzido,
) => {
  return `Olá, ${nome}, Você é classificado como ${faixaEtaria}.
    O valor final do pedido é ${valorComDesconto.toFixed(2)}.
    Status do pagamento: ${statusTraduzido}
    `;
};

// 7. Orquestradora: chama tudo em ordem e devolve a mensagem pronta
// TODO: function orquestrarResumoPedido(dadosCliente) { ... }

function orquestrarResumoPedido(dados) {
  const valorTotal = calcularValorTotal(dados.itensCarrinho);
  const percentualDesconto = calcularPercentualDesconto(
    valorTotal,
    dados.clienteVIP,
  );
  const valorTotalComDesconto = calcularValorComDesconto(
    valorTotal,
    percentualDesconto,
  );
  const faixaEtaria = classificarFaixaEtaria(dados.idade);
  const statusTraduzido = traduzirStatusPagamento(dados.statusPagamento);

  return montarMensagemFinal(
    dados.nome,
    faixaEtaria,
    valorTotalComDesconto,
    statusTraduzido,
  );
}

console.log(orquestrarResumoPedido(dadosCliente));