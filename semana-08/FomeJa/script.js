// FomeJá — exercício de seleção de elementos no DOM

// ---------------------------------------------
// 1. getElementById

const tituloApp = document.getElementById('titulo-app');
tituloApp.textContent = "FomeJá — abertos agora";


// ---------------------------------------------
// 2. getElementById

const input = document.getElementById('busca');
input.placeholder = "Pizza, açaí, hambúrguer...";


// ---------------------------------------------
// 3. getElementsByClassName

const cards = document.getElementsByClassName('restaurante-card');
console.log(cards.length);


// ---------------------------------------------
// 4. getElementsByTagName

const botoes = document.getElementsByTagName('button');
console.log(botoes.length);


// ---------------------------------------------
// 5. querySelector

const primeiroRestaurante = document.querySelector('.nome-restaurante');
console.log(primeiroRestaurante.textContent);


// ---------------------------------------------
// 6. querySelector

const promocao = document.querySelector("#promocao");
console.log(promocao.querySelector('.nome-restaurante').textContent);


// ---------------------------------------------
// 7. querySelectorAll

const restaurantes = document.querySelectorAll('.restaurante-card .nome-restaurante');
restaurantes.forEach(restaurante => {
    console.log(restaurante.textContent);
});


// ---------------------------------------------
// 8. Desafio final

const resultado = document.getElementById('resultado');

const quantidadeRestaurantes = cards.length;

const nomePromocao = promocao
    ? promocao.querySelector('.nome-restaurante').textContent
    : "Nenhuma promoção";

resultado.innerHTML = `${quantidadeRestaurantes} restaurantes encontrados.<br>
Promoção: ${nomePromocao}`;


// ---------------------------------------------
// Banner do cupom

const bannerCupom = document.getElementById('banner-cupom');
bannerCupom.innerHTML = 'Cupom Liberado <strong>FOME10</strong> — 10% off no primeiro pedido';


// ---------------------------------------------
// Ativação das categorias

const categorias = document.querySelectorAll('.categoria');
const botaoPedir = document.querySelectorAll('.botao-pedir');

categorias.forEach(categoria => {

    categoria.addEventListener('click', () => {

        const ativa = document.querySelector('.categoria.ativa');
        if (ativa) {
            ativa.classList.remove('ativa');
        }

        categoria.classList.add('ativa');

    });

});


// ---------------------------------------------
// ---------------------------------------------
// Botão Pedir 

botaoPedir.forEach(botao => {

    botao.addEventListener('click', () => {

        const card = botao.closest('.restaurante-card');
       
        // Sempre limpa qualquer card que estava ativo antes
        const cardAtual = document.querySelector('.pedido-ativo');

        if (cardAtual) {
            cardAtual.classList.remove('pedido-ativo');

            const botaoAntigo = cardAtual.querySelector('.botao-pedir');
            botaoAntigo.style.backgroundColor = '';
            botaoAntigo.textContent = 'Pedir';
        }

        // Confirma o pedido
        card.classList.add('pedido-ativo');
        
        botao.style.backgroundColor = '#22c55e';
        botao.textContent = 'Pedido!';

        const nomeRestaurante = card.querySelector('.nome-restaurante').textContent;

        resultado.innerHTML = `Pedido enviado para ${nomeRestaurante}!`;
    });

});