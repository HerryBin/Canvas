var dom = document.getElementById('clock'),
    ctx = dom.getContext('2d');


ctx.beginPath();
ctx.moveTo(100, 150); //只是将坐标移到某点
ctx.lineTo(500, 150); //将两个点之间连接起来
ctx.lineWidth = 30;
ctx.lineCap='butt';//square
ctx.strokeStyle = 'red';

ctx.stroke();

/*绘制不同 属性的 线条，使用beginPath 重新开启一条全新的路径*/
ctx.beginPath();

ctx.lineTo(100,220);
ctx.lineTo(500, 220);
ctx.lineCap='round'; //只能用于线段的开始处和结束处 不能用于连接处
ctx.lineWidth = 30;
ctx.strokeStyle = 'blue';
ctx.stroke();


ctx.beginPath();

ctx.moveTo(100, 290);
ctx.lineTo(500, 290);
ctx.lineWidth = 30;
ctx.lineCap='square';
ctx.strokeStyle = 'yellow';

ctx.stroke(); //绘制

