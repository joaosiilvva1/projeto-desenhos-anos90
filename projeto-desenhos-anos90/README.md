# Galeria de Personagens — Desenhos 90/2000 (Rick and Morty API)

Projeto acadêmico em HTML, CSS e JavaScript puros, consumindo dados em tempo real da API pública **Rick and Morty**.

## Prévia
- Busca por nome e filtro por status (Alive/Dead/Unknown)
- Paginação
- Cards **gerados dinamicamente** via `createElement` + `appendChild`
- Layout responsivo e acessível

## Como executar localmente
1. Baixe os arquivos e extraia a pasta.
2. Abra o arquivo `index.html` no seu navegador (duplo clique).
   - Para evitar bloqueios de CORS em algumas máquinas, é recomendado subir um servidor local simples:
     - Python 3: `python -m http.server 5500`
     - Node: `npx serve .` (se tiver o `serve`)
3. Acesse `http://localhost:5500/` (ou a porta mostrada no terminal).

## Publicação no GitHub Pages
1. Crie um repositório no GitHub e envie os arquivos (`index.html`, `style.css`, `script.js`).
2. Nas configurações do repo, ative **Pages** com a branch `main` e pasta `/root`.
3. Aguarde alguns minutos e acesse a URL pública gerada.

## API utilizada
- Documentação: https://rickandmortyapi.com/documentation
- Endpoint base usado: `https://rickandmortyapi.com/api/character`
- Sem autenticação / token.

## Licença
Uso educacional.
