/**
 * Created by xianrongbin on 2017/3/21.
 */
window.onload = function () {
    var canvasWidth = 800,
        canvasHeight = canvasWidth,
        canvas = document.getElementById('canvas'),
        context = canvas.getContext('2d');

//html文档中显示的大小。不是具体的分辨率。通常在js中写出大小。
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;

    canvas.onmousedown=function(e){
        e.preven
    };

    canvas.onmouseup=function(e){

    };

    canvas.onmousemove=function (e) {

    };

    drawGrid();

    function drawGrid() {

        context.save()

        context.strokeStyle = "rgb(230,11,9)"

        context.beginPath()
        context.moveTo(3, 3)
        context.lineTo(canvasWidth - 3, 3)
        context.lineTo(canvasWidth - 3, canvasHeight - 3)
        context.lineTo(3, canvasHeight - 3)
        context.closePath()
        context.lineWidth = 6
        context.stroke()

        context.beginPath()
        context.moveTo(0, 0)
        context.lineTo(canvasWidth, canvasHeight)

        context.moveTo(canvasWidth, 0)
        context.lineTo(0, canvasHeight)

        context.moveTo(canvasWidth / 2, 0)
        context.lineTo(canvasWidth / 2, canvasHeight)

        context.moveTo(0, canvasHeight / 2)
        context.lineTo(canvasWidth, canvasHeight / 2)

        context.lineWidth = 1
        context.stroke()

        context.restore()
    }
};

