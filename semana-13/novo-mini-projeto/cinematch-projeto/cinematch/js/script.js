"use strict";

// ---------- Dados do catálogo (carregados de data/titulos.json) ----------
let TITULOS = [];
let TODOS_GENEROS = [];

async function carregarTitulos() {
  const resposta = await fetch("data/titulos.json");
  TITULOS = await resposta.json();
  TODOS_GENEROS = [...new Set(TITULOS.flatMap(t => t.generos))].sort();
}

// ---------- Estado / persistência ----------
let perfil = { nome: "", idade: null, generos: [] };
try {
  const salvo = localStorage.getItem("cinematch-perfil");
  if (salvo) perfil = JSON.parse(salvo);
} catch (e) { /* localStorage indisponível: segue com perfil vazio */ }

function salvarPerfil() {
  try { localStorage.setItem("cinematch-perfil", JSON.stringify(perfil)); }
  catch (e) { /* ignora falha de storage */ }
}

// ---------- Elementos ----------
const elNome = document.getElementById("nome-usuario");
const elIdade = document.getElementById("idade-usuario");
const elGeneros = document.getElementById("generos-usuario");
const formPerfil = document.getElementById("form-perfil");
const gridGeneros = document.getElementById("grid-generos");
const inputNome = document.getElementById("input-nome");
const inputIdade = document.getElementById("input-idade");
const resultado = document.getElementById("resultado");
const secaoBusca = document.getElementById("secao-busca");
const campoBusca = document.getElementById("campo-busca");
const botoesMenu = document.querySelectorAll(".menu button");

// ---------- Render perfil ----------
function renderPerfil() {
  elNome.textContent = perfil.nome || "Não informado";
  elIdade.textContent = perfil.idade != null && perfil.idade !== "" ? perfil.idade : "Não informado";
  elGeneros.textContent = perfil.generos.length ? perfil.generos.join(", ") : "Não informado";
}

function montarGridGeneros() {
  gridGeneros.innerHTML = "";
  TODOS_GENEROS.forEach(g => {
    const chip = document.createElement("span");
    chip.className = "genero-chip" + (perfil.generos.includes(g) ? " selecionado" : "");
    chip.textContent = g;
    chip.addEventListener("click", () => {
      if (perfil.generos.includes(g)) {
        perfil.generos = perfil.generos.filter(x => x !== g);
      } else {
        perfil.generos.push(g);
      }
      chip.classList.toggle("selecionado");
    });
    gridGeneros.appendChild(chip);
  });
}

document.getElementById("btn-editar-perfil").addEventListener("click", () => {
  inputNome.value = perfil.nome || "";
  inputIdade.value = perfil.idade || "";
  montarGridGeneros();
  formPerfil.style.display = formPerfil.style.display === "none" ? "block" : "none";
});

document.getElementById("btn-salvar-perfil").addEventListener("click", () => {
  perfil.nome = inputNome.value.trim();
  perfil.idade = inputIdade.value ? Number(inputIdade.value) : null;
  salvarPerfil();
  renderPerfil();
  formPerfil.style.display = "none";
});

// ---------- Utilidades ----------
function marcarBotaoAtivo(id) {
  botoesMenu.forEach(b => b.classList.toggle("ativo", b.id === id));
}

function precisaDePerfil() {
  return perfil.generos.length === 0;
}

function mensagemVazia(texto) {
  resultado.innerHTML = `<p class="vazio">${texto}</p>`;
}

function badgeIdade(classificacao) {
  if (classificacao === 0) return `<span class="badge-idade badge-livre">Livre</span>`;
  return `<span class="badge-idade badge-restrito">${classificacao}+</span>`;
}

function renderTicket(t, { compat = null, destaque = false } = {}) {
  const barra = compat != null
    ? `<div class="barra-compat"><div class="barra-compat-fill" style="width:${compat}%"></div></div>
       <p class="compat-texto">${compat}% de afinidade com seus gêneros favoritos</p>`
    : "";
  return `
    <div class="ticket${destaque ? " recomendado" : ""}">
      <div class="ticket-topo">
        <span class="ticket-titulo">${t.titulo}</span>
        <span class="ticket-ano">${t.ano}</span>
      </div>
      <p class="ticket-meta">
        ${t.tipo} · ${badgeIdade(t.classificacao)}
        ${t.generos.map(g => `<span class="tag">${g}</span>`).join("")}
      </p>
      <p class="ticket-sinopse">${t.sinopse}</p>
      ${barra}
    </div>`;
}

function calcularCompatibilidade(titulo) {
  if (perfil.generos.length === 0) return 0;
  const comuns = titulo.generos.filter(g => perfil.generos.includes(g)).length;
  const pct = (comuns / perfil.generos.length) * 100;
  return Math.round(pct > 100 ? 100 : pct);
}

