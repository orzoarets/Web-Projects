var speedX,
interval,
initTop = 10,
initLeft = 10,
speedX,
speedY,
bing,
intervalSpeed = 10,
Strikes = 0,
maxScore = 0,
pongBall = null,
controlPaddle = null;

function movePaddle(event)
		{
			controlPaddle = document.getElementById("paddle");
			
			//console.log(event.pageY-200);
			if(((event.pageY-200) >=-2) && ((event.pageY-200) <= 400))
			{
				controlPaddle.style.top = event.pageY- 200+"px";
						
			}
			
			if(event.pageY-200 <-2)
			{
			controlPaddle.style.top = -2+"px";
			}
			if(event.pageY-200>400)
			{
			controlPaddle.style.top = 400+"px";
			}
		}
function initialize()
{
		pongBall = document.getElementById("ball");
		controlPaddle = document.getElementById("paddle");
		pongBall.style.top = "10px";
		pongBall.style.left = "10px";
		speedX = 2;
		speedY = 2;
}
function update()
{
	pongBall.style.top = initTop +"px";
	pongBall.style.left = initLeft +"px";
	initTop=initTop+speedX;
	initLeft=initLeft+speedY;
	if((initTop+20 < parseInt(controlPaddle.style.top,10) && initLeft== 788) || ((initTop > parseInt(controlPaddle.style.top,10) + 102)&& initLeft>=788))
	{
		score();
	}
	if((initTop <= (parseInt(controlPaddle.style.top,10))+18) && (initTop + 20 >= (parseInt(controlPaddle.style.top,10)-102))&& (initLeft+20 === (parseInt(controlPaddle.style.left,10)+20 )))
		{
		bing = new Audio("http://lambda.uta.edu/cse4392/reflect.wav");
		bing.play();
		console.log("STRIKE");
		Strikes = (parseInt(document.getElementById("strikes").innerHTML,10)+1);
		document.getElementById("strikes").innerHTML = Strikes+"";
		bounceDownLeft();
	}
	if(initTop >= 400 && initLeft <= 788)
	{
		bounceUpRight();		
	}
	if(initTop >= -84 && initLeft >=795 )
	{
		score();
		clearInterval(interval);	
	}
	if(initTop <= -84 && initLeft >= 0)
		{
			bounceUpLeft();		
		}
	if(initTop <=400 && initLeft <= 0)
	{
		bounceDownRight();		
	}
}
function moveSpeed(givenSpeed)
{
	clearInterval(interval);
	intervalSpeed = 10 - 3 * givenSpeed;
	startGame();
	console.log("new interval: "+intervalSpeed);
}
function score()
{
	console.log("Ball top:" +initTop +"Ball bot: "+(initTop+20) +"Paddle top: "+ parseInt(controlPaddle.style.top,10) + "Paddle bot"+ (parseInt(controlPaddle.style.top,10)-100));
	console.log("SCORE!!");
	console.log(maxScore);
	console.log(Strikes);
	if(Strikes > maxScore)
	{	document.getElementById("score").innerHTML = Strikes+"";
	}
	resetGame();	
}
function bounceDownRight()
{
	speedX = speedX * 1;
	speedY = speedY * -1;
}
function bounceUpLeft()
{
	speedX = speedX * -1;
	speedY = speedY * 1;	
}
function bounceDownLeft()
{
	speedX = speedX * 1;
	speedY = speedY * -1;	
}
function bounceUpRight()
{
	speedX = speedX * -1;
	initLeft+= speedY;
}
function startGame()
{
	var changeDegree = (4/Math.tan(45));
	speedX = (Math.random() * (changeDegree - (-1*changeDegree))+(-1*changeDegree));
	interval = setInterval(function(){update()},intervalSpeed);
	console.log(pongBall.style.top);
}
function resetGame()
{
	document.getElementById("strikes").innerHTML = 0+"";
	pongBall.style.top = "10px";
	pongBall.style.left = "10px";
	initTop = 10;
	initLeft = 10;
	clearInterval(interval);	
}