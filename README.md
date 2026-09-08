# Igrejar Web

Site estático (React + Vite) que hospeda os dados do app Igrejar — devocionais e igrejas — como JSON, servido via GitHub Pages. O app mobile busca esses arquivos em tempo de execução, então atualizar um devocional ou os dados de uma igreja não exige gerar uma nova versão do app.

## URLs de dados

Depois do primeiro deploy, os arquivos ficam acessíveis em:

- `https://dinahapuque.github.io/igrejar-web/data/devotionals.json`
- `https://dinahapuque.github.io/igrejar-web/data/churches.json`

## Como atualizar os devocionais

1. Edite `public/data/devotionals.json`.
2. Adicione um novo objeto no **início** do array (mais recente primeiro), seguindo o formato:

```json
{
  "id": "4",
  "title": "Título do devocional",
  "verse": "Livro Capítulo:Versículo",
  "date": "2026-09-10",
  "content": "Texto do devocional. Use \\n\\n para separar parágrafos."
}
```

3. Faça commit e push para `main`. O GitHub Actions publica automaticamente em 1-2 minutos.

## Como atualizar as igrejas

`public/data/churches.json` segue a mesma estrutura usada no app (`ChurchType`). Pode ser editado manualmente ou regenerado a partir do `src/data/churches.ts` do app mobile (veja o repositório `IgrejarApp`).

## Deploy

O deploy é automático via GitHub Actions (`.github/workflows/deploy.yml`) a cada push em `main`. Para habilitar pela primeira vez:

1. No repositório do GitHub, vá em **Settings → Pages**.
2. Em "Build and deployment", selecione **Source: GitHub Actions**.
3. Faça push — o workflow builda e publica automaticamente.

## Desenvolvimento local

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # gera a pasta dist/
npm run preview   # testa o build de produção localmente
```
