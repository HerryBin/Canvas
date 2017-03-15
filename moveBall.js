/**
 * Created by xianrongbin on 2017/3/12.
 */

var dom = document.getElementById('moveBall'),
    ctx = dom.getContext('2d'),
    balls = [],
    isMoving = true,
    themeColor = 'white';

//ctx.translate(ctx.canvas.width/2,ctx.canvas.height/2);

for (var i = 0; i < 100; i++) {
    var red = Math.floor(Math.random() * 255),
        green = Math.floor(Math.random() * 255),
        blue = Math.floor(Math.random() * 255),
        radius = Math.random() * 50 + 20,
        aBall = {
            color: 'rgb(' + red + ',' + green + ',' + blue + ')',
            radius: radius,
            x:Math.random()*(dom.width-2*radius)+radius,
            y:Math.random()*(dom.height-2*radius)+radius,
            vx:(Math.random()*5+5)*Math.pow(-1,Math.floor(Math.random()*100)),
            vy:(Math.random()*5+5)*Math.pow(-1,Math.floor(Math.random()*100)),
        };
    balls[i]=aBall;
}

setInterval(function () {
    draw(ctx);
    if(isMoving){
        update(dom.width,dom.height);
    }
},50);

function  draw() {
    var canvas=ctx.canvas;
    ctx.clearRect(0,0,canvas.width,canvas.height);
    if(themeColor=='black'){

    }
    for(var i=0;i<balls.length;i++){
        var ball=balls[i];
        ctx.fillStyle=ball.color;
        ctx.beginPath();
        ctx.arc(ball.x,ball.y,ball.radius,0,Math.PI*2);
        ctx.closePath();
        ctx.fill();
    }
}

function update(canvasWidth,canvasHeight){

    for (var i = 0; i < balls.length; i++) {
        balls[i].x += balls[i].vx;
        balls[i].y += balls[i].vy;

        if (balls[i].x - balls[i].radius <= 0) {
            balls[i].vx = -balls[i].vx;
            balls[i].x = balls[i].radius;
        }

        if (balls[i].x + balls[i].radius >= canvasWidth) {
            balls[i].vx = -balls[i].vx;
            balls[i].x = canvasWidth - balls[i].radius;
        }

        if (balls[i].y - balls[i].radius <= 0) {
            balls[i].vy = -balls[i].vy;
            balls[i].y = balls[i].radius;
        }

        if (balls[i].y + balls[i].radius >= canvasHeight) {
            balls[i].vy = -balls[i].vy;
            balls[i].y = canvasHeight - balls[i].radius;
        }
    }
}