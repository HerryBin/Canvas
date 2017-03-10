/**
 * Created by xianrongbin on 2017/3/9.
 */

/* strokeStyle 或 fillStyle 属性的值*/

/**
 * Demo1  创建线性渐变
 */

var dom = document.getElementById('clock'),
    ctx = dom.getContext('2d');

var linearGrad=ctx.createLinearGradient(-200,0,600,0);//此时是斜型渐变 ，将最后参数变成0，则为 横向渐变

//CanvasGradient.prototype.addColorStop = function(offset,color) {};
linearGrad.addColorStop(0.0,'white');// offset 介于 0.0 与 1.0 之间的值，表示渐变中开始与结束之间的位置
linearGrad.addColorStop(0.25,'green');
linearGrad.addColorStop(0.5,'blue');
linearGrad.addColorStop(0.75,'yellow');
linearGrad.addColorStop(0.8,'#Efff12');

ctx.fillStyle=linearGrad;
ctx.fillRect(0,0,600,600);



/**
 * Demo2 创建径向渐变
 */

var dom1 = document.getElementById('canvasItem'),
    ctx1 = dom1.getContext('2d');

/**
 * 渐变的开始圆 x，y坐标，半径
 * 渐变的结束圆
 */
var radialGrad=ctx1.createRadialGradient(400,400,100,400,400,500);

radialGrad.addColorStop(0.25,'yellow');
radialGrad.addColorStop(0.5,'green');
radialGrad.addColorStop(0.75,'blue');
radialGrad.addColorStop(1.0,'red');

ctx1.fillStyle=radialGrad;
ctx1.fillRect(0,0,800,800);
