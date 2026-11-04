const pedidos = [
  { id: 1, cliente: "Marina", status: "entregue" },
  { id: 2, cliente: "Rafael", status: "cancelado" },
  { id: 3, cliente: "Bianca", status: "em rota" },
];

// Atividade 1
function processarPedidos(pedidos, callback) {
  pedidos.forEach(pedido => {
    let mensagem;

    if (pedido.status === "entregue") {
      mensagem = `Pedido #${pedido.id} foi entregue`;
    } else if (pedido.status === "cancelado") {
      mensagem = `Pedido #${pedido.id} foi cancelado.`;
    } else {
      mensagem = `Pedido #${pedido.id} está em andamento (${pedido.status}).`;
    }


    callback(mensagem);
  });
}

// Atividade 2 - letra A
processarPedidos(pedidos, function (mensagem) {
  console.log("📱 " + mensagem);
});

// Atividade 2 - letra B
let totalPedidos = 0;

processarPedidos(pedidos, function (mensagem) {
  totalPedidos++;
});

console.log("Total de pedidos processados:", totalPedidos);
