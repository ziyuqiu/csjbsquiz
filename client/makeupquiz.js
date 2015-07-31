var running =false;//set the default state of drawing as stopped
//modified from firefly
var array=[];
Template.makeupquiz.rendered = function(){
	//draw a green triangle when the page is rendered
	triangle();

	//when mouse is clicked, start drawing
	board.addEventListener('click',
		function(e){
			//if there is no previous point, start drawing
			if(array.length==0){
				//add the point into the array
				add(e);
				running=true;
			}
			//if there is a previous point
			else{
				//if it is drawing
				if(running){
					//add the point into the stored array
					add(e);
					//check distance
					var dis = distance(xnow,ynow,array[0].x,array[0].y);
					//if the point is close enough to the start point
					if(dis<=10){
						//stop drawing
						running=false;
					}
					//draw the actual lines	
					drawIt();		
				}
			}
		}
	);
	//when the mouse moves
	board.addEventListener('mousemove', 
		function(e){
			//if it is not drawing, do not do anything
		   	if (!running) {
		   		return;
		   	} else{
		   		//clean the previous lines
		   		clean();
		   		//draw the polygon on the board
		   		drawIt();
		    	context = board.getContext("2d");
		    	//get current location
		    	current(e);
		    	//move the start point to the last point stored into array
		    	context.moveTo(array[array.length-1].x,array[array.length-1].y);
		    	//draw a yellow line between the last stored point and the mouse
		    	context.lineTo(xnow,ynow);
		    	context.strokeStyle='#FFCA00';
		    	context.stroke();
		    	context.closePath();
		    	//draw the stored lines
		    	drawIt();
		    }
		}
	)
}
Template.makeupquiz.events({
	'click #erase': function(e){
		//clean the board
		clean();
		//reset the array of stored points
		array=[];
	},
	'click #draw': function(e){
		context = board.getContext("2d");
		context.beginPath();
		context.strokeStyle = '#007724';
		context.stroke();
	}	
})

//point constructor
function Point(x,y) {
	this.x = x;
	this.y = y;
}

function triangle(){
	var drawContext = board.getContext("2d");//get CanvasRenderingContext2D
	drawContext.strokeStyle="#007724";//or green
	drawContext.moveTo(95,135);//move to the start point
	drawContext.lineTo(250,200);//draw a line from the start point to the 1st point
	drawContext.lineTo(170,375);//darw a line from the 1st point to the 2nd point
	drawContext.lineTo(95,135);//draw a line from the 2nd point back to the start point to close it
	drawContext.stroke();//draw it
}

function clean(){
	//fill the board to reset
	context = board.getContext("2d");
	context.beginPath();
	context.fillStyle = '#96989B';
	context.fillRect(0,0,board.width,board.height);
}

function distance(a,b,c,d) {
	//check the distance between two points (a,b) and (c,d)
	return Math.sqrt((a-c)*(a-c)+(b-d)*(b-d));
}

function current(e){
	var context = board.getContext("2d");
	xnow=e.pageX-board.offsetLeft;//get the x coordinate of the pen
	ynow=e.pageY-board.offsetTop;//get the y coordinate of the pen
	point=new Point(xnow,ynow);
	$("#pos").html("position = ("+xnow+","+ynow+")");//change the number of the coordinate
	return point;
}
function add(e){
	//add the point to the stored array
	array.push(current(e));
}

function drawIt(){
	//draw lines between stored points
	context= board.getContext("2d");
	context.beginPath();
	for(var i=0;i<array.length-1;i++){	
		context.moveTo(array[i].x,array[i].y);//move to the start point
		context.lineTo(array[i+1].x,array[i+1].y);//draw a line from the start point to the 1st point
		context.strokeStyle="#007724";//or green
		context.stroke();//draw it
	}
	context.closePath();
}

//set the width of line
Template.lineM.events({
	'click #line1': function(e){
		context = board.getContext("2d");
		context.lineWidth = 1;
	},
	'click #line2': function(e){
		context = board.getContext("2d");
		context.lineWidth = 3;
	},
	'click #line3': function(e){
		context = board.getContext("2d");
		context.lineWidth = 8;
	},
})
