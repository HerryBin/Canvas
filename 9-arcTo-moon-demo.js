/**
 * Created by xianrongbin on 2017/3/10.
 */

window.onload=function(){
    var dom = document.getElementById('clock'),
        ctx = dom.getContext('2d');

    arcToTest(ctx,20,20,300,20,500,800,160);
};


function arcToTest(ctx,x0,y0,x1,y1,x2,y2,r){
    ctx.beginPath();

    ctx.moveTo(x0,y0);
    ctx.arcTo(x1,y1,x2,y2,r);
    ctx.lineWidth=3;
    ctx.strokeStyle='red';
    ctx.stroke();

    ctx.moveTo(x0,y0);
    ctx.lineTo(x1,y1);
    ctx.lineTo(y2,y2);
    ctx.lineWidth=1;
    ctx.strokeStyle='gray';
    ctx.stroke();

    //绘制起点是( x0, y0 )，但是( x0, y0 )不一定是切点
    //arcTo 方法在( x0, y0 )( x1, y1 )和( x1, y1 )( x2, y2 )两条线段上寻找切点，
    //绘制圆弧（圆弧终止于( x1, y1 )( x2, y2 )这条线段的切点），
    //( x2, y2 )不一定是所绘制圆弧的终点，只是作为辅助线的结束位置

    ctx.closePath();
}

/*
A 坐标(400,100)
B 坐标(400,700)
H 坐标(400,400)
C 坐标(600,400) 确保 H、C y坐标一致，用于辅助画 切线
求OA或OB，即内院的半径
整个原理 tanTT=AH/HC=R(0A)/AC R=AH*AC/HC
因此 需要求两点间的直线距离
 */
var domMoon = document.getElementById('canvasItem'),
    ctxMoon = domMoon.getContext('2d');

drawMoonOne();

//指定坐标轴画一个固定半月
function drawMoonOne() {
    ctxMoon.beginPath();
    ctxMoon.arc(400,400,300,0.5*Math.PI,1.5*Math.PI,true);//逆时针画半圆


    ctxMoon.moveTo(400,100);
    var AC=distance(400,100,600,400);
    var r=(400-100)*AC/(600-400);
    ctxMoon.arcTo(600,400,400,700,r);
    ctxMoon.stroke();
}


fillMonth(ctxMoon,2,300,400,80,30);
/**
 * 绘制半月，以(0,0) 为原型，1为半径
 * @param ctx
 * @param d 辅助坐标的y轴坐标长度（0,d),值最好在10范围内，因为外弧半径以1来进行计算
 * @param x 位移X坐标
 * @param y 位移y坐标
 * @param r 外圆弧默认以1为半径，外圆弧半径
 * @param rot 旋转角度
 * @param fillColor 填充颜色
 */
function fillMonth(ctx,d,x,y,r,rot,fillColor){
    ctx.save();

    ctx.translate(x,y);

    ctx.rotate(rot*Math.PI/180);
    ctx.scale(r,r);
    pathMoon(ctx,d);
    ctx.fillStyle=fillColor || '#fb5';
    ctx.fill();

    ctx.restore();
}
function pathMoon(ctx,d){
    ctx.beginPath();
    ctx.arc(0,0,1,0.5*Math.PI,1.5*Math.PI,true);
    ctx.moveTo(0,-1);//半径为1，从y轴 最上方定点开始绘制
    var disAC=distance(0,-1,d,0),
        innerRadius=disAC/d;
    ctx.arcTo(d,0,0,1,innerRadius);
    ctx.closePath();
}

/**
 * 计算坐标轴上两点之间的距离
 * @param x1
 * @param y1
 * @param x2
 * @param y2
 * @returns {number}
 */
function distance(x1,y1,x2,y2){
    return Math.sqrt(Math.pow((x1-x2),2)+Math.pow((y1-y2),2));
}
