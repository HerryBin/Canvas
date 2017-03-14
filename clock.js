/**
 * Created by xianrongbin on 2017/3/5.
 */
var dom = document.getElementById('clock'),
    ctx = dom.getContext('2d'),
    width = ctx.canvas.width,
    height = ctx.canvas.height,
    r = width / 2,//半径
    rem=width/200;

function drawBackGround() {
    ctx.save(); //保存当前环境

    ctx.translate(r, r);//变换矩阵添加水平的和垂直的偏移 让（0,0）左边居中
    ctx.lineWidth = 10*rem;
    ctx.beginPath();


    //弧度=弧长/半径
    //一个圆的弧长 =2πr
    //1度的弧长=2πr/360
    //1度的弧度 = 2π/360
    //一个圆的弧度是2π
    ctx.arc(0, 0, r - 5, 0, 2 * Math.PI, false);//Math.PI圆周率,
    // 圆心的坐标、半径、
    // 圆指定弧的开始点和结束点的一个角度 0弧度，是从沿着 X 轴正半轴的三点钟方向的角度为 0
    // 弧沿着圆周的逆时针方向（TRUE）还是顺时针方向（FALSE）遍历
    ctx.stroke(); //绘制已定义的路径

    //绘制小时文字
    var hourNumbers = [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 1, 2];
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font =18*rem+ "px Arial";

    hourNumbers.forEach(function (number, i) {
        var rad = 2 * Math.PI / 12 * i,//0弧度 刚好 i=0起下标
            x = Math.cos(rad) * (r - 30),
            y = Math.sin(rad) * (r - 30);
        ctx.fillText(number, x, y); //绘制填色的文本
    });

    //画刻度
    for (var i = 0; i < 60; i++) {
        var rad = 2 * Math.PI / 60 * i,//0弧度 刚好 i=0起下标
            x = Math.cos(rad) * (r - 18),
            y = Math.sin(rad) * (r - 18);

        ctx.beginPath();

        if (i % 5 === 0) {
            console.log(i);
            //小时 后面加黑点
            ctx.fillStyle = '#000';
        } else {
            ctx.fillStyle = '#ccc';
        }

        ctx.arc(x, y, 2, 0, 2 * Math.PI, false);

        ctx.fill();
    }
}

function drawDot() {
    ctx.beginPath();
    ctx.fillStyle = 'red';
    ctx.arc(0, 0, 4, 0, 2 * Math.PI, false);
    ctx.fill();
}

function drawHour(hour, minute) {

    ctx.save();

    var hourRand = 2 * Math.PI / 12 * hour,//小时弧度数
        minuteRand = 2 * Math.PI / 12 / 60 * minute;
    ctx.beginPath();
    ctx.rotate(hourRand + minuteRand);
    ctx.lineWidth = 6;
    ctx.moveTo(0, 10);
    ctx.lineTo(0, -r / 2);
    ctx.lineCap = "round";
    ctx.stroke();
    ctx.restore(); //非常重要 返回之前保存过的路径状态和属性
}

function drawMinute(minute, second) {
    ctx.save();//保存画布的状态

    var minuteRand = 2 * Math.PI / 60 * minute,
        secondRand = 2 * Math.PI / 12 / 60 * second;
    ctx.beginPath();
    ctx.rotate(minuteRand);
    ctx.lineWidth = 6;
    ctx.moveTo(0, 10);
    ctx.lineTo(0, -r / 2);
    ctx.lineCap = "round";
    ctx.stroke();
    ctx.restore();
}

function drawSecond(minute) {
    ctx.save();
    var rand = 2 * Math.PI / 60 * minute;
    ctx.beginPath();
    ctx.rotate(rand);
    ctx.fillStyle = 'red'; //颜色的改变需要填充 fill
    ctx.lineWidth = 13;

    ctx.moveTo(-2, 20);//x 为负数 靠左，y为负数 靠上
    ctx.lineTo(2, 20);
    ctx.lineTo(1, -r + 18);
    ctx.lineTo(-1, -r + 18);

    ctx.lineCap = "round";
    ctx.fill();
    //ctx.stroke();
    ctx.restore();
}

function draw() {
    ctx.clearRect(0, 0, width, height);
    var now = new Date(),
        hour = now.getHours(),
        minute = now.getMinutes(),
        second = now.getSeconds();

    drawBackGround();
    drawDot();
    drawHour(hour, minute);
    drawMinute(minute, 20);
    drawSecond(second);

    ctx.restore();
}

draw();
setInterval(draw,1000);


