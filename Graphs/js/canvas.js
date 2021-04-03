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
    canvas.Width = 800 //Ширина холста
    canvas.Height = 600 //Высота холста
    ctx = canvas.getContext("2d");
    Draw();
    console.log("Initialisated");

    canvas.onclick = (e) => {
        var x = (e.pageX - canvas.offsetLeft);
        var y = (e.pageY - canvas.offsetTop);
        switch (actionType) {
            case "AddTop":
                addTop(x, y);
                break;
            case "SetLine":
                addLine(e);
                break;
            default:
                alert("Выберите действие");
                break;
        };
    };

    canvas.ontouchend = (e) => { // обрабатываем касания пальцем
        var x = (e.touches[0].pageX - canvas.offsetLeft);
        var y = (e.touches[0].pageY - canvas.offsetTop);
        switch (actionType) {
            case "AddTop":
                addTop(x, y);
                break;
            case "SetLine":
                addLine(e);
                break;
            default:
                alert("Выберите действие");
                break;
        };
    };
}

function Draw() {
    ctx.fillStyle = "rgb(255, 255, 255)"
    ctx.fillRect(0, 0, canvas.Width, canvas.Height);
    Tops = [];
    Lines = [];
}

function addTop(x, y) {
    let top = new Top(x, y)
    Tops.push(top);
}

function Top(x, y) {
    if (!new.target) { // в случае, если вы вызвали без оператора new
        return new Top(x, y); // ...добавим оператор new за вас
    }

    ctx.beginPath();
    ctx.strokeStyle = "black";
    ctx.fillStyle = "rgb(104,174,186)";
    var arectangle = new Path2D();
    arectangle.id = Tops.length;
    arectangle.arc(x, y, 8, 2 * Math.PI, 0, true)
    ctx.closePath();
    ctx.fill(arectangle);

    this.y = y;
    this.x = x;
    this.arectangle = arectangle;
}

var x1, y1, x2, y2;

async function addLine(e) {
    
    Tops.forEach(f => {
        if (ctx.isPointInPath(f.arectangle, e.offsetX, e.offsetY)) {
            ctx.beginPath();
            ctx.fillStyle = "red";
            ctx.arc(Tops[f.arectangle.id].x, Tops[f.arectangle.id].y, 8, 0, 2 * Math.PI);
            ctx.fill();
            ctx.closePath();

            if (x1 == null && y1 == null) {
                x1 = f.x;
                y1 = f.y;
            }
            else if (x2 == null && y2 == null) {
                x2 = f.x;
                y2 = f.y;
                Lines.push(new Line(x1, y1, x2, y2));
                x1 = null;
                x2 = null;
                y1 = null;
                y2 = null;
            }
            else {
                alert("error");
                x1 = null;
                x2 = null;
                y1 = null;
                y2 = null;
            }
        }
    })
}

function Line(x1, y1, x2, y2) {
    if (!new.target) { // в случае, если вы вызвали без оператора new
        return new Line(x1, y1, x2, y2); // ...добавим оператор new за вас
    }

    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;

    ctx.fillStyle = "rgb(104, 174, 186)";
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.fill()
    ctx.stroke();
    ctx.closePath();
    ctx.beginPath();
    ctx.arc(x1, y1, 8, 2 * Math.PI, 0);
    ctx.fill()
    ctx.closePath();
    ctx.beginPath();
    ctx.arc(x2, y2, 8, 2 * Math.PI, 0);
    ctx.fill()
    ctx.closePath();
}