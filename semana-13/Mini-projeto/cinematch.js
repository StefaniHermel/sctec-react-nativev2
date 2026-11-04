const prompt = require("prompt-sync")({ sigint: true });

    //======================================================================================
    //======================================================================================
    // CLASSE PAI 
    //======================================================================================
    //======================================================================================
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

    //======================================================================================
    //======================================================================================
    // CLASSE FILME
    //======================================================================================
    //======================================================================================
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

    //======================================================================================
    //======================================================================================
    // CLASSE SÉRIE
    //======================================================================================
    //======================================================================================
class Serie extends Conteudo {
    constructor(titulo, generos, duracao, descricao, classificacaoIndicativa, temporadas) {
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

    //======================================================================================
    //======================================================================================
    // CATÁLOGO
    //======================================================================================
    //======================================================================================

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

const catalogo = [filme1, filme2, serie1];

    //======================================================================================
    //======================================================================================
    // CLOSURE
    //======================================================================================
    //======================================================================================

function criarContadorAnalises() {
    let contador = 0;
    return function () {
        contador++;
        return contador;
    };
}
const contarAnalise = criarContadorAnalises();

    //======================================================================================
    //======================================================================================
    // CLASSE USUÁRIO
    //======================================================================================
    //======================================================================================
class Usuario {
    constructor(nome, idade, generosFavoritos) {
        this.nome = nome;
        this.idade = idade;
        this.generosFavoritos = generosFavoritos;
    }

    //======================================================================================
    //======================================================================================
    // MÉTODO DA CLASSE USUÁRIO
    //======================================================================================
    //======================================================================================

    exibirPerfil() {
        console.log("\n===== PERFIL =====");
        console.log(`Nome: ${this.nome}`);
        console.log(`Idade: ${this.idade}`);
        console.log(
            `Gêneros favoritos: ${this.generosFavoritos.join(", ")}`
        );

    }
}

    //======================================================================================
    //======================================================================================
    // LOGIN DO USUÁRIO
    //======================================================================================
    //======================================================================================

function fazerLogin() {

    console.log("\n============= LOGIN =============");

    let nome;
    let nomeInvalido;

    //======================================================================================
    //======================================================================================
    // VALIDAÇÃO DO NOME
    //======================================================================================
    //======================================================================================

    do {

        nome = prompt("Digite seu nome: ");
        nomeInvalido = false;

        for (let i = 0; i < nome.length; i++) {

            const caractere = nome[i];

            if (!isNaN(Number(caractere)) && caractere !== " ") {
                nomeInvalido = true;
            }
        }

        if (nomeInvalido) {
            console.log("Números não são permitidos no nome.");
        }

    } while (nomeInvalido);


    //======================================================================================
    //======================================================================================
    // VALIDAÇÃO DA IDADE
    //======================================================================================
    //======================================================================================

    let idade;

    do {

        idade = Number(prompt("Digite sua idade: "));

        if (isNaN(idade) || idade <= 0) {
            console.log("Idade inválida. Digite apenas um número válido.");
        }

    } while (isNaN(idade) || idade <= 0);


    console.log("\nEscolha de seus gêneros favoritos:\n");
    console.log("[1]⚔️  Ação    [2]🎭 Drama  [3]😂 Comédia  \n[4]👻 Terror  [5]🚀 Ficção\n");

    const generosFavoritos = [];
    let escolhaGenero;

    do {

        escolhaGenero = prompt(
            "Escolha um gênero (0 para finalizar): "
        );

        switch (escolhaGenero) {

            case "1":
                generosFavoritos.push("Ação");
                break;

            case "2":
                generosFavoritos.push("Drama");
                break;

            case "3":
                generosFavoritos.push("Comédia");
                break;

            case "4":
                generosFavoritos.push("Terror");
                break;

            case "5":
                generosFavoritos.push("Ficção");
                break;

            case "0":
                break;

            default:
                console.log("Opção inválida.");
        }

    } while (escolhaGenero !== "0");

    const usuario = new Usuario(
        nome,
        idade,
        generosFavoritos
    );

    return usuario;
}

const usuario = fazerLogin();

    //======================================================================================
    //======================================================================================
    // EXIBIR CATÁLOGO
    //======================================================================================
    //======================================================================================

function exibirCatalogo(listaCatalogo) {
    console.log("\n===== CATÁLOGO =====");

    listaCatalogo.forEach((conteudo) => {
        console.log("\n-------------------------");
        console.log(`Título: ${conteudo.titulo}`);
        console.log(`Tipo: ${conteudo.tipo}`);
        console.log(`Gêneros: ${conteudo.generos.join(", ")}`);
        console.log(`Duração: ${conteudo.duracao} minutos`);
        console.log(`Descrição: ${conteudo.descricao}`);
        console.log(
            `Classificação: ${conteudo.classificacaoIndicativa}`
        );

        if (conteudo.tipo === "Série") {
            console.log(`Temporadas: ${conteudo.temporadas}`);
        }

    });
}


    //======================================================================================
    //======================================================================================
    // MAP()
    //======================================================================================
    //======================================================================================

function listarTitulos(listaCatalogo) {
    const titulos = listaCatalogo.map(
        (conteudo) => conteudo.titulo
    );

    console.log("\n===== TÍTULOS DO CATÁLOGO =====");

    titulos.forEach((titulo) => {
        console.log(`- ${titulo}`);
    });
}

    //======================================================================================
    //======================================================================================
    // BUSCAR POR TÍTULO
    // find()
    //======================================================================================
    //======================================================================================

function buscarPorTitulo(catalogoConteudos, titulo) {
    return catalogoConteudos.find(
        (conteudo) =>
            conteudo.titulo.toLowerCase() === titulo.toLowerCase()
    );
}

    //======================================================================================
    //======================================================================================
    // PESQUISAR CONTEÚDO
    //======================================================================================
    //======================================================================================

function pesquisarConteudo(listaCatalogo) {
    console.log("Conteudos disponiveis")
    listaCatalogo.forEach(conteudo => { console.log(conteudo.titulo) })

    const titulo = prompt(
        "Digite o título do filme ou série: "
    );

    const encontrado = buscarPorTitulo(
        listaCatalogo,
        titulo
    );

    if (encontrado) {
        console.log("\n===== CONTEÚDO ENCONTRADO =====");

        console.log(`Título: ${encontrado.titulo}`);
        console.log(`Tipo: ${encontrado.tipo}`);
        console.log(
            `Gêneros: ${encontrado.generos.join(", ")}`
        );
        console.log(
            `Duração: ${encontrado.duracao} minutos`
        );
        console.log(
            `Descrição: ${encontrado.descricao}`
        );
        console.log(
            `Classificação Indicativa: ${encontrado.classificacaoIndicativa}`
        );

    } else {
        console.log("Conteúdo não encontrado.");
    }
}

    //======================================================================================
    //======================================================================================
    // CLASSIFICAR COMPATIBILIDADE
    //======================================================================================
    //======================================================================================

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

    //======================================================================================
    //======================================================================================
    // FILTER()
    // CALCULAR COMPATIBILIDADE
    //======================================================================================
    //======================================================================================

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

    //======================================================================================
    //======================================================================================
    // CALCULAR COMPATIBILIDADE
    // forEach()
    // filter()
    //======================================================================================
    //======================================================================================

function calcularCompatibilidade(usuario, listaCatalogo) {
    console.log(
        "\n--- ANÁLISE DE COMPATIBILIDADE ---"
    );

    listaCatalogo.forEach((conteudo) => {
        const generosEmComum = conteudo.generos.filter((genero) =>
            usuario.generosFavoritos.includes(genero));
        const generosNaoExplorados = conteudo.generos.filter((genero) =>
            !usuario.generosFavoritos.includes(genero));
        const percentual = Math.round((generosEmComum.length / conteudo.generos.length) * 100);
        const classificacao = classificarCompatibilidade(percentual);

        console.log(`\nTítulo: ${conteudo.titulo}`);
        console.log(`Tipo: ${conteudo.tipo}`);
        console.log(`Compatibilidade: ${percentual}%`);
        console.log(`Gêneros em comum: ${generosEmComum.join(", ") || "Nenhum"}`);
        console.log(`Gêneros não explorados: ${generosNaoExplorados.join(", ") || "Nenhum"}`);
        console.log(`Classificação: ${classificacao}`);
    });

    // Closure sendo utilizado
    const numeroAnalise = contarAnalise();
    console.log(`\nNúmero de análises realizadas: ${numeroAnalise}`);
}


    //======================================================================================
    //======================================================================================
    // EVERY()
    // VERIFICAR CLASSIFICAÇÃO INDICATIVA
    //======================================================================================
    //======================================================================================

function verificarIdade(usuario, listaCatalogo) {
    const podeAssistirTodos = listaCatalogo.every(
        (conteudo) =>
            usuario.idade >= conteudo.classificacaoIndicativa
    );

    if (podeAssistirTodos) {
        console.log(
            `\n${usuario.nome} você possui idade para todos os conteúdos.`
        );
    } else {
        console.log(`\n${usuario.nome} você não possui idade para todos os conteúdos.`);
    }
    return podeAssistirTodos;
}

    //======================================================================================
    //======================================================================================
    // REDUCE()
    // MELHOR RECOMENDAÇÃO
    //======================================================================================
    //======================================================================================

function mostrarRecomendacao(usuario, listaCatalogo) {
    console.log("\n===== MELHOR RECOMENDAÇÃO =====");

    const melhorConteudo = listaCatalogo.reduce((melhor, conteudo) => {
        const compatibilidadeAtual = obterCompatibilidade(usuario, conteudo);
        const melhorCompatibilidade = obterCompatibilidade(usuario, melhor);

        if (compatibilidadeAtual >
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

    console.log(
        `Título: ${melhorConteudo.titulo}`
    );

    console.log(
        `Tipo: ${melhorConteudo.tipo}`
    );

    console.log(
        `Compatibilidade: ${percentual}%`
    );

    console.log(
        `Classificação: ${classificarCompatibilidade(percentual)
        }`
    );
}

    //======================================================================================
    //======================================================================================
    // CALLBACK
    //======================================================================================
    //======================================================================================

function executarComCallback(callback) {
    console.log("\nExecutando análise...");
    callback();

}

    //======================================================================================
    //======================================================================================
    // PROMISE
    //======================================================================================
    //======================================================================================

function carregarCatalogo() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(catalogo);
        }, 500);
    });
}

