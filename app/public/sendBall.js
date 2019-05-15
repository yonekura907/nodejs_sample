//socket.ioの保存
var socket = io();

let myId; //id用
let posX; //x座標
let posY; //y座標

//最初にサーバーからsocketのidを受け取る
socket.on('sendSocketId', function(data) {
    myId = data.id;
    console.log(myId);
});

function setup() {
    createCanvas(windowWidth, windowHeight);
    background(0);
    colorMode(HSB, 360, 100, 100, 100);
    posX = windowWidth/2;
    posY = windowHeight/2;
}

function draw() {
    noStroke();
    fill(0, 100, 0, 10);
    rect(0, 0, windowWidth, windowHeight);
    fill(200, 100, 100, 50);
    ellipse(posX, posY, 50, 50);
}

function mouseDragged() {
    posX = mouseX;
    posY = mouseY;

    //serverに送るデータ
    var sendData = {
        id: myId,
        x: posX,
        y: posY
    }
    //serverにデータを送信
    socket.emit('spToServer', sendData);
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}
