var canvas;
var ctx;

var Tops = [];
var Lines = [];

var actionType = "AddTop";

function setActionType(type) {
    actionType = type;
}

function Init() {

    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    clearScreen();

    canvas.onclick = (e) => {
        var x = (e.pageX - canvas.offsetLeft);
        var y = (e.pageY - canvas.offsetTop);
        action(actionType,x,y,e);
    };

    canvas.ontouchend = (e) => { // ������������ ������� �������
        var x = (e.touches[0].pageX - canvas.offsetLeft);
        var y = (e.touches[0].pageY - canvas.offsetTop);
        action(actionType,x,y,e);
    };

    function action(actionType,x,y,e){
        switch (actionType) {
            case "AddTop":
                Tops.push(new Top(x, y));
                break;
            case "SetLine":
                addLine(e);
                break;
            default:
                alert("�������� ��������");
                break;
        }
    }

}

function clearScreen() {
    ctx.fillStyle = "rgb(255, 255, 255)"
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    Tops = [];
    Lines = [];
}

function Top(x, y) {
    if (!new.target) { // � ������, ���� �� ������� ��� ��������� new
        return new Top(x, y); // ...������� �������� new �� ���
    }

    this.DrawTop = function (strokeStyle = "black",
                             fillStyle = "rgb(104,174,186)",
                             radius = 26){
        ctx.beginPath();
        ctx.strokeStyle = strokeStyle;
        ctx.fillStyle = fillStyle;
        this.arectangle = new Path2D();
        this.arectangle.arc(x, y, radius, 2 * Math.PI, 0, true)
        ctx.closePath();
        ctx.fill(this.arectangle);
    }

    this.connectedLines = [];
    this.DrawTop();
    this.y = y;
    this.x = x;
    
}

var Top1, Top2;

function addLine(e) {
    
    Tops.forEach(f => {
        if (ctx.isPointInPath(f.arectangle, e.offsetX, e.offsetY)) {
            f.DrawTop(undefined, "red");

            if (Top1 == null) {
                Top1 = f;
            }
            else if (Top2 == null) {
                Top2 = f;
                Lines.push(new Line(Top1,Top2));
                Top1 = null;
                Top2 = null;
            }
            else {
                alert("error");
                Top1 = null;
                Top2 = null;
            }
        }
    })
}

function Line(Top1, Top2) {
    if (!new.target) { // � ������, ���� �� ������� ��� ��������� new
        return new Line(Top1, Top2); // ...������� �������� new �� ���
    }

    Top1.connectedLines.push(this);
    Top2.connectedLines.push(this);

    this.Top1 = Top1;
    this.Top2 = Top2;

    this.DrawLine = function (strokeStyle = "black", lineWidth = 10) {
        ctx.lineWidth = lineWidth;
        ctx.strokeStyle = strokeStyle;
        ctx.beginPath();
        ctx.moveTo(this.Top1.x, this.Top1.y);
        ctx.lineTo(this.Top2.x, this.Top2.y);
        ctx.stroke();
        ctx.closePath();

        this.Top1.DrawTop();
        this.Top2.DrawTop();
    }

    this.DrawLine();
}