/**
 * Created by xianrongbin on 2017/3/25.
 */
var canvas = document.getElementById('canvas'),
    ctx = canvas.getContext('2d'),
    canvasWidth = window.innerWidth,
    canvasHeight = window.innerHeight,
    radius = 100;

canvas.width = canvasWidth;
canvas.height = canvasHeight;

var image = new Image(),
    clippingRegion = {
        x: -1,
        y: -1,
        r: radius
    },//剪辑区域
    leftMargin=0,
    topMargin=0;

image.src = '1.jpg';

image.onload = function () {

    $('#blur-div').css('width', canvasWidth + 'px');
    $('#blur-div').css('height', canvasHeight + 'px');

    $('#showImg').css('width', image.width + 'px');
    $('#showImg').css('height', image.height + 'px');
    topMargin = (image.height - canvasHeight) / 2;
    leftMargin = (image.width - canvasWidth) / 2;

    $('#showImg').css('top', String(- topMargin) + 'px');
    $('#showImg').css('left', String(- leftMargin) + 'px');

    initCanvas();
};

function initCanvas() {
    //当画布比图片大的时候多出来的部分
    var theLeft = leftMargin < 0 ? -leftMargin : 0;
    var theTop = topMargin < 0 ? -topMargin : 0;
    clippingRegion = {
        x: Math.random() * (canvas.width - 2 * radius - 2 * theLeft) + radius + theLeft,
        y: Math.random() * (canvas.height - 2 * radius - 2 * theTop) + radius + theTop, r: radius
    };
    draw(image, clippingRegion);
}

function setClippingRegion(clippingRegion) {
    //创建一个圆形的剪辑区域
    ctx.beginPath();
    ctx.arc(clippingRegion.x, clippingRegion.y, clippingRegion.r, 0, 2 * Math.PI);
    ctx.clip();//希望是剪辑区域
    ctx.closePath();

}
function draw(image, clippingRegion) {
    console.log(clippingRegion.r);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    setClippingRegion(clippingRegion);
    ctx.drawImage(image,
        Math.max(leftMargin, 0),
        Math.max(topMargin, 0),
        Math.min(canvas.width, image.width),
        Math.min(canvas.height, image.height),
        leftMargin < 0 ? -leftMargin : 0,
        topMargin < 0 ? -topMargin : 0,
        Math.min(canvas.width, image.width),
        Math.min(canvas.height, image.height)
    );
    ctx.restore();
}

function reset() {
    initCanvas();
}

function show() {
    var thsAnimation = setInterval(function () {
        clippingRegion.r += 100;
        if (clippingRegion.r > 2 * Math.max(canvas.height, canvas.width)) {
            clearInterval(thsAnimation);
        }
        draw(image, clippingRegion);
    }, 30);
}