// importação de dependência(s)
import express from 'express';
import fs from 'fs';
const app = express();

// variáveis globais deste módulo
const PORT = 3000
const db = {}

// EXERCÍCIO 1
// configurar para servir os arquivos estáticos da pasta "client"
// dica: 1 linha de código
app.use(express.static(`client/`));

// abrir servidor na porta 3000 (constante PORT)
// dica: 1-3 linhas de código
app.listen(3000, () => {
    console.log('Escutando em: http://localhost:3000')
})

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
app.get('/jogador/:id', (req, res) => {
    let id = req.params.id;
    let jogador = db.jogadores.players.find(jogador => jogador.steamid == id);
    let jogos = db.jogosPorJogador[id].games;
    let qntdJogos = db.jogosPorJogador[id].game_count;
    let naoJogou = jogos.reduce((acc, jog) => {
        if (jog.playtime_forever === 0) {
            acc.push(jog);
        }
        return acc;
    },[]);

    let top5Jogos = jogos.sort((a, b) => { return b.playtime_forever - a.playtime_forever; }).slice(0, 5);
    
    top5Jogos.map(jogo => { jogo.playtime_forever = Math.round(jogo.playtime_forever / 60); });

    let jogoFavorito = top5Jogos[0];

    res.render('jogador', {
        jogador: jogador,
        jogos: jogos,
        qntdJogos: qntdJogos,
        naoJogou: naoJogou.length,
        top5Jogos: top5Jogos,
        jogoFavorito: jogoFavorito,
    });

});