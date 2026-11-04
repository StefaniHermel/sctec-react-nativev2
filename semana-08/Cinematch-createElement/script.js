// CineMatch — createElement + appendChild + remove

// Abra o index.html no navegador e complete os passos abaixo.

const catalogo = [

  { titulo: "Fronteira Digital", tipo: "Série" },

  { titulo: "Risadas de Sábado", tipo: "Filme" },

  { titulo: "Sombras do Porão", tipo: "Filme" },

  { titulo: "Universo Perdido", tipo: "Filme" },

];

// 1. Selecione #catalogo
// Dica: getElementById

let containerCatalogo = document.getElementById("catalogo");
// Pega o elemento HTML que possui id="catalogo"



// 2. Percorra catalogo com forEach
// Dica: item.titulo e item.tipo

catalogo.forEach((item) => {
// Percorre cada objeto do array catalogo
// "item" representa um filme por vez


    // 3. Para cada item: crie article, span e button

    const card = document.createElement("article");
    // Cria um elemento <article> novo

    card.classList.add("filme-card");
    // Adiciona a classe "filme-card" ao article


    const titulo = document.createElement("span");
    // Cria um elemento <span>

    titulo.textContent = `${item.titulo} (${item.tipo})`;
    // Coloca no span o título e o tipo do filme
    // Exemplo: Fronteira Digital (Série)


    const botaoExcluir = document.createElement("button");
    // Cria um elemento <button>

    botaoExcluir.textContent = "Excluir";
    // Define o texto que aparecerá no botão

    botaoExcluir.classList.add("botao-excluir");
    // Adiciona a classe "botao-excluir" ao botão


    // Coloca o span dentro do card

    card.appendChild(titulo);
    // O <span> passa a ficar dentro do <article>


    // Coloca o botão dentro do card

    card.appendChild(botaoExcluir);
    // O <button> passa a ficar dentro do <article>


    // Coloca o card dentro do container

    containerCatalogo.appendChild(card);
    // O <article> é colocado dentro de #catalogo



    // 4. No clique do Excluir: card.remove()
    // Dica: addEventListener("click", ...)

    botaoExcluir.addEventListener("click", () => {
    // Escuta o clique no botão Excluir

        card.remove();
        // Remove o card inteiro da página

    });

});
