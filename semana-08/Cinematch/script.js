
// =====================================================
// CINE MATCH
// =====================================================


// =====================================================
// CLASSE PAI
// =====================================================

class Conteudo {

    constructor(titulo, tipo, generos, duracao, descricao, classificacaoIndicativa) {

        this.titulo = titulo;
        this.tipo = tipo;
        this.generos = generos;
        this.duracao = duracao;
        this.descricao = descricao;
        this.classificacaoIndicativa = classificacaoIndicativa;

    }

}


// =====================================================
// CLASSE FILME
// =====================================================

class Filme extends Conteudo {

    constructor(titulo, generos, duracao, descricao, classificacaoIndicativa) {

        super(
            titulo,
            "Filme",
            generos,
            duracao,
            descricao,
            classificacaoIndicativa
        );

    }

}


// =====================================================
// CLASSE SÉRIE
// =====================================================

class Serie extends Conteudo {

    constructor(
        titulo,
        generos,
        duracao,
        descricao,
        classificacaoIndicativa,
        temporadas
    ) {

        super(
            titulo,
            "Série",
            generos,
            duracao,
            descricao,
            classificacaoIndicativa
        );

        this.temporadas = temporadas;

    }

}


// =====================================================
// CATÁLOGO
// =====================================================

const filme1 = new Filme(
    "Todo Mundo em Pânico",
    ["Comédia", "Terror"],
    110,
    "Uma divertida paródia de filmes de terror.",
    18
);


const filme2 = new Filme(
    "Spider-Man",
    ["Ação", "Ficção"],
    140,
    "Peter Parker enfrenta novos desafios.",
    12
);


const serie1 = new Serie(
    "Breaking Bad",
    ["Drama"],
    50,
    "Professor de química vira fabricante de drogas.",
    18,
    5
);


const catalogo = [
    filme1,
    filme2,
    serie1
];


// =====================================================
// CLOSURE
// =====================================================

function criarContadorAnalises() {

    let contador = 0;

    return function () {

        contador++;

        return contador;

    };

}


const contarAnalise = criarContadorAnalises();


// =====================================================
// CLASSE USUÁRIO
// =====================================================

class Usuario {

    constructor(nome, idade, generosFavoritos) {

        this.nome = nome;
        this.idade = idade;
        this.generosFavoritos = generosFavoritos;

    }


    exibirPerfil() {

        document.getElementById("nome-usuario").textContent =
            this.nome;

        document.getElementById("idade-usuario").textContent =
            this.idade;

        document.getElementById("generos-usuario").textContent =
            this.generosFavoritos.join(", ");

    }

}


// =====================================================
// CADASTRO DO USUÁRIO
// =====================================================

// Pedimos os dados através do navegador.

let nome = prompt("Digite seu nome:");


// Validação do nome

while (!nome || /\d/.test(nome)) {

    alert("Digite um nome válido. Números não são permitidos.");

    nome = prompt("Digite seu nome:");

}


// Validação da idade

let idade = Number(prompt("Digite sua idade:"));


while (isNaN(idade) || idade <= 0) {

    alert("Digite uma idade válida.");

    idade = Number(prompt("Digite sua idade:"));

}


// =====================================================
// GÊNEROS FAVORITOS
// =====================================================

let generosFavoritos = [];

let continuar = true;


while (continuar) {

    const escolha = prompt(
        "Escolha seus gêneros favoritos:\n\n" +
        "1 - Ação\n" +
        "2 - Drama\n" +
        "3 - Comédia\n" +
        "4 - Terror\n" +
        "5 - Ficção\n\n" +
        "Digite 0 para finalizar."
    );


    switch (escolha) {

        case "1":
            if (!generosFavoritos.includes("Ação")) {
                generosFavoritos.push("Ação");
            }
            break;


        case "2":
            if (!generosFavoritos.includes("Drama")) {
                generosFavoritos.push("Drama");
            }
            break;


        case "3":
            if (!generosFavoritos.includes("Comédia")) {
                generosFavoritos.push("Comédia");
            }
            break;


        case "4":
            if (!generosFavoritos.includes("Terror")) {
                generosFavoritos.push("Terror");
            }
            break;


        case "5":
            if (!generosFavoritos.includes("Ficção")) {
                generosFavoritos.push("Ficção");
            }
            break;


        case "0":
            continuar = false;
            break;


        default:
            alert("Opção inválida.");

    }

}


