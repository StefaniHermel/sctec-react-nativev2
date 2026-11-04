# CineMatch

App interativo de recomendação de filmes e séries, feito com HTML, CSS e JavaScript puro.

## Estrutura do projeto


cinematch/
├── index.html          → estrutura da página
├── css/
│   └── style.css        → estilos (tema "marquise de cinema")
├── js/
│   └── script.js        → toda a lógica e interatividade
├── data/
│   └── titulos.json      → catálogo de filmes e séries (dados)
├── package.json          → dependências do projeto
└── node_modules/         → dependências instaladas (gerado pelo npm install)


## Como rodar

1. Extraia o arquivo .zip.
2. Abra o terminal na pasta do projeto.
3. Instale as dependências (já vêm instaladas neste .zip, mas se apagar a pasta `node_modules`, rode):
   ```
   npm install
   ```
4. Inicie o servidor local:
   ```
   npm start
   ```
5. Abra o navegador em `http://localhost:8080`.

> O `script.js` carrega o catálogo com `fetch("data/titulos.json")`, e isso só funciona servindo os arquivos por um servidor (como o `http-server` incluído) — não abrindo o `index.html` direto no navegador com duplo clique.

## Funcionalidades

- Perfil (nome, idade, gêneros favoritos) salvo no navegador
- Catálogo completo
- Busca por título
- Cálculo de compatibilidade entre o perfil e cada título
- Recomendação do título com maior afinidade
- Listagem simples de títulos
- Verificação de conteúdos permitidos pela idade informada
