const titulo = document.getElementById("titulo-pagina"); // Recuperando o elemento h1 do documento
console.log(titulo);

const moviesByClassName = document.getElementsByClassName("filme-card"); // Recuperando o elemento p do documento
console.log("Filmes Encontrados", moviesByClassName.length);


const divs = document.getElementsByTagName("div"); // Recuperando o elemento input do documento
console.log("Divs Encontradas", divs.length);
console.log("Quantidade de filmes é igual a quantidade de divs!", divs.length);
console.log("Diferença:", moviesByClassName.length - divs.length);


const busca = document.querySelector("#busca"); // Recuperando o elemento input do documento

const filme = document.querySelector(".filme-card"); // Recuperando o elemento main do documento

const filmes = document.querySelectorAll(".filme-card"); // Recuperando o elemento main do documento
console.log (filmes)

filmes.forEach((filme) => {
    const nome = filme.querySelector("h2");
    console.log(nome.textContent);
});

const descricao = document.getElementById("descricao");

descricao.textContent = `${filmes.length} filmes encontrados`;