// Criando o usuário

const usuario = new Usuario(
    nome,
    idade,
    generosFavoritos
);


// Mostra o perfil na página

usuario.exibirPerfil();


// =====================================================
// FUNÇÃO PARA MOSTRAR RESULTADOS
// =====================================================

function mostrarResultado(html) {

    document.getElementById("resultado").innerHTML = html;

}


// =====================================================
// EXIBIR CATÁLOGO
// =====================================================

function exibirCatalogo(listaCatalogo) {

    let html = "";

    listaCatalogo.forEach((conteudo) => {

        html += `
            <div class="conteudo">

                <h3>${conteudo.titulo}</h3>

                <p>
                    <strong>Tipo:</strong>
                    ${conteudo.tipo}
                </p>

                <p>
                    <strong>Gêneros:</strong>
                    ${conteudo.generos.join(", ")}
                </p>

                <p>
                    <strong>Duração:</strong>
                    ${conteudo.duracao} minutos
                </p>

                <p>
                    <strong>Descrição:</strong>
                    ${conteudo.descricao}
                </p>

                <p>
                    <strong>Classificação:</strong>
                    ${conteudo.classificacaoIndicativa} anos
                </p>
        `;


        if (conteudo.tipo === "Série") {

            html += `
                <p>
                    <strong>Temporadas:</strong>
                    ${conteudo.temporadas}
                </p>
            `;

        }


        html += `
            </div>
        `;

    });


    mostrarResultado(html);

}


// =====================================================
// MAP()
// LISTAR TÍTULOS
// =====================================================

function listarTitulos(listaCatalogo) {

    const titulos = listaCatalogo.map(
        (conteudo) => conteudo.titulo
    );


    let html = `
        <h3>📋 Títulos do catálogo</h3>
        <ul>
    `;


    titulos.forEach((titulo) => {

        html += `
            <li>${titulo}</li>
        `;

    });


    html += `
        </ul>
    `;


    mostrarResultado(html);

}


// =====================================================
// FIND()
// BUSCAR POR TÍTULO
// =====================================================

function buscarPorTitulo(catalogoConteudos, titulo) {

    return catalogoConteudos.find(
        (conteudo) =>
            conteudo.titulo.toLowerCase() ===
            titulo.toLowerCase()
    );

}


// =====================================================
// PESQUISAR CONTEÚDO
// =====================================================

function pesquisarConteudo() {

    const titulo = document
        .getElementById("campo-busca")
        .value
        .trim();


    if (!titulo) {

        alert("Digite um título.");

        return;

    }


    const encontrado = buscarPorTitulo(
        catalogo,
        titulo
    );


    if (encontrado) {

        let html = `

            <div class="conteudo">

                <h3>🎬 ${encontrado.titulo}</h3>

                <p>
                    <strong>Tipo:</strong>
                    ${encontrado.tipo}
                </p>

                <p>
                    <strong>Gêneros:</strong>
                    ${encontrado.generos.join(", ")}
                </p>

                <p>
                    <strong>Duração:</strong>
                    ${encontrado.duracao} minutos
                </p>

                <p>
                    <strong>Descrição:</strong>
                    ${encontrado.descricao}
                </p>

                <p>
                    <strong>Classificação:</strong>
                    ${encontrado.classificacaoIndicativa} anos
                </p>
        `;


        if (encontrado.tipo === "Série") {

            html += `
                <p>
                    <strong>Temporadas:</strong>
                    ${encontrado.temporadas}
                </p>
            `;

        }


        html += `
            </div>
        `;


        mostrarResultado(html);

    } else {

        mostrarResultado(
            `<p>❌ Conteúdo não encontrado.</p>`
        );

    }

}


