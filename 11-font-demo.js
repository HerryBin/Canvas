/**
 * Created by xianrongbin on 2017/3/11.
 */
var dom = document.getElementById('clock'),
    ctx = dom.getContext('2d');


ctx.font = '30px 宋体 bold';//default 20px sans-serif

/**
 * font-weight
 * @type {string} lighter normal(400) bold(700) bolder 100-900
 */

/**
 * font-variant
 * @type {string} normal small-caps
 */

/**
 * font-size
 * @type {string} 20px 20em 150%
 */

/**
 * font-style
 * @type {string} normal italic oblique
 */

/**
 * font-family
 * @type {string} css3 中支持@font-face 即 web安全字体
 */


ctx.strokeStyle = 'red';

var linearGrad = ctx.createLinearGradient(0, 200, 500, 500);
linearGrad.addColorStop('0.0', '#ffef25');
linearGrad.addColorStop('0.2', '#6657FF');
linearGrad.addColorStop('0.3', '#FF389F');
linearGrad.addColorStop('0.5', '#6BFF62');
linearGrad.addColorStop('1.0', '#4419FF');
ctx.fillStyle = linearGrad;

ctx.fillText('我是中国人 我热爱中国 我热爱中国', 100, 100);
ctx.stroke();

ctx.strokeText('我是中国人', 100, 150, 200);//最后参数 px，强行压缩


ctx.font = 'small-caps 40px sans-serif';
ctx.fillText('small-caps', 100, 220); //字体设为sans-serif 则会将小写字母变成大写，但字体高度没有改变

ctx.moveTo(200,250);
ctx.lineTo(200,300);
ctx.stroke();

/**
 * 文本横向对其方式
 * @type {string} left  center right
 */
ctx.textAlign='center'; //center的基准是以 x轴坐标为基准
ctx.fillText('textAlign=center', 200, 280);

/**
 * 文本纵向对其
 * @type {string} top middle bottom alphabetic ideographic(汉字） hanging（印度）
 */

ctx.moveTo(0,350);
ctx.lineTo(800,350);
ctx.stroke();

ctx.textBaseline='top';//top 是指基准线在文字的上方
ctx.fillText('ctx.textBaseline',200,350);

//文本度量

//ctx.measureText('').width;