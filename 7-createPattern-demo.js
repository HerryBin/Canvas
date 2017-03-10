/**
 * Created by xianrongbin on 2017/3/9.
 * 图片填充
 */
var dom = document.getElementById('clock'),
    ctx = dom.getContext('2d'),
    cirucle = Math.PI;

var bgImage=new Image();

bgImage.src='bk.jpg';

bgImage.onload=function () {
    //repeat-x,repeat-y,repeat,no-repeat
    var patternStyle=ctx.createPattern(bgImage,'no-repeat');
    ctx.fillStyle=patternStyle;
    ctx.fillStyle(0,0,ctx.canvas.width,ctx.canvas.height);
};


/**
 * demo2 createPattern 提供一种方式，使得我们可以自己绘制自己喜欢的图案
 */

var dom1 = document.getElementById('canvasItem'),
    ctx1 = dom1.getContext('2d');

var backCanvas=createBgCanvas();
var patternOne=ctx1.createPattern(backCanvas,'repeat');
ctx1.fillStyle=patternOne;
ctx1.fillRect(0,0,ctx1.canvas.width,ctx1.canvas.height);

function createBgCanvas(){
    var backCanvas=document.createElement('canvas');
    backCanvas.width=100;
    backCanvas.height=100;
    var backCanvasContext=backCanvas.getContext('2d');
    drawStar(backCanvasContext,50,50,50,25,0);
    return backCanvas;
}

function drawStar(ctx, x, y, outerR, innerR, rot) {
    ctx.beginPath();
    for (var i = 0; i < 5; i++) {
        var ourRad = (18 + i * 72 - rot) / 180 * cirucle,
            innerRad = (54 + i * 72 - rot) / 180 * cirucle;

        ctx.lineTo(Math.cos(ourRad) * outerR + x,
            -Math.sin(ourRad) * outerR + y);

        ctx.lineTo(Math.cos(innerRad) * innerR + x,
            -Math.sin(innerRad) * innerR + y);
    }
    ctx.closePath();

    ctx.fillStyle = '#c1c';
    ctx.strokeStyle = '#fd5';
    ctx.lineWidth = 3;
    ctx.stroke();
    ctx.fill();
}