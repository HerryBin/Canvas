/**
 * Created by xianrongbin on 2017/3/8.
 */
var dom = document.getElementById('clock'),
    ctx = dom.getContext('2d'),
    cirucle = Math.PI;

//ctx.lineJoin='miter'; //round 圆角  bevel 斜角 miter尖角
//ctx.miterLimit=150;//默认10 只有当 lineJoin=miter，当超过这个度数，会变成bevel，只有显示十分尖锐的角，才会修改

ctx.fillStyle = 'black';
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
    var r = Math.random() * 10 + 20,//Math.random() 生产10-20随机数
        x = Math.random() * dom.width,
        y = Math.floor(Math.random() * dom.height),
        a = Math.floor(Math.random() * 360);
    drawStar(ctx, x, y, r, r / 2.0, a);
}
