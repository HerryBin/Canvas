var dom = document.getElementById('clock'),
    ctx = dom.getContext('2d');

    //坐标位置默认基于 浏览器窗口(0,0),此时居中，基于 当前坐标系
    ctx.beginPath();
    ctx.moveTo(100,350); //只是将坐标移到某点
    ctx.lineTo(500,350); //将两个点之间连接起来
    ctx.lineTo(500,200);
    ctx.lineTo(600,350); //基于状态绘制图像 此时，状态设置

    ctx.moveTo(600,450);
    ctx.lineTo(600,500);
    ctx.lineWidth=10;
    ctx.strokeStyle='red';

    ctx.stroke();

    /*绘制不同 属性的 线条，使用beginPath 重新开启一条全新的路径*/
    ctx.beginPath();
    //ctx.moveTo(100,520);
    ctx.lineTo(100,520); //使用lineTo 相当于 moveTo,当使用了beginPath
    ctx.lineTo(600,520);
    ctx.lineWidth=3;
    ctx.strokeStyle='blue';
    ctx.stroke();


    ctx.beginPath();

    ctx.moveTo(100,560);
    ctx.lineTo(600,560);
    ctx.lineWidth=30;
    ctx.strokeStyle='yellow';

    ctx.stroke(); //绘制

