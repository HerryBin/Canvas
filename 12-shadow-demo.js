/**
 * Created by xianrongbin on 2017/3/11.
 * 阴影的基本用法
 */
var dom = document.getElementById('clock'),
    ctx = dom.getContext('2d');

ctx.fillStyle='#058';
ctx.shadowColor='gray';
ctx.shadowOffsetX=20;
ctx.shadowOffsetY=-20;
ctx.shadowBlur=5;//阴影模糊程度 值越大 越模糊

ctx.fillRect(200,200,400,400);

ctx.fillStyle='red';
ctx.font='40px Bold';
ctx.fillText('I love CHINA so much',300,300);
