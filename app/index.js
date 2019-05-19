// express
const express = require('express');
const app = express();
// http server
const http = require('http').Server(app);
//socket.io
const io = require('socket.io')(http);


// 静的ファイルはpublicフォルダに入れる
app.use(express.static('public'));

// '/'でアクセスするとviewsフォルダのindex.htmlが開く
app.get('/', function(request, response) {
    response.sendFile(__dirname + '/views/index.html');
});
app.get('/rc', function(request, response) {
    response.sendFile(__dirname + '/views/receive.html');
});


//socket通信開始
io.on('connection', function(socket){
    console.log('通信中' + socket.id);

    //最初に送るid
    let clientData = {
        id: socket.id,
    }
    //最初にindex.htmlにidを送信
    socket.emit('sendSocketId', clientData);

    //index.htmlから送られてきたデータ
    socket.on('spToServer', function(data) {
        //socke.idの照合
        if (clientData.id === data.id) {
            clientData.x = data.x;
            clientData.y = data.y;
        }
        console.log('X:' + clientData.x, 'Y:' + clientData.y);

        //receive.htmlにデータを送信
        socket.broadcast.emit('serverToPc', clientData);
    });

    socket.on('disconnect', function(){
        console.log('通信解除');
        clientData = {};
    });
});


//通信中の確認
http.listen(3000, function(){
  console.log('listening on *:3000');
});
