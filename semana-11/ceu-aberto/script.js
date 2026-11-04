// =====================================================
// 1. PEGANDO OS ELEMENTOS DO HTML
// =====================================================

const botaoCelsius = document.querySelector("#botao-celsius");
const botaoFahrenheit = document.querySelector("#botao-fahrenheit");

const temperatura = document.querySelector("#temperatura");
const sensacao = document.querySelector("#sensacao");


// =====================================================
// 2. VALORES DAS TEMPERATURAS
// =====================================================

const temperaturaAgora = 23;
const sensacaoTermica = 24;


// =====================================================
// 3. PREVISÃO DOS PRÓXIMOS 7 DIAS
// =====================================================

const previsao = [
    { id: "temp-hoje", max: 26, min: 16 },
    { id: "temp-segunda", max: 27, min: 17 },
    { id: "temp-terca", max: 24, min: 16 },
    { id: "temp-quarta", max: 22, min: 15 },
    { id: "temp-quinta", max: 25, min: 16 },
    { id: "temp-sexta", max: 28, min: 17 },
    { id: "temp-sabado", max: 29, min: 18 }
];


// =====================================================
// 4. CONVERTER CELSIUS PARA FAHRENHEIT
// =====================================================

function paraFahrenheit(celsius) {

    // Fórmula:
    // (°C × 9 / 5) + 32

    // Math.round() arredonda o resultado
    return Math.round((celsius * 9 / 5) + 32);
}


// =====================================================
// 5. ATUALIZAR A TELA
// =====================================================

function atualizarTela(unidade) {

    // Verifica se a unidade escolhida é Fahrenheit
    if (unidade === "fahrenheit") {

        // Converte a temperatura atual
        const temperaturaFahrenheit =
            paraFahrenheit(temperaturaAgora);

        // Converte a sensação térmica
        const sensacaoFahrenheit =
            paraFahrenheit(sensacaoTermica);

        // Mostra os valores na tela
        temperatura.textContent =
            temperaturaFahrenheit + " °F";

        sensacao.textContent =
            sensacaoFahrenheit + " °F";

        // Ativa o botão Fahrenheit
        botaoFahrenheit.classList.add("ativa");

        // Desativa o botão Celsius
        botaoCelsius.classList.remove("ativa");

    } else {

        // Mostra a temperatura em Celsius
        temperatura.textContent =
            temperaturaAgora + " °C";

        // Mostra a sensação térmica em Celsius
        sensacao.textContent =
            sensacaoTermica + " °C";

        // Ativa o botão Celsius
        botaoCelsius.classList.add("ativa");

        // Desativa o botão Fahrenheit
        botaoFahrenheit.classList.remove("ativa");
    }


    // =================================================
    // 6. ATUALIZAR A PREVISÃO
    // =================================================

    previsao.forEach(function (dia) {

        // Encontra o elemento correspondente no HTML
        const elemento =
            document.querySelector("#" + dia.id);

        // Se estiver em Fahrenheit
        if (unidade === "fahrenheit") {

            const maxFahrenheit =
                paraFahrenheit(dia.max);

            const minFahrenheit =
                paraFahrenheit(dia.min);

            elemento.textContent =
                maxFahrenheit + "° / " +
                minFahrenheit + "°";

        } else {

            // Se estiver em Celsius
            elemento.textContent =
                dia.max + "° / " +
                dia.min + "°";
        }
    });
}


// =====================================================
// 7. BOTÃO CELSIUS
// =====================================================

botaoCelsius.addEventListener("click", function () {

    // Salva Celsius no localStorage
    localStorage.setItem(
        "unidadeTemperatura",
        "celsius"
    );

    // Atualiza a tela
    atualizarTela("celsius");
});


// =====================================================
// 8. BOTÃO FAHRENHEIT
// =====================================================

botaoFahrenheit.addEventListener("click", function () {

    // Salva Fahrenheit no localStorage
    localStorage.setItem(
        "unidadeTemperatura",
        "fahrenheit"
    );

    // Atualiza a tela
    atualizarTela("fahrenheit");
});


// =====================================================
// 9. VERIFICAR A UNIDADE SALVA
// =====================================================

// Pega a unidade salva no navegador
const unidadeSalva =
    localStorage.getItem("unidadeTemperatura");


// Se não houver nada salvo,
// começa em Celsius
if (unidadeSalva === null) {

    atualizarTela("celsius");

} else {

    // Usa a unidade que foi salva
    atualizarTela(unidadeSalva);
}