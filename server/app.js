// importação de dependência(s)
import express from "express";
import { readFile } from "fs";

// variáveis globais deste módulo
const PATH_PLAYERS = "./server/data/jogadores.json";
const PATH_GAMESBYPLAYERS = "./server/data/jogosPorJogador.json";
const PORT = 3000;
const db = {};

const app = express();

// carregar "banco de dados" (data/jogadores.json e data/jogosPorJogador.json)
// você pode colocar o conteúdo dos arquivos json no objeto "db" logo abaixo
// dica: 1-4 linhas de código (você deve usar o módulo de filesystem (fs))

readFile(PATH_PLAYERS, (err, data) => {
  if (err) throw err;
  db.players = JSON.parse(data).players;
});

readFile(PATH_GAMESBYPLAYERS, (err, data) => {
  if (err) throw err;
  db.gameByPlayers = JSON.parse(data);
});

// configurar qual templating engine usar. Sugestão: hbs (handlebars)
// dica: 2 linhas'
app.set("view engine", "hbs");
app.set("views", "server/views/");

// EXERCÍCIO 2
// definir rota para página inicial --> renderizar a view index, usando os
// dados do banco de dados "data/jogadores.json" com a lista de jogadores
// dica: o handler desta função é bem simples - basta passar para o template
//       os dados do arquivo data/jogadores.json (~3 linhas)
app.get("/", function (req, res) {
  res.render("index", db);
});

// EXERCÍCIO 3
// definir rota para página de detalhes de um jogador --> renderizar a view
// jogador, usando os dados do banco de dados "data/jogadores.json" e
// "data/jogosPorJogador.json", assim como alguns campos calculados
// dica: o handler desta função pode chegar a ter ~15 linhas de código

// EXERCÍCIO 1
// configurar para servir os arquivos estáticos da pasta "client"
// dica: 1 linha de código
app.use(express.static("client"));

// abrir servidor na porta 3000 (constante PORT)
// dica: 1-3 linhas de código
app.listen(PORT, () => {
  console.log(`Escutando em: http://localhost:${PORT}`);
});
