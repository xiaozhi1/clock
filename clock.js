var dom = document.getElementById('clock');
var ctx = dom.getContext('2d');
var width = ctx.canvas.width;
var height = ctx.canvas.height;
var r = width / 2;
var rem = width / 200;

// 200/width = 10/x

function drawBackground() {
	ctx.save();
	ctx.translate(r,r);  //重新定义点
	ctx.beginPath();
	ctx.lineWidth = 10 * rem;
	ctx.arc(0,0,r - ctx.lineWidth / 2,0,2*Math.PI,false);
	ctx.stroke();       //填充

	var hourNumber = [3,4,5,6,7,8,9,10,11,12,1,2];
	ctx.font = 18 * rem + 'px Arial';
	ctx.textAlign = 'center';
	ctx.textBaseline = 'middle';
	hourNumber.forEach(function(number,i){
		var rad = 2*Math.PI / 12 * i;
		var x = Math.cos(rad) * (r - 30 * rem);
		var y = Math.sin(rad) * (r - 30 * rem);
		ctx.fillText(number,x,y);   //在XY坐标点填上文本
	});

	for (var i = 0; i < 60; i++) {
		var rad = 2*Math.PI / 60 * i;
		var x = Math.cos(rad) * (r - 18 * rem);    //在小时和外圆间，可以大点
		var y = Math.sin(rad) * (r - 18 * rem);
		ctx.beginPath();
		if (i % 5 ===0){
			ctx.fillStyle = '#000';
			ctx.arc(x, y, 2 * rem,0 ,2*Math.PI);
		} else {
			ctx.fillStyle = '#ccc';
			ctx.arc(x, y, 2 * rem, 0, 2*Math.PI);
		}
		ctx.arc(x, y, 2, 0, 2*Math.PI);
		ctx.fill();                   //填充实心圆点
	}
}

function drawHour(hour, minute)	{       //时针
	ctx.save();
	ctx.beginPath();
	var rad = 2 * Math.PI / 12 * hour;
	var mrad = 2 * Math.PI / 12 / 60 * minute;
	ctx.rotate(rad + mrad);      //旋转指针
	ctx.lineWidth = 6 * rem;
	ctx.lineCap = 'round';
	ctx.moveTo(0, 10 * rem);
	ctx.lineTo(0, -r / 2 );
	ctx.stroke();
	ctx.restore();   //还原
}

function drawMinute(minute)	{         //分针
	ctx.save();
	ctx.beginPath();
	var rad = 2*Math.PI / 60 * minute;
	ctx.rotate(rad);
	ctx.lineWidth = 3 * rem;
	ctx.lineCap = 'round';
	ctx.moveTo(0, 10 * rem);
	ctx.lineTo(0, -r  + 30 * rem);
	ctx.stroke();
	ctx.restore();
}


function drawSecond(second){          //秒针
	ctx.save();
	ctx.beginPath();
	ctx.fillStyle = '#c14543';
	var rad = 2*Math.PI / 60 * second;
	ctx.rotate(rad);
	ctx.moveTo(-2 * rem, 20 * rem);
	ctx.lineTo(2 * rem,20 * rem);
	ctx.lineTo(1, -r + 18 * rem);
	ctx.lineTo(-1, -r + 18 * rem);
	ctx.fill();
	ctx.restore();
}

function drawDot(){                  //圆点
	ctx.beginPath();
	ctx.fillStyle = '#fff';
	ctx.arc(0, 0, 3 * rem, 0, 2*Math.PI, false);
	ctx.fill();
}



function draw(){                   //动态获取时间
	ctx.clearRect(0, 0, width, height);   
	var now = new Date();
	var hour = now.getHours();
	var minute = now.getMinutes();
	var second = now.getSeconds();
	drawBackground();
	drawHour(hour, minute);
    drawMinute(minute);
    drawSecond(second);
    drawDot();
    ctx.restore();
}

draw();
setInterval(draw, 1000);
