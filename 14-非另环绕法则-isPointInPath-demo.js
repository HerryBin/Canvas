/**
 * Created by xianrongbin on 2017/3/12.
 * 使用非零环绕法则 构建空心圆环
 */

var dom = document.getElementById('clock'),
    ctx = dom.getContext('2d');

ctx.arc(300, 300, 100, 0, Math.PI * 2, false);
ctx.arc(300, 300, 60, 0, Math.PI * 2, true);

ctx.shadowColor = '#5CFFDB';
ctx.shadowOffsetX = 5;
ctx.shadowOffsetY = 5;
ctx.shadowBlur = 28;

ctx.fillStyle = '#FF49C8';
ctx.fill();


var domMoon = document.getElementById('canvasItem'),
    ctxMoon = domMoon.getContext('2d'),
    balls = [];


window.onload = function () {
    for (var i = 0; i < 10; i++) {
        var aBall = {
            x: Math.random() * domMoon.width,
            y: Math.random() * domMoon.height,
            r: Math.random() * 50 + 20
        };

        balls[i] = aBall;
    }
    draw();
    domMoon.addEventListener('mousemove', detect);
};

function detect(event) {
    ctxMoon.clearRect(0,0,domMoon.width,domMoon.height);
    //得到相对于 画布的位置
    var x=event.clientX-domMoon.getBoundingClientRect().left,
        y=event.clientY-domMoon.getBoundingClientRect().top;
    for(var i=0;i<balls.length;i++){
        var ball = balls[i];

        ctxMoon.beginPath();
        ctxMoon.arc(ball.x, ball.y, ball.r, 0, Math.PI * 2);
        if(ctxMoon.isPointInPath(x,y)){
            ctxMoon.fillStyle = 'red';
        }else{
            ctxMoon.fillStyle = '#FF49C8';
        }
        ctxMoon.fill();
    }
}
function draw() {
    for (var i = 0; i < balls.length; i++) {
        var ball = balls[i];
        ctxMoon.fillStyle = '#FF49C8';
        ctxMoon.beginPath();
        ctxMoon.arc(ball.x, ball.y, ball.r, 0, Math.PI * 2);
        ctxMoon.fill();
        ctxMoon.closePath();
    }

}

