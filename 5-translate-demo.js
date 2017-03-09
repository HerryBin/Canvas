/**
 * Created by xianrongbin on 2017/3/8.
 */

var dom = document.getElementById('clock'),
    ctx = dom.getContext('2d');


ctx.save();//保存当前的图形状态 save 与restore 应该是成对出现的
ctx.fillStyle = 'red';
ctx.translate(100,100);
ctx.fillRect(0,0,400,400);

ctx.restore(); //返回在上面最近 save 节点前的状态
//如果不使用，则需要 translate(-100,-100);

ctx.fillStyle = 'blue';
ctx.translate(300,300); //有个坑，会叠加保存 上一次的 translate 价值
ctx.fillRect(0,0,400,400);



