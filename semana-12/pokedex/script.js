const formulario = document.querySelector("#formulario");

const campoNome = document.querySelector("#nome");

const statusMensagem = document.querySelector("#status");

const sprite = document.querySelector("#sprite");

const titulo = document.querySelector("#titulo");


async function buscarPokemon(nome) {

  const url = `https://pokeapi.co/api/v2/pokemon/${nome}/`;

  const response = await fetch(url);

  if (response.ok === false) {
    statusMensagem.textContent = "Não achei esse Pokémon.";
    return;
  }

  const dados = await response.json();

  console.log(dados);

  titulo.textContent = dados.name;

  sprite.src = dados.sprites.front_default;
}


formulario.addEventListener("submit", (evento) => {

  evento.preventDefault();

  const nome = campoNome.value.trim().toLowerCase();

  buscarPokemon(nome);

});