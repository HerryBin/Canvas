/**
 * Created by xianrongbin on 2017/3/13.
 * 对canvas进行扩展 继承
 */

var dom = document.getElementById('clock'),
    ctx = dom.getContext('2d');

var originalMoveTo = CanvasRenderingContext2D.prototype.moveTo;
CanvasRenderingContext2D.prototype.lastMoveToLoc = {};

CanvasRenderingContext2D.prototype.moveTo = function (x, y) {
    originalMoveTo.apply(ctx, [x, y]);
    this.lastMoveToLoc.x = x;
    this.lastMoveToLoc.y = y;
};

/**
 *
 * @param innerR 内圆半径
 * @param outR 外圆半径
 * @param rot
 */

CanvasRenderingContext2D.prototype.fillStar = function (innerR, outR, rot, fillColor) {
    this.beginPath();
    for (var i = 0; i < 5; i++) {
        var outRad = (18 + i * 72 - rot) / 180 * Math.PI,
            innerRad = (54 + i * 72 - rot) / 180 * Math.PI;

        this.lineTo(Math.cos(outRad) * outR + this.lastMoveToLoc.x,
            -Math.sin(outRad) * outR + this.lastMoveToLoc.y);

        this.lineTo(Math.cos(innerRad) * innerR + this.lastMoveToLoc.x,
            -Math.sin(innerRad) * innerR + this.lastMoveToLoc.y);
    }
    this.fillStyle = fillColor || 'red';
    this.closePath();
    this.fill();
};

ctx.moveTo(400,400);
ctx.fillStar(200,400, 0);
