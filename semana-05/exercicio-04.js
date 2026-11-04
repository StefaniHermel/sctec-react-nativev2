const prompt = require("prompt-sync")();

let curtidas = 0; // variável para guardar o total de curtidas

function sistemaCurtidas(acao) {
  switch (acao) {
    case "curtir":
      curtidas++;
      console.log("Você curtiu o post! 👍");
      break;

    case "descurtir":
      switch (curtidas > 0) {
        case true:
          curtidas--;
          console.log("Você descurtiu o post! 👎");
          break;

        case false:
          console.log("O post já está sem curtidas.");
          break;
      }
      break;

    case "consultar":
      console.log(`Total de curtidas: ${curtidas} ❤️`);
      break;
    case "reiniciar":
      curtidas = 0;
      console.log("O total de curtidas foi reiniciado.");
      break;
  }
}

let opcao = 0;

while (opcao !== 4) {
  console.log("\n========== POST ==========");
  console.log("1 - Curtir 👍");
  console.log("2 - Descurtir 👎");
  console.log("3 - Exibir Curtidas ❤️");
  console.log("4 - Reiniciar Curtidas");
  console.log("5 - Sair");

  opcao = Number(prompt("Escolha uma opção:"));

  switch (opcao) {
    case 1:
      sistemaCurtidas("curtir");
      break;

    case 2:
      sistemaCurtidas("descurtir");
      break;

    case 3:
      sistemaCurtidas("consultar");
      break;

    case 4:
      sistemaCurtidas("reiniciar");
      break;

    case 5:
      console.log("Saindo...");
      break;

    default:
      console.log("Opção inválida!");
  }
}
