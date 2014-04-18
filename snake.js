var width = 160;
var height = 30;

var leftKey = 37;
var rightKey = 39;
var upKey = 38;
var downKey = 40;

var dirUp = 1;
var dirDown = 2;
var dirLeft = 3;
var dirRight = 4;

var score = 0;
var snakeSpeedStart = 200;
var snakeSpeed;
var snakeDirection = 0;
var snakeSizeStart = 3;
var snakeParts;

var appleCol;
var appleRow;

var timerHandle;

function snakePart(col, row)
{
	this.col = col;
	this.row = row;	
}

function init()
{
	document.addEventListener('keydown', gotKey);
	setup();
}

function setup()
{
	score = 0;
	makeGrid();
	//updateScore();
	makeApple();
	makeSnake();
	timerHandle = window.setInterval(moveSnake,snakeSpeed);
}

function moveSnake()
{
	var snakeHead = snakeParts[0];
	var newSnakeCol = snakeHead.col;
	var newSnakeRow = snakeHead.row; 

	switch(snakeDirection)
	{
		case dirUp:
			newSnakeRow--;
			break;
		case dirDown:
			newSnakeRow++;
			break;
		case dirLeft:
			newSnakeCol--;
			break;
		case dirRight:
			newSnakeCol++;
			break;

		default:
			return;
	}

	if ( (newSnakeRow < 0) || (newSnakeCol < 0) || (newSnakeRow >= height) || (newSnakeCol >= width))
	{
		clearTimeout(timerHandle);
		alert("You died!");
		setup();
		return;
	}

	var newSnakePart = new snakePart(newSnakeCol, newSnakeRow);
	snakeParts.unshift(newSnakePart);
	cellColor(newSnakeCol,newSnakeRow, "green");
	
	if ((newSnakeCol == appleCol) && (newSnakeRow == appleRow))
	{
		score += 100;
		updateScore();
		makeApple();
		//snakeParts.unshift(newSnakePart);
		if (snakeSpeed > 50)
		{
			snakeSpeed = snakeSpeed - 10;
			clearTimeout(timerHandle);
			timerHandle = window.setInterval(moveSnake,snakeSpeed);
		}
	}
	else
	{
		var snakeTail = snakeParts.pop();
		cellColor(snakeTail.col,snakeTail.row, "white"); 
	}
}

function updateScore()
{
	var scoreElem = document.getElementById('scoreid');
	scoreElem.innerHTML = "Score: " + score;
}

function gotKey(event)
{
	var goodKey = false;

    	if(event.keyCode == leftKey) {
		if (snakeDirection != dirRight)
			snakeDirection = dirLeft;
    	}
    	if(event.keyCode == rightKey) {
		if (snakeDirection != dirLeft)
			snakeDirection = dirRight;
	}
    	if(event.keyCode == upKey) {
		if (snakeDirection != dirDown)
			snakeDirection = dirUp;	
	}
    	if(event.keyCode == downKey) {
		if (snakeDirection != dirUp)
			snakeDirection = dirDown;
	}
}

function makeApple()
{
	appleCol = Math.floor((Math.random()*width)+0);
	appleRow = Math.floor((Math.random()*height)+0);
	cellColor(appleCol,appleRow, "red");
}

function makeSnake()
{
	do
	{
		snakeCol = Math.floor((Math.random()*width)+0);
		snakeRow = Math.floor((Math.random()*height)+0);
		snakeDirection = 0;
	} while((snakeCol == appleCol) && (snakeRow == appleRow));

	snakeSpeed = snakeSpeedStart;

	snakeParts = [];
	for(i=0; i < snakeSizeStart; i++)
	{ 
		snakeParts.push(new snakePart(snakeCol, snakeRow));
	}

	cellColor(snakeCol,snakeRow, "green");
}

function makeGrid()
{
	var gridChar = "&nbsp;&nbsp;";
	
	var tbl ="<table>";
	tbl += "<tr><th id='scoreid' colspan='" + width + "'>Score: 0</th></tr>";
	for(h=0; h < height; h++)
	{
		tbl += "<tr>";
		for(w=0; w < width; w++)
		{
			tbl += "<td id='" + gridTDId(w, h) + "'>" + gridChar + "</td>";
		}
		tbl += "</tr>";
	}
	tbl = tbl + "</table>";

	var gridDivElem = document.getElementById('gridDiv');
	gridDivElem.innerHTML = tbl;
}

function gridTDId(col, row)
{
	var tdID = "gridTD" + "C" + col + "R" + row;
	return tdID; 
}

function cellColor(col, row, color)
{
	var tdID = gridTDId(col, row);
	var gridTDElem = document.getElementById(tdID);
	if (gridTDElem) 
		gridTDElem.style.backgroundColor = color;
}

init();