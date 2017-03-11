/**
 * Created by xianrongbin on 2017/3/10.
 * 绘制圆弧矩形
 */
var dom = document.getElementById('clock'),
    ctx = dom.getContext('2d');


fillRoundRect(ctx,150,150,500,500,10,'#bbada0');
for(var i=0;i<4;i++){
    for(var j=0;j<4;j++){
        fillRoundRect(ctx,170+i*120,170+j*120,100,100,6,'#ccc0b3');
    }
}

/**
 *
 * @param ctx
 * @param x
 * @param y
 * @param width
 * @param height
 * @param radius
 */

function fillRoundRect(ctx,x,y,width,height,radius,fileStyle){
    if(2*radius>width || 2*radius>height){
        return;
    }
    ctx.save();

    ctx.translate(x,y);
    ctx.fillStyle=fileStyle || 'black';
    pathRoundRect(ctx,width,height,radius);
    ctx.fill();
    ctx.restore();
}

/**
 * 绘制 圆弧矩形路径，从右下角的点开始绘制,这样是从0度开始,2π结束
 * @param ctx
 * @param width 矩形宽
 * @param height 矩形高
 * @param radius 圆弧半径
 */
function pathRoundRect(ctx,width,height,radius){
    ctx.beginPath();
    //arc( ) 中的角度单位是弧度。无论绘制是逆时针还是顺时针,x轴右方 为正方向是0π,
    //y轴 下方为正方形，为π/2，顺时针增大
    ctx.arc(width-radius,height-radius,radius,0,Math.PI/2,false);
    ctx.lineTo(radius,height);

    ctx.arc(radius,height-radius,radius,Math.PI/2,Math.PI,false);
    ctx.lineTo(0,radius);

    ctx.arc(radius,radius,radius,Math.PI,Math.PI*1.5,false);
    ctx.lineTo(width-radius,0);

    ctx.arc(width-radius,radius,radius,Math.PI*1.5,Math.PI*2,false);

    ctx.closePath();
}