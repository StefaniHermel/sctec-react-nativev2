let statusPedido = 1
let mensagemStatus = ""

switch (statusPedido) {
  case 1:
    mensagem = "Pedido recebido";
    break;
  case 2:
    mensagem = "Em separação no estoque"
       break;
  case 3:
    mensagem = "Eniviado para a Transportadora";
    break;
  case 4:
    mensagem = "Saiu para entrega";
    break;
    case 5:
      mensagem = "Entregue";
      break;
    case 6:
      mensagem = "Pedido cancelado";
      break;
  default:
    mensagem = "Status desconhecido. Entre em contato com o suporte.";
}
console.log(`Status: ${mensagemStatus}`);