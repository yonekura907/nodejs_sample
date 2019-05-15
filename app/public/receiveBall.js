//socket.ioの保存
var socket = io();

//受け取り用のオブジェクト
var receiveData = {};

//サーバーからデータを受信
socket.on('serverToPc', function(data) {
    receiveData = data;
    console.log(receiveData);
});
