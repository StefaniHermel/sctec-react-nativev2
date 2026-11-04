const abrirChamado = (numero, solicitante, categoria, prioridade) => ({
    numero,
    solicitante,
    categoria,
    prioridade,
    status: "Aberto"
});

console.log(
    abrirChamado(
        101,
        "João Silva",
        "Suporte Técnico - Computador",
        "Alta"
    )
);