// ---------- Ações do menu ----------
function abrirCatalogo() {
  marcarBotaoAtivo("btn-catalogo");
  secaoBusca.style.display = "none";
  resultado.innerHTML = TITULOS.map(t => renderTicket(t)).join("");
}

function abrirBuscar() {
  marcarBotaoAtivo("btn-buscar");
  secaoBusca.style.display = "block";
  mensagemVazia("Digite um título acima e toque em Pesquisar.");
  campoBusca.focus();
}

function executarBusca() {
  const termo = campoBusca.value.trim().toLowerCase();
  if (!termo) { mensagemVazia("Digite algo para pesquisar."); return; }
  const encontrados = TITULOS.filter(t => t.titulo.toLowerCase().includes(termo));
  if (encontrados.length === 0) {
    mensagemVazia(`Nenhum título encontrado para "${campoBusca.value.trim()}".`);
  } else {
    resultado.innerHTML = encontrados.map(t => renderTicket(t)).join("");
  }
}

function abrirCompatibilidade() {
  marcarBotaoAtivo("btn-compatibilidade");
  secaoBusca.style.display = "none";
  if (precisaDePerfil()) {
    mensagemVazia('Escolha seus gêneros favoritos em "Editar perfil" para ver a compatibilidade.');
    return;
  }
  const comResultados = TITULOS
    .map(t => ({ t, compat: calcularCompatibilidade(t) }))
    .sort((a, b) => b.compat - a.compat);
  resultado.innerHTML = comResultados
    .map(({ t, compat }) => renderTicket(t, { compat }))
    .join("");
}

function abrirRecomendacao() {
  marcarBotaoAtivo("btn-recomendacao");
  secaoBusca.style.display = "none";
  if (precisaDePerfil()) {
    mensagemVazia('Escolha seus gêneros favoritos em "Editar perfil" para receber uma recomendação.');
    return;
  }
  const ranking = TITULOS
    .map(t => ({ t, compat: calcularCompatibilidade(t) }))
    .sort((a, b) => b.compat - a.compat);
  const melhor = ranking[0];
  resultado.innerHTML =
    `<p class="vazio" style="margin-bottom:0.8rem;">Sua melhor recomendação, ${perfil.nome || "cinéfilo"}:</p>` +
    renderTicket(melhor.t, { compat: melhor.compat, destaque: true });
}

function abrirTitulos() {
  marcarBotaoAtivo("btn-titulos");
  secaoBusca.style.display = "none";
  const lista = TITULOS
    .map(t => `<p class="ticket-sinopse" style="margin:0.4rem 0;"><strong>${t.titulo}</strong> — ${t.tipo}, ${t.ano} ${badgeIdade(t.classificacao)}</p>`)
    .join("");
  resultado.innerHTML = lista;
}

function abrirVerificarIdade() {
  marcarBotaoAtivo("btn-idade");
  secaoBusca.style.display = "none";
  if (perfil.idade == null || perfil.idade === "") {
    mensagemVazia('Informe sua idade em "Editar perfil" para ver os conteúdos liberados.');
    return;
  }
  const permitidos = TITULOS.filter(t => t.classificacao <= perfil.idade);
  const bloqueados = TITULOS.filter(t => t.classificacao > perfil.idade);
  let html = `<p class="vazio" style="margin-bottom:0.6rem;">Com ${perfil.idade} anos, você pode assistir a ${permitidos.length} de ${TITULOS.length} títulos.</p>`;
  html += permitidos.map(t => renderTicket(t)).join("");
  if (bloqueados.length) {
    html += `<p class="vazio" style="margin:1rem 0 0.6rem;">Bloqueados pela classificação indicativa:</p>`;
    html += bloqueados.map(t => `<p class="ticket-sinopse" style="margin:0.3rem 0;">${t.titulo} ${badgeIdade(t.classificacao)}</p>`).join("");
  }
  resultado.innerHTML = html;
}

// ---------- Listeners ----------
document.getElementById("btn-catalogo").addEventListener("click", abrirCatalogo);
document.getElementById("btn-buscar").addEventListener("click", abrirBuscar);
document.getElementById("btn-pesquisar").addEventListener("click", executarBusca);
campoBusca.addEventListener("keydown", e => { if (e.key === "Enter") executarBusca(); });
document.getElementById("btn-compatibilidade").addEventListener("click", abrirCompatibilidade);
document.getElementById("btn-recomendacao").addEventListener("click", abrirRecomendacao);
document.getElementById("btn-titulos").addEventListener("click", abrirTitulos);
document.getElementById("btn-idade").addEventListener("click", abrirVerificarIdade);

// ---------- Inicialização ----------
(async function iniciar() {
  await carregarTitulos();
  renderPerfil();
})();
