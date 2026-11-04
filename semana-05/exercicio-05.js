const prompt = require("prompt-sync")();

const pedidos = [
  {
    id: 101,
    cliente: "Matheus",
    produto: "Notebook",
    status: "Em transporte",
  },
  {
    id: 102,
    cliente: "Maria",
    produto: "Mouse Gamer",
    status: "Entregue",
  },
  {
    id: 103,
    cliente: "Carlos",
    produto: "Teclado Mecânico",
    status: "Preparando envio",
  },
];

function buscarPedido(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const pedidoEncontrado = pedidos.find((pedido) => pedido.id === id);

      if (pedidoEncontrado) {
        resolve(pedidoEncontrado);
      } else {
        reject("Pedido não encontrado.");
      }
    }, 3000);
  });
}

async function main() {
  const idPedido = Number(prompt("Informe o ID do pedido: "));

  try {
    const resultado = await buscarPedido(idPedido);

    console.log("\n===== PEDIDO =====");
    console.log(`ID: ${resultado.id}`);
    console.log(`Cliente: ${resultado.cliente}`);
    console.log(`Produto: ${resultado.produto}`);
    console.log(`Status: ${resultado.status}`);
  } catch (erro) {
    console.log("Erro:", erro);
  }
}

main();
