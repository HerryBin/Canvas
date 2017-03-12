/**
 * Created by xianrongbin on 2017/3/8.
 * 本例子使用渐变画出  璀璨星空
 */
var dom = document.getElementById('clock'),
    ctx = dom.getContext('2d'),
    cirucle = Math.PI;

//ctx.lineJoin='miter'; //round 圆角  bevel 斜角 miter尖角
//ctx.miterLimit=150;//默认10 只有当 lineJoin=miter，当超过这个度数，会变成bevel，只有显示十分尖锐的角，才会修改

/*var skyStyle=ctx.createLinearGradient(0,0,0,ctx.canvas.height);*/

var skyStyle=ctx.createRadialGradient(dom.width/2,dom.height/2,0,dom.width/2,ctx.canvas.height,ctx.canvas.height);
skyStyle.addColorStop(0.0,'#035');
skyStyle.addColorStop(1.0,'black');

ctx.fillStyle =skyStyle; //填充天边渐变色
ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
ctx.fill();



/**
 *
 * @param ctx 画布上下文
 * @param r 内圆半径
 * @param R 外圆半径
 * @param x 横向偏移量
 * @param y 纵向偏移量
 * @param rot 选择度数
 */
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
for (var i = 0; i < 200; i++) {
    var r = Math.random() * 5 + 5,//Math.random() 生产10-20随机数
        x = Math.random() * dom.width,
        y = Math.random() * dom.height*0.65,
        a =Math.random() * 360;
    drawStar(ctx, x, y, r, r / 2.0, a);
}
