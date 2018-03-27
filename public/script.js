var socket;

socket = io.connect('http://localhost:3000');

var data = {};
var name = "Anon " + Math.floor(Math.random() * 10000);

var content = document.getElementById("send-content");
var submit = document.getElementById("send-submit");
var receive = document.getElementsByClassName("msg")[0];

//Submit Chat
submit.onclick = function (e) {
    //Collect Data
    data = {
        name: name,
        content: content.value
    };

    //Send Data
    socket.emit('chat', data);

    //Self Data
    newChat(data);

    //Clear Field
    content.value = "";
}

//Match enter and submit
document.onkeyup = function (e) {
    if (e.keyCode == 13) submit.onclick();
}

//Receive
socket.on('newChat', newChat);

function newChat(data) {
    var a = "";

    a += '<div class="msg-item" ';
    var b = Number(data.name.substring(5));
    a += 'style="background-color: hsl(' + b % 256 + ', ' + Math.round(b / 128 + 20) + '%, 80%);" >';
    a += '<div class="item-name">';
    a += data.name;
    a += '</div><div class="item-content">';
    a += data.content;
    a += '</div></div>';

    receive.innerHTML += a;
}

newChat({
    name: "Bot  0",
    content: "Welcome, " + name
});



setInterval(function () {
    socket.emit('checkin', {});
}, 100);