//======================================================================================
//======================================================================================
// ASYNC / AWAIT
//======================================================================================
//======================================================================================

async function iniciarCatalogo() {
    try {
        const catalogoCarregado =
            await carregarCatalogo();

    } catch (erro) {
        console.log("Erro ao carregar catálogo.");
    }
}

    //======================================================================================
    //======================================================================================
    // EXECUTAR ASYNC/AWAIT
    //======================================================================================
    //======================================================================================

iniciarCatalogo();

    //======================================================================================
    //======================================================================================
    // CALLBACK DE EXEMPLO
    //======================================================================================
    //======================================================================================

executarComCallback(() => {
    console.log(
        "Callback executado com sucesso."
    );
});


// ==============================s
// FUNÇAO AQUI
// ==============================
// busca por título (usa find)

function buscarPorTitulo(catalogoConteudos, titulo) {
  return catalogoConteudos.find(
    (c) => c.titulo.toLowerCase() === titulo.toLowerCase(),
  );
}

// ==============================
// MENU INTERATIVO
// ==============================

    
let resposta;

do {
    console.clear();
    console.log("\n==================================================");
    console.log("              🎬 C I N E M A T C H 🎬");
    console.log("==================================================");

    console.log(`\n🍿 Bem vindo: ${usuario.nome}`);
    console.log("Escolha uma opção abaixo:\n");

    console.log("[1] 👤  Meu Perfil");
    console.log("[2] 🎞️   Catálogo");
    console.log("[3] 🔎  Buscar Conteúdo");
    console.log("[4] ❤️   Compatibilidade");
    console.log("[5] ⭐  Melhor Recomendação");
    console.log("[6] 📋  Listar Títulos");
    console.log("[7] 🔞  Verificar Conteúdos Permitidos");
    console.log("[8] 🚪  Sair");

    console.log("\n==================================================");

    resposta = prompt(
        "Escolha uma opção: "
    );

    switch (resposta) {
        case "1":
            usuario.exibirPerfil();
            break;

        case "2":
            exibirCatalogo(catalogo);
            break;

        case "3":
            pesquisarConteudo(catalogo);
            break;

        case "4":
            calcularCompatibilidade(usuario, catalogo);
            break;


        case "5":
            mostrarRecomendacao(usuario, catalogo);
            break;

        case "6":
            listarTitulos(catalogo);
            break;

        case "7":
            verificarIdade(usuario, catalogo);
            break;

        case "8":
            console.log("Obrigado por utilizar o CineMatch! volte sempre.");
            break;

        default:
            console.log("Opção inválida.");
    }
if (resposta !== "8") {
        prompt("\nPressione ENTER para voltar ao menu...");
    }
} 
while (resposta !== "8");