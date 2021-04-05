var canvas;
var ctx;

var Tops = [];
var Lines = [];

var actionType = "AddTop";

function setActionType(type) {
    actionType = type;
}

function Init() {

    canvas = document.getElementById("cnvs");
    console.log(toString(canvas));
    ctx = canvas.getContext("2d");
    canvas.Width = 800;
    canvas.Height = 600;
    clearScreen();
    console.log("Initialisated");

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
        };
    }

}

function clearScreen() {
    ctx.fillStyle = "rgb(255, 255, 255)"
    ctx.fillRect(0, 0, canvas.Width, canvas.Height);
    Tops = [];
    Lines = [];
}

function Top(x, y) {
    if (!new.target) { // � ������, ���� �� ������� ��� ��������� new
        return new Top(x, y); // ...������� �������� new �� ���
    }
    
    var arectangle;

    this.DrawTop = function (strokeStyle = "black", fillStyle = "rgb(104,174,186)"){
        ctx.beginPath();
        ctx.strokeStyle = strokeStyle;
        ctx.fillStyle = fillStyle;
        var rectangle = new Path2D();
        rectangle.id = Tops.length;
        rectangle.arc(x, y, 8, 2 * Math.PI, 0, true)
        ctx.closePath();
        ctx.fill(rectangle);
        arectangle = rectangle;
    }

    this.DrawTop();

    this.arectangle = arectangle;
    this.y = y;
    this.x = x;
    
}

var Top1, Top2;

async function addLine(e) {
    
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

    this.x1 = Top1.x;
    this.y1 = Top1.y;
    this.x2 = Top2.x;
    this.y2 = Top2.y;

    ctx.beginPath();
    ctx.moveTo(this.x1, this.y1);
    ctx.lineTo(this.x2, this.y2);
    ctx.fill()
    ctx.stroke();
    ctx.closePath();
    Top1.DrawTop();
    Top2.DrawTop();
}