// importação de dependência(s)
import express from 'express';
import fs from 'fs';
const app = express();
app.use( express.static(`client/`));

app.listen(3000, () => {
    console.log('Escutando em: http://localhost:3000')
})

// variáveis globais deste módulo
const PORT = 3000
const db = {}

// carregar "banco de dados" (data/jogadores.json e data/jogosPorJogador.json)
// você pode colocar o conteúdo dos arquivos json no objeto "db" logo abaixo
// dica: 1-4 linhas de código (você deve usar o módulo de filesystem (fs))
let jogadores = JSON.parse(fs.readFileSync('server/data/jogadores.json', 'utf8'));
let jogosPorJogador = JSON.parse(fs.readFileSync('server/data/jogosPorJogador.json', 'utf8'));

db.jogadores = jogadores;
db.jogosPorJogador = jogosPorJogador;

// configurar qual templating engine usar. Sugestão: hbs (handlebars)
//app.set('view engine', '???qual-templating-engine???');
//app.set('views', '???caminho-ate-pasta???');
// dica: 2 linhas
app.set('view engine', 'hbs');
app.set('views', 'server/views');

// EXERCÍCIO 2
// definir rota para página inicial --> renderizar a view index, usando os
// dados do banco de dados "data/jogadores.json" com a lista de jogadores
// dica: o handler desta função é bem simples - basta passar para o template
//       os dados do arquivo data/jogadores.json (~3 linhas)
app.get('/', (req, res) => {
    res.render('index', { jogadores: db.jogadores });
});


// EXERCÍCIO 3
// definir rota para página de detalhes de um jogador --> renderizar a view
// jogador, usando os dados do banco de dados "data/jogadores.json" e
// "data/jogosPorJogador.json", assim como alguns campos calculados
// dica: o handler desta função pode chegar a ter ~15 linhas de código


// EXERCÍCIO 1
// configurar para servir os arquivos estáticos da pasta "client"
// dica: 1 linha de código


// abrir servidor na porta 3000 (constante PORT)
// dica: 1-3 linhas de código