// =====================================================
// CLASSIFICAR COMPATIBILIDADE
// =====================================================

function classificarCompatibilidade(percentual) {

    switch (true) {

        case percentual >= 80:
            return "Alta afinidade";

        case percentual >= 50:
            return "Média afinidade";

        default:
            return "Baixa afinidade";

    }

}


// =====================================================
// FILTER()
// OBTER COMPATIBILIDADE
// =====================================================

function obterCompatibilidade(usuario, conteudo) {

    const generosEmComum = conteudo.generos.filter(
        (genero) =>
            usuario.generosFavoritos.includes(genero)
    );


    const percentual = Math.round(
        (generosEmComum.length /
            conteudo.generos.length) * 100
    );


    return percentual;

}


// =====================================================
// CALCULAR COMPATIBILIDADE
// FILTER() + FOREACH()
// =====================================================

function calcularCompatibilidade(usuario, listaCatalogo) {

    let html = `
        <h3>❤️ Análise de compatibilidade</h3>
    `;


    listaCatalogo.forEach((conteudo) => {

        const generosEmComum =
            conteudo.generos.filter(
                (genero) =>
                    usuario.generosFavoritos.includes(genero)
            );


        const generosNaoExplorados =
            conteudo.generos.filter(
                (genero) =>
                    !usuario.generosFavoritos.includes(genero)
            );


        const percentual = Math.round(
            (generosEmComum.length /
                conteudo.generos.length) * 100
        );


        const classificacao =
            classificarCompatibilidade(percentual);


        html += `

            <div class="conteudo">

                <h3>${conteudo.titulo}</h3>

                <p>
                    <strong>Tipo:</strong>
                    ${conteudo.tipo}
                </p>

                <p>
                    <strong>Compatibilidade:</strong>
                    ${percentual}%
                </p>

                <p>
                    <strong>Gêneros em comum:</strong>
                    ${generosEmComum.join(", ") || "Nenhum"}
                </p>

                <p>
                    <strong>Gêneros não explorados:</strong>
                    ${generosNaoExplorados.join(", ") || "Nenhum"}
                </p>

                <p>
                    <strong>Classificação:</strong>
                    ${classificacao}
                </p>

            </div>

        `;

    });


    const numeroAnalise = contarAnalise();


    html += `
        <p>
            📊 Número de análises realizadas:
            <strong>${numeroAnalise}</strong>
        </p>
    `;


    mostrarResultado(html);

}


// =====================================================
// EVERY()
// VERIFICAR CLASSIFICAÇÃO INDICATIVA
// =====================================================

function verificarIdade(usuario, listaCatalogo) {

    const podeAssistirTodos =
        listaCatalogo.every(
            (conteudo) =>
                usuario.idade >=
                conteudo.classificacaoIndicativa
        );


    if (podeAssistirTodos) {

        mostrarResultado(`
            <h3>🔞 Classificação</h3>

            <p>
                ${usuario.nome}, você possui idade
                para todos os conteúdos.
            </p>
        `);

    } else {

        mostrarResultado(`
            <h3>🔞 Classificação</h3>

            <p>
                ${usuario.nome}, você não possui idade
                para todos os conteúdos.
            </p>
        `);

    }


    return podeAssistirTodos;

}


// =====================================================
// REDUCE()
// MELHOR RECOMENDAÇÃO
// =====================================================

