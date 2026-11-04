// =====================================================
// 1. SELECIONANDO O FORMULÁRIO
// =====================================================

// Procura no HTML o primeiro elemento <form>
const formulario = document.querySelector("form");


// =====================================================
// 2. ESCUTANDO O EVENTO SUBMIT
// =====================================================

// Quando a pessoa clicar no botão "Inscrever-se",
// esta função será executada.
formulario.addEventListener("submit", function (evento) {

    // Impede que a página seja recarregada
    // quando o formulário for enviado.
    evento.preventDefault();


    // =================================================
    // 3. CRIANDO A LISTA DE ERROS
    // =================================================

    // Aqui vamos guardar todos os erros encontrados.
    //
    // Exemplo:
    // erros = [
    //    { campo: campoNome, mensagem: "..." },
    //    { campo: campoSenha, mensagem: "..." }
    // ]
    //
    // É importante criar isso ANTES das validações.
    const erros = [];


    // =================================================
    // 4. CAPTURANDO OS VALORES DOS CAMPOS
    // =================================================

    // Pegamos o que a pessoa digitou em cada campo.
    const dados = {

        nome: document.getElementById("nomeCompleto").value,

        email: document.getElementById("email").value,

        senha: document.getElementById("senha").value,

        idade: document.getElementById("idade").value,

        dataNascimento: document.getElementById("dataNasc").value,

        trilha: document.getElementById("trilha").value,

        apresentacao: document.getElementById("apresentacao").value
    };


    // =================================================
    // 5. CAPTURANDO O RADIO BUTTON DO NÍVEL
    // =================================================

    // :checked procura o radio que foi selecionado.
    const nivelSelecionado = document.querySelector(
        'input[name="nivel"]:checked'
    );

    // Se encontrou um nível, pega o valor dele.
    // Se não encontrou, informa que nenhum foi selecionado.
    const nivel = nivelSelecionado
        ? nivelSelecionado.value
        : "Nenhum nível selecionado";


    // =================================================
    // 6. VALIDANDO O NÍVEL
    // =================================================

    // Se nenhum radio foi selecionado...
    if (!nivelSelecionado) {

        // Pegamos o primeiro campo de nível
        // apenas para poder destacar o local do erro.
        const campoNivel = document.querySelector(
            'input[name="nivel"]'
        );

        // Adicionamos o erro à lista.
        erros.push({
            campo: campoNivel,
            mensagem: "Selecione seu nível de conhecimento."
        });
    }


    // =================================================
    // 7. CAPTURANDO OS CHECKBOXES DOS TEMAS
    // =================================================

    // Array vazio onde vamos guardar os temas escolhidos.
    const temasSelecionados = [];

    // :checked pega somente os checkboxes marcados.
    const temas = document.querySelectorAll(
        'input[name="temas"]:checked'
    );

    // Percorre todos os temas marcados.
    temas.forEach(function (tema) {

        // Coloca o valor de cada tema dentro do array.
        temasSelecionados.push(tema.value);
    });


    // =================================================
    // 8. REMOVENDO ERROS ANTERIORES
    // =================================================

    // Se a pessoa clicou anteriormente e apareceram erros,
    // removemos as mensagens antes de fazer uma nova validação.

    document.querySelectorAll(".erro").forEach(function (erro) {
        erro.remove();
    });


    // Remove também a classe que deixava os campos vermelhos.
    document.querySelectorAll(".campo-erro").forEach(function (campo) {
        campo.classList.remove("campo-erro");
    });


    // =================================================
    // 9. VALIDANDO O NOME COMPLETO
    // =================================================

    // Selecionamos o campo do nome.
    const campoNome = document.getElementById("nomeCompleto");

    // trim() remove espaços no começo e no final.
    const nomeCompleto = dados.nome.trim();

    // Divide o nome em palavras.
    //
    // Exemplo:
    // "Maria Silva"
    //
    // vira:
    // ["Maria", "Silva"]
    const partesNome = nomeCompleto.split(/\s+/);


    // O nome precisa:
    // 1. Ter pelo menos 5 caracteres
    // 2. Ter pelo menos duas palavras
    //    (nome + sobrenome)

    if (
        nomeCompleto.length < 5 ||
        partesNome.length < 2
    ) {

        erros.push({
            campo: campoNome,
            mensagem:
                "Digite seu nome completo, incluindo pelo menos um sobrenome."
        });
    }


    // =================================================
    // 10. VALIDANDO O E-MAIL
    // =================================================

    const campoEmail = document.getElementById("email");

    // Essa expressão verifica se o e-mail possui
    // uma estrutura básica:
    //
    // exemplo@gmail.com
    //
    // Tem:
    // - texto antes do @
    // - @
    // - texto depois do @
    // - ponto
    // - domínio
    const emailValido =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
            dados.email.trim()
        );


    // Se não for um e-mail válido...
    if (!emailValido) {

        erros.push({
            campo: campoEmail,
            mensagem: "Digite um e-mail válido."
        });
    }


    // =================================================
    // 11. VALIDANDO A IDADE
    // =================================================

    const campoIdade =
        document.getElementById("idade");

    // trim() verifica se ficou apenas vazio,
    // mesmo que a pessoa tenha colocado espaços.
    if (dados.idade.trim() === "") {

        erros.push({
            campo: campoIdade,
            mensagem: "Informe sua idade."
        });
    }


    // =================================================
    // 12. VALIDANDO A DATA DE NASCIMENTO
    // =================================================

    const campoDataNascimento =
        document.getElementById("dataNasc");

    // Se a data estiver vazia...
    if (dados.dataNascimento === "") {

        erros.push({
            campo: campoDataNascimento,
            mensagem: "Informe sua data de nascimento."
        });
    }


    // =================================================
    // 13. VALIDANDO A SENHA
    // =================================================

    const campoSenha =
        document.getElementById("senha");


    // Verifica se a senha possui pelo menos 8 caracteres.
    const senhaTemOitoCaracteres =
        dados.senha.length >= 8;


    // \d verifica se existe pelo menos um número.
    //
    // Exemplos:
    // "abcdefgh" → não possui número
    // "abc12345" → possui número
    const senhaTemNumero =
        /\d/.test(dados.senha);


    // A senha precisa cumprir AS DUAS regras.
    //
    // Se faltar qualquer uma delas, dá erro.
    if (
        !senhaTemOitoCaracteres ||
        !senhaTemNumero
    ) {

        erros.push({
            campo: campoSenha,
            mensagem:
                "A senha deve ter pelo menos 8 caracteres e conter pelo menos um número."
        });
    }


    // =================================================
    // 14. VALIDANDO OS TEMAS
    // =================================================

    // Se o array estiver vazio,
    // significa que nenhum tema foi marcado.
    if (temasSelecionados.length === 0) {

        const campoTemas =
            document.querySelector('input[name="temas"]');

        erros.push({
            campo: campoTemas,
            mensagem:
                "Selecione pelo menos um tema de interesse."
        });
    }


    // =================================================
    // 15. VALIDANDO A TRILHA
    // =================================================

    const campoTrilha =
        document.getElementById("trilha");


    // No seu HTML, a primeira opção possui value="",
    // então conseguimos verificar se a pessoa escolheu
    // alguma trilha.
    if (dados.trilha === "") {

        erros.push({
            campo: campoTrilha,
            mensagem: "Selecione uma trilha."
        });
    }


    // =================================================
    // 16. VALIDANDO A APRESENTAÇÃO
    // =================================================

    const campoApresentacao =
        document.getElementById("apresentacao");


    // Remove espaços do começo e do final.
    const apresentacaoLimpa =
        dados.apresentacao.trim();


    // A apresentação precisa ter pelo menos 20 caracteres.
    if (apresentacaoLimpa.length < 20) {

        erros.push({
            campo: campoApresentacao,
            mensagem:
                "A apresentação deve ter pelo menos 20 caracteres."
        });
    }


    // =================================================
    // 17. MOSTRANDO OS ERROS
    // =================================================

    // Se o tamanho do array for maior que zero,
    // significa que encontramos pelo menos um erro.
    if (erros.length > 0) {


        // Percorremos cada erro encontrado.
        erros.forEach(function (erro) {


            // Adiciona a classe "campo-erro"
            // ao campo que está errado.
            erro.campo.classList.add("campo-erro");


            // Criamos um elemento <p>
            // para mostrar a mensagem.
            const mensagem =
                document.createElement("p");


            // Colocamos a classe "erro"
            // para podermos estilizar com CSS.
            mensagem.className = "erro";


            // Colocamos o texto da mensagem.
            mensagem.textContent =
                erro.mensagem;


            // Colocamos a mensagem logo depois do campo.
            erro.campo.insertAdjacentElement(
                "afterend",
                mensagem
            );
        });


        // Para a execução aqui.
        //
        // Portanto:
        // - não cria o resumo
        // - não limpa o formulário
        return;
    }


    // =================================================
    // 18. CRIANDO O RESUMO
    // =================================================

    const resumo =
        document.createElement("div");

    resumo.className = "resumo";


    // =================================================
    // 19. TÍTULO DO RESUMO
    // =================================================

    const tituloResumo =
        document.createElement("h2");

    tituloResumo.textContent =
        "📋 Resumo da inscrição";


    // =================================================
    // 20. NOME
    // =================================================

    const nome =
        document.createElement("p");

    nome.textContent =
        `Nome: ${dados.nome}`;


    // =================================================
    // 21. E-MAIL
    // =================================================

    const email =
        document.createElement("p");

    email.textContent =
        `E-mail: ${dados.email}`;


    // =================================================
    // 22. SENHA
    // =================================================

    const senha =
        document.createElement("p");

    senha.textContent =
        `Senha: ${dados.senha}`;


    // =================================================
    // 23. IDADE
    // =================================================

    const idade =
        document.createElement("p");

    idade.textContent =
        `Idade: ${dados.idade}`;


    // =================================================
    // 24. DATA DE NASCIMENTO
    // =================================================

    const dataNascimento =
        document.createElement("p");

    dataNascimento.textContent =
        `Data de nascimento: ${dados.dataNascimento}`;


    // =================================================
    // 25. NÍVEL
    // =================================================

    const nivelTexto =
        document.createElement("p");

    nivelTexto.textContent =
        `Nível de conhecimento: ${nivel}`;


    // =================================================
    // 26. TEMAS
    // =================================================

    const temasTexto =
        document.createElement("p");

    temasTexto.textContent =
        `Temas de interesse: ${temasSelecionados.join(", ")}`;


    // =================================================
    // 27. TRILHA
    // =================================================

    const trilhaTexto =
        document.createElement("p");

    trilhaTexto.textContent =
        `Trilha escolhida: ${dados.trilha}`;


    // =================================================
    // 28. APRESENTAÇÃO
    // =================================================

    const apresentacaoTexto =
        document.createElement("p");

    apresentacaoTexto.textContent =
        `Apresentação: ${dados.apresentacao}`;


    // =================================================
    // 29. COLOCANDO TUDO DENTRO DO RESUMO
    // =================================================

    resumo.appendChild(tituloResumo);

    resumo.appendChild(nome);

    resumo.appendChild(email);

    resumo.appendChild(senha);

    resumo.appendChild(idade);

    resumo.appendChild(dataNascimento);

    resumo.appendChild(nivelTexto);

    resumo.appendChild(temasTexto);

    resumo.appendChild(trilhaTexto);

    resumo.appendChild(apresentacaoTexto);


    // =================================================
    // 30. REMOVENDO RESUMO ANTERIOR
    // =================================================

    const resumoAnterior =
        document.querySelector(".resumo");


    // Se já existir um resumo,
    // remove antes de criar o novo.
    if (resumoAnterior) {
        resumoAnterior.remove();
    }


    // =================================================
    // 31. MOSTRANDO O RESUMO
    // =================================================

    // Coloca o resumo logo depois do formulário.
    formulario.insertAdjacentElement(
        "afterend",
        resumo
    );


    // =================================================
    // 32. LIMPANDO O FORMULÁRIO
    // =================================================

    // Depois de uma inscrição válida,
    // deixa o formulário novamente em branco.
    formulario.reset();

});