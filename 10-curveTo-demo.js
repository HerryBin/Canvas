/**
 * Created by xianrongbin on 2017/3/11.
 */
var dom = document.getElementById('clock'),
    ctx = dom.getContext('2d');

drawQuadratic();

/**
 * 二次贝赛尔曲线
 */
function drawQuadratic(){
    ctx.lineWidth=6;

    ctx.beginPath();
    ctx.moveTo(200,200);
    ctx.quadraticCurveTo(300,50,400,200);
    ctx.lineTo(200,200);
    ctx.closePath();//放在stroke之前可以，让尾巴自然闭合，没有空隙
    ctx.stroke();
}

drawBezierCurve();

/**
 * 三次贝赛尔曲线
 */
function drawBezierCurve(){
    ctx.fillStyle='green';
    ctx.beginPath();
    ctx.moveTo(0,750);
    ctx.bezierCurveTo(300,400,530,900,800,600);
    ctx.lineTo(800,800);
    ctx.lineTo(0,800);
    ctx.lineTo(0,600);


    ctx.closePath();
    ctx.fill();
}


