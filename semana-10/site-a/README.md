# Semana 10 — Sites de prática (Responsividade)

Quatro mini-sites estáticos para a atividade de sala de aula. Cada pasta tem um `index.html` e um `style.css`. Abra o arquivo HTML no navegador e use as ferramentas de desenvolvedor (modo dispositivo / tela estreita) para inspecionar o layout.

Não há JavaScript nem frameworks. A tag de viewport também não está nos HTMLs.

## Site A — Institucional (`site-a-institucional/`)

Landing page da **Aurora Consultoria**.

Problemas de responsividade:

- O menu do topo fica em uma única linha horizontal e não se reorganiza quando a tela fica estreita.
- O banner da seção inicial tem largura fixa, maior do que a tela de um celular, e empurra o restante da página.
- Blocos de serviços, sobre e equipe também estão lado a lado, com largura fixa, e não empilham.

## Site B — E-commerce (`site-b-ecommerce/`)

Catálogo da loja de tênis **Piso Firme**.

Problemas de responsividade:

- A grade de produtos não quebra para a linha de baixo: os cards ficam em uma faixa contínua e a página pede scroll horizontal.
- As imagens dos produtos têm largura fixa maior que o card (e maior que a tela de um celular), então estouram o container.
- Cabeçalho, faixa de promoção e bloco de destaque também usam largura fixa e não cabem em telas pequenas.

## Site C — Blog (`site-c-blog/`)

Blog pessoal fictício **Diário da Ilha**.

Problemas de responsividade:

- O texto do corpo está com fonte muito pequena, difícil de ler no celular.
- A coluna lateral permanece ao lado do conteúdo principal e não desce / empilha em telas estreitas.
- A página inteira (cabeçalho, layout e imagem do post) tem largura fixa maior que a viewport de um telefone.

## Site D — Dashboard (`site-d-dashboard/`)

Painel administrativo fictício da **Atlas Comercial**.

Problemas de responsividade:

- A tabela de pedidos tem muitas colunas e uma largura grande, gerando scroll horizontal.
- Os botões de ação (ver / editar / excluir) são menores que 30px, difíceis de tocar com o dedo.
- O menu lateral, os cards de indicador e o painel como um todo estão em largura fixa e não se reorganizam no celular.
