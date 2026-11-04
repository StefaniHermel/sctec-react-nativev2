function esperar2Segundos() {
  return new Promise((resolve) => {
    setTimeout(resolve, 2000);
  });
}

async function carregarUsuario() {
  console.log("1 - Início");

  await esperar2Segundos();

  console.log("2 - Usuário carregado");
}

console.log("A");

carregarUsuario();

console.log("B");