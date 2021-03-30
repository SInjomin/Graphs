var canvas;
var ctx;

function Init() {
    canvas = document.getElementById("cnvs");
    canvas.Width = 420 //������ ������
    canvas.Height = 320 //������ ������
    ctx = canvas.getContext("2d");
    Draw();
}

function Draw() {
    ctx.fillStyle = "rgb(255,255,255)"
    ctx.fillRect(0, 0, canvas.Width, canvas.Height);
    ctx.fill();
}

canvas.onclick = function (e) {
    var x = (e.pageX - canvas.offsetLeft) / cellSize | 0;
    var y = (e.pageY - canvas.offsetTop)  / cellSize | 0;
    event(x, y); // ����� ������� ��������
}