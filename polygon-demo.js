/**
 * Created by xianrongbin on 2017/3/7.
 */
var dom = document.getElementById('clock'),
    ctx = dom.getContext('2d');


drawRect(ctx,100,200,100,100,10,'blue','red');

//使用rgba 最后参数，指定透明度 rgba(100,100,300,0.6)
//hsla(40,82%,33%,0.8);
drawRectByApi(ctx,150,250,100,100,10,'Yellow','hsla(40,82%,33%,0.8)');
/**
 * 矩形画图
 * @param ctx 画板上下文
 * @param x 起始X 坐标
 * @param y 起始y 坐标
 * @param width 宽度
 * @param height 高度
 * @param borderWidth 边宽
 * @param borderColor 边框颜色
 * @param fillColor 填充色
 */
function drawRect(ctx,x,y,width,height,borderWidth,borderColor,fillColor){
    ctx.beginPath();

    ctx.moveTo(x,y);
    ctx.lineTo(x+width,y);
    ctx.lineTo(x+width,y+height);
    ctx.lineTo(x,y+height);

    ctx.closePath();//如果不适用 closePath() 绘制的多边型很可能出现缺角，可以省略最后 ctx.lineTo(x,y)

    ctx.strokeStyle=borderColor;
    ctx.fillStyle=fillColor;
    ctx.lineWidth=borderWidth;

    ctx.fill();//填充色后，边框内的线条会被颜色填充色，因此，应该后描边
    ctx.stroke();
}

function drawRectByApi(ctx,x,y,width,height,borderWidth,borderColor,fillColor){

    ctx.strokeStyle=borderColor;
    ctx.fillStyle=fillColor;
    ctx.lineWidth=borderWidth;

    ctx.fillRect(x,y,width,height); //并没有绘制边框，只有填充色
    ctx.strokeRect(x,y,width,height);
}