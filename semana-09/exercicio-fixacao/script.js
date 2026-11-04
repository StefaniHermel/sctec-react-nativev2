
/*
  FIXAÇÃO — createElement vs innerHTML vs textContent

  createElement

    Use quando o elemento AINDA NÃO existe no HTML.

    Nesta página: as <option> do select, a seção de resumo
    e o botão de limpar.

    Você ganha uma variável do elemento e pode usar
    appendChild e addEventListener.


  innerHTML

    Use quando o container JÁ existe e você só quer
    preencher o visual (título + parágrafos).

    Ele SUBSTITUI tudo que estava dentro.

    Por isso o botão NÃO vai no innerHTML:
    o clique se perderia no próximo envio.


  textContent

    Use quando o conteúdo é só texto, sem tag HTML.
*/


// Seleciona o formulário que JÁ EXISTE no HTML.
const formulario = document.querySelector("form");

// Seleciona o <select> que JÁ EXISTE no HTML.
const trilha = document.querySelector("#trilha");


// Array com as trilhas.
// Esses dados serão usados para criar as <option>.
const trilhas = [
    { value: "fundamentos", label: "Fundamentos de React Native" },
    { value: "interfaces", label: "Interfaces para dispositivos móveis" },
    { value: "navegacao", label: "Navegação em aplicativos" }
];


// -----------------------------------------------------------------------------
// 1. Options do select → createElement
//
// Os dados vêm de um array. Cada item vira um <option> de verdade.
//
// Passos:
// - percorra trilhas com forEach
// - crie a option com document.createElement("option")
// - defina option.value e option.textContent
// - encaixe no select com trilha.appendChild(option)
// -----------------------------------------------------------------------------

trilhas.forEach((opcao) => {

    // CREATE ELEMENT
    // Cria uma nova tag <option> que ainda não existia no HTML.
    const option = document.createElement("option");

    // VALUE
    // Define o valor que será enviado pelo formulário.
    option.value = opcao.value;

    // TEXTCONTENT
    // Define o texto que o usuário verá na tela.
    option.textContent = opcao.label;

    // APPENDCHILD
    // Coloca a <option> dentro do <select>.
    trilha.appendChild(option);

});


// -----------------------------------------------------------------------------
// 2. Estrutura do resumo → createElement
//
// #resumo NÃO está no HTML.
//
// Monte o esqueleto uma vez só:
// - section com id "resumo"
// - um div só para o texto
// - um button type="button" com o texto "Fazer nova inscrição"
//
// No clique do botão:
// formulario.reset()
// limpe o div
// esconda o resumo com classList.remove("visivel")
//
// Encaixe:
// div e botão dentro da section
// section depois do form
// -----------------------------------------------------------------------------

// Cria a <section> porque ela NÃO existe no HTML.
const resumo = document.createElement("section");

// Cria o <div> que receberá o conteúdo do resumo.
const conteudoResumo = document.createElement("div");

// Cria o botão que ainda não existe no HTML.
const botaoNovaInscricao = document.createElement("button");


// Define o id da section.
resumo.id = "resumo";

// Define o tipo do botão.
botaoNovaInscricao.type = "button";

// Define o texto do botão.
botaoNovaInscricao.textContent = "Fazer nova inscrição";


// -----------------------------------------------------------------------------
// Evento do botão "Fazer nova inscrição"
// -----------------------------------------------------------------------------

botaoNovaInscricao.addEventListener("click", () => {

    // Limpa todos os campos do formulário.
    formulario.reset();

    // Limpa o conteúdo que estava dentro do div.
    conteudoResumo.innerHTML = "";

    // Esconde o resumo.
    resumo.classList.remove("visivel");

});


// -----------------------------------------------------------------------------
// Montando a estrutura da section
// -----------------------------------------------------------------------------

// Coloca o div dentro da section.
resumo.appendChild(conteudoResumo);

// Coloca o botão dentro da section.
resumo.appendChild(botaoNovaInscricao);

// Coloca a section depois do formulário.
formulario.after(resumo);


// -----------------------------------------------------------------------------
// 3. Submit → FormData para ler, innerHTML só no conteúdo visual
//
// Não use um getElementById por campo.
// new FormData(formulario) lê todos os campos que têm name de uma vez.
//
// .get() → um valor
// .getAll() → vários valores
//
// Checkbox desmarcado não aparece no FormData.
// -----------------------------------------------------------------------------

formulario.addEventListener("submit", (event) => {

    // Impede o comportamento padrão do formulário,
    // que seria recarregar a página.
    event.preventDefault();


    // -------------------------------------------------------------------------
    // 3a. Recuperando os dados com FormData
    // -------------------------------------------------------------------------

    // Cria um FormData usando todos os campos do formulário.
    const dados = new FormData(formulario);


    // GET
    // Usamos .get() para campos que possuem um único valor.

    const nome = dados.get("nome");

    const email = dados.get("email");

    const senha = dados.get("senha");

    const idade = dados.get("idade");

    const nascimento = dados.get("nascimento");

    const trilhaSelecionada = dados.get("trilha");

    const nivel = dados.get("nivel");

    const apresentacao = dados.get("apresentacao");


    // -------------------------------------------------------------------------
    // GETALL
    // -------------------------------------------------------------------------

    // Usamos .getAll() porque vários checkboxes possuem
    // o mesmo name="temas".
    const temas = dados.getAll("temas");


    // Se nenhum tema foi selecionado,
    // getAll() retorna um array vazio.
    //
    // Por isso verificamos se existe algum tema.

    const temasTexto = temas.length > 0
        ? temas.join(", ")
        : "Nenhum tema selecionado";


    // -------------------------------------------------------------------------
    // 3b. Preenchendo o resumo com innerHTML
    // -------------------------------------------------------------------------

    // IMPORTANTE:
    //
    // O innerHTML está sendo usado SOMENTE no div.
    //
    // Não colocamos o botão aqui.
    //
    // O botão já foi criado com createElement
    // e já possui seu addEventListener.

    conteudoResumo.innerHTML = `
        <h2>Resumo da inscrição</h2>

        <p><strong>Nome:</strong> ${nome}</p>

        <p><strong>E-mail:</strong> ${email}</p>

        <p><strong>Senha:</strong> ${senha}</p>

        <p><strong>Idade:</strong> ${idade}</p>

        <p><strong>Data de nascimento:</strong> ${nascimento}</p>

        <p><strong>Trilha:</strong> ${trilhaSelecionada}</p>

        <p><strong>Nível:</strong> ${nivel}</p>

        <p><strong>Temas:</strong> ${temasTexto}</p>

        <p><strong>Apresentação:</strong> ${apresentacao || "Não informada"}</p>
    `;


    // -------------------------------------------------------------------------
    // 3c. Mostra o resumo
    // -------------------------------------------------------------------------

    // Adiciona a classe "visivel".
    // O CSS é responsável por fazer o resumo aparecer.
    resumo.classList.add("visivel");

});
