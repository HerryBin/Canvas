/**
 * Created by xianrongbin on 2017/3/21.
 */
window.onload = function () {
    var canvasWidth = 800,
        canvasHeight = canvasWidth,
        canvas = document.getElementById('canvas'),
        context = canvas.getContext('2d'),
        isMouseDown = false,
        lastLoc = {x: 0, y: 0},//记录鼠标按下时 坐标位置
        strokeColor = "black",//默认绘制颜色
        lineWidth = 10;

    //html文档中显示的大小。不是具体的分辨率。通常在js中写出大小。
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;

    /**
     * 画布有偏移量，得到在画布中的相对便宜坐标
     * @param point
     */
    function realCanvasPoint(point) {
        var bbf = canvas.getBoundingClientRect();
        return {
            x: Math.round(point.x - bbf.left),
            y: Math.round(point.y - bbf.top)
        }
    }

    /**
     * mouse down 或  start touch 具体操作
     * @param point 开始点的坐标
     */
    function beginStroke(point) {
        isMouseDown = true;
        lastLoc = {
            x: point.x,
            y: point.y
        }; //realCanvasPoint(point);
    }

    /**
     * mouse move 或 touch move 具体操作
     * @param point
     */
    function moveStroke(point) {
        if (isMouseDown) {

            var curLoc = {
                x: point.x,
                y: point.y
            }; //realCanvasPoint(point);
            context.beginPath();

            context.moveTo(lastLoc.x, lastLoc.y);
            context.lineTo(curLoc.x, curLoc.y);

            context.lineWidth = lineWidth;
            context.strokeStyle = strokeColor;
            context.lineCap = 'round';
            context.lineJoin = 'round';
            context.closePath();
            context.stroke();

            lastLoc = curLoc;
        }
    }

    //非移动端鼠标按下
    canvas.onmousedown = function (e) {
        e.preventDefault();
        beginStroke({
            x: e.clientX,
            y: e.clientY
        });
    };

    canvas.onmousemove = function (e) {
        e.preventDefault();
        moveStroke({
            x: e.clientX,
            y: e.clientY
        });
    };

    canvas.onmouseup = function (e) {
        e.preventDefault();
        isMouseDown = false;
    };

    //移动端 滑动操作
    canvas.addEventListener('touchstart', function (e) {
        e.preventDefault();
        var movePoint = e.touches[0];
        beginStroke({
            x: movePoint.pageX,
            y: movePoint.pageY
        });
    });

    canvas.addEventListener('touchmove', function (e) {
        e.preventDefault();
        var movePoint = e.touches[0];
        moveStroke({
            x: movePoint.pageX,
            y: movePoint.pageY
        });

    });

    canvas.addEventListener('touchend', function (e) {
        e.preventDefault();
        isMouseDown = false;
    });

    drawGrid();

    function drawGrid() {

        context.save();
        context.strokeStyle = "rgb(230,11,9)";

        //绘制 四周边框
        context.beginPath();
        context.moveTo(3, 3);
        context.lineTo(canvasWidth - 3, 3);
        context.lineTo(canvasWidth - 3, canvasHeight - 3);
        context.lineTo(3, canvasHeight - 3);
        context.closePath();
        context.lineWidth = 6;
        context.stroke();

        //绘制两条斜线
        context.beginPath();
        context.moveTo(0, 0);
        context.lineTo(canvasWidth, canvasHeight);

        context.moveTo(canvasWidth, 0);
        context.lineTo(0, canvasHeight);

        //绘制中间的十字
        context.moveTo(canvasWidth / 2, 0);
        context.lineTo(canvasWidth / 2, canvasHeight);

        context.moveTo(0, canvasHeight / 2);
        context.lineTo(canvasWidth, canvasHeight / 2);

        context.lineWidth = 1;
        context.stroke();

        context.restore();
    }
};

