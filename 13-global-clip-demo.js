/**
 * Created by xianrongbin on 2017/3/12.
 * 透明度\剪辑画布 应用 让五角星缩放 背景显示文字
 */
var dom = document.getElementById('clock'),
    ctx = dom.getContext('2d'),
    searchLight = {
        x: 400,
        y: 400,
        radius: 200,
        vx: Math.random() * 5 + 10,
        vy: Math.random() * 5 + 10
    },
    isIncrease=true;

setInterval(function(){
    draw(ctx);
    update(ctx.canvas.width,ctx.canvas.height);
},40);

function draw(ctx){
    ctx.clearRect(0,0,ctx.canvas.width,ctx.canvas.height);
    ctx.save();

    ctx.beginPath();
    ctx.fillStyle='black';
    ctx.fillRect(0,0,ctx.canvas.width,ctx.canvas.height);

    ctx.save();
    ctx.translate(searchLight.x,searchLight.y);
    ctx.scale(searchLight.radius,searchLight.radius);
    starPath(ctx);
    ctx.fillStyle='#fff';
    ctx.fill();
    ctx.restore();
    ctx.clip();

    ctx.font='bold 150px Arial';
    ctx.textAlign='center';
    ctx.textBaseline='middle';
    ctx.fillStyle='#058';

    ctx.fillText('I love China',dom.width/2,dom.height/4);
    ctx.fillText('I love money',dom.width/2,dom.height/2);
    ctx.fillText('I love family',dom.width/2,dom.height*3/4);

    ctx.restore();
}

function starPath(ctx) {
    ctx.beginPath();

    for (var i = 0; i < 5; i++) {
        var outRad = (18 + i * 72) / 180 * Math.PI,
            innerRad = (54 + i * 72) / 180 * Math.PI;
        ctx.lineTo(Math.cos(outRad), -Math.sin(outRad));
        ctx.lineTo(Math.cos(innerRad) * 0.5, -Math.sin(innerRad) * 0.5);
    }

    ctx.closePath();
}

function update(canWidth, canHeight) {
    if(searchLight.radius>700){
        isIncrease=false;
    }else if(searchLight.radius<150){
        isIncrease=true;
    }

    if(isIncrease){
        searchLight.radius+=5;
    }else{
        searchLight.radius-=5;
    }
}

var dom1 = document.getElementById('canvasItem'),
    ctx1 = dom1.getContext('2d');

ctx1.fillStyle = 'blue';
ctx1.fillRect(100, 200, 400, 400);

//ctx1.globalAlpha='0.4';

ctx1.globalCompositeOperation = 'lighter';//default source-over 11种属性
ctx1.fillStyle = 'red';

//绘制三角形
ctx1.beginPath();
ctx1.moveTo(400, 300);
ctx1.lineTo(650, 700);
ctx1.lineTo(150, 700);
ctx1.closePath();
ctx1.fill();