function mostrarRecomendacao(usuario, listaCatalogo) {

    const melhorConteudo =
        listaCatalogo.reduce(
            (melhor, conteudo) => {

                const compatibilidadeAtual =
                    obterCompatibilidade(
                        usuario,
                        conteudo
                    );


                const melhorCompatibilidade =
                    obterCompatibilidade(
                        usuario,
                        melhor
                    );


                if (
                    compatibilidadeAtual >
                    melhorCompatibilidade
                ) {

                    return conteudo;

                }


                return melhor;

            }
        );


    const percentual =
        obterCompatibilidade(
            usuario,
            melhorConteudo
        );


    mostrarResultado(`

        <div class="conteudo">

            <h3>⭐ Melhor recomendação</h3>

            <h2>${melhorConteudo.titulo}</h2>

            <p>
                <strong>Tipo:</strong>
                ${melhorConteudo.tipo}
            </p>

            <p>
                <strong>Compatibilidade:</strong>
                ${percentual}%
            </p>

            <p>
                <strong>Classificação:</strong>
                ${classificarCompatibilidade(percentual)}
            </p>

            <p>
                ${melhorConteudo.descricao}
            </p>

        </div>

    `);

}


// =====================================================
// CALLBACK
// =====================================================

function executarComCallback(callback) {

    console.log("Executando análise...");

    callback();

}


// Exemplo de callback

executarComCallback(() => {

    console.log(
        "Callback executado com sucesso."
    );

});


// =====================================================
// PROMISE
// =====================================================

function carregarCatalogo() {

    return new Promise((resolve) => {

        setTimeout(() => {

            resolve(catalogo);

        }, 500);

    });

}


// =====================================================
// ASYNC / AWAIT
// =====================================================

async function iniciarCatalogo() {

    try {

        const catalogoCarregado =
            await carregarCatalogo();

        console.log(
            "Catálogo carregado:",
            catalogoCarregado
        );

    } catch (erro) {

        console.log(
            "Erro ao carregar catálogo."
        );

    }

}


// Executar Promise + Async/Await

iniciarCatalogo();


// =====================================================
// EVENTOS DOS BOTÕES
// =====================================================


// MEU PERFIL

document
    .getElementById("btn-perfil")
    .addEventListener("click", () => {

        usuario.exibirPerfil();

        mostrarResultado(`
            <h3>👤 Meu Perfil</h3>

            <p>
                <strong>Nome:</strong>
                ${usuario.nome}
            </p>

            <p>
                <strong>Idade:</strong>
                ${usuario.idade}
            </p>

            <p>
                <strong>Gêneros favoritos:</strong>
                ${usuario.generosFavoritos.join(", ")}
            </p>
        `);

    });


// CATÁLOGO

document
    .getElementById("btn-catalogo")
    .addEventListener("click", () => {

        exibirCatalogo(catalogo);

    });


// BUSCAR

document
    .getElementById("btn-buscar")
    .addEventListener("click", () => {

        document
            .getElementById("campo-busca")
            .focus();

    });


// PESQUISAR

document
    .getElementById("btn-pesquisar")
    .addEventListener("click", () => {

        pesquisarConteudo();

    });


// Também permite apertar ENTER na busca

document
    .getElementById("campo-busca")
    .addEventListener("keydown", (evento) => {

        if (evento.key === "Enter") {

            pesquisarConteudo();

        }

    });


// COMPATIBILIDADE

document
    .getElementById("btn-compatibilidade")
    .addEventListener("click", () => {

        calcularCompatibilidade(
            usuario,
            catalogo
        );

    });


// MELHOR RECOMENDAÇÃO

document
    .getElementById("btn-recomendacao")
    .addEventListener("click", () => {

        mostrarRecomendacao(
            usuario,
            catalogo
        );

    });


// LISTAR TÍTULOS

document
    .getElementById("btn-titulos")
    .addEventListener("click", () => {

        listarTitulos(catalogo);

    });


// VERIFICAR IDADE

document
    .getElementById("btn-idade")
    .addEventListener("click", () => {

        verificarIdade(
            usuario,
            catalogo
        );

    });

