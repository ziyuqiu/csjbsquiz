var running =false;//set the default state of drawing as stopped
//modified from firefly
var array=[];
Template.makeupquiz.rendered = function(){
	//draw a green triangle when the page is rendered
	triangle();

	//when mouse is clicked, start drawing
	board.addEventListener('click',
		function(e){
			if(array.length==0){
				add(e);
				running=true;
			}
			//if there is a previous point
			else{

				if(running){
					add(e);
					var dis = distance(xnow,ynow,array[0].x,array[0].y);
					console.log(dis);
					//if the point is close enough to the start point
					if(dis<=10){
						//stop drawing
						running=false;
					}
							
					drawIt();
					
					
				}
			}

		}
	);
	
	// board.addEventListener('mousemove', 
	// 	function(e){
	// 	   	if (!running) {
	// 	   		return;
	// 	   	} else{  		//if the mouse is clicked (in the drawing mode)
	// 	   		//connect start point and current point with a yellow line
	// 	   		context = board.getContext("2d");//get CanvasRenderingContext2D
	// 	   		current(e);
	// 	   		context.lineTo(xnow,ynow);//draw a line to the specific ending point
	// 	   		context.strokeStyle = 'FFCA00';
	// 	   		context.stroke();//the "ink" method, take the path the "lineTo" calls and actually draws it on canvas	   		
		 		
	// 	 		context.beginPath();
	// 			context.moveTo(startX,startY);
	// 			newX = e.pageX - canvas.offsetLeft;
	// 			newY = e.pageY - canvas.offsetTop;
	// 	    	drawContext.lineTo(newX,newY);
	// 	    	console.log(newX,newY);
	// 	    	drawContext.strokeStyle="yellow";
	// 	    	drawContext.stroke();
	// 	    	drawContext.closePath();
	// 	 	}
	// 	}
	// )
}
Template.makeupquiz.events({
	'click #erase': function(e){
		context = board.getContext("2d");
		context.beginPath();
		context.fillStyle = '#96989B';
		context.fillRect(0,0,board.width,board.height);
		array=[];
	},
	'click #draw': function(e){
		context = board.getContext("2d");
		context.beginPath();
		context.strokeStyle = '#007724';
		context.stroke();
	}	
})

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

function distance(a,b,c,d) { 
	var distance= Math.sqrt((a-c)*(a-c)+(b-d)*(b-d));
	return distance;
}
function current(e){
	var context = board.getContext("2d");
	xnow=e.pageX-board.offsetLeft;//get the x coordinate of the pen
	ynow=e.pageY-board.offsetTop;//get the y coordinate of the pen
	point=new Point(xnow,ynow);
	console.log(xnow,ynow);
	console.log(array);
	$("#pos").html("position = ("+xnow+","+ynow+")");
	return point;
}
function add(e){
	array.push(current(e));
}

function drawIt(){
	context= board.getContext("2d");
	context.beginPath();
	for(var i=0;i<array.length;i++){	
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
//set the background of line
Template.bgColorM.events({
	'click #red': function(e){
		context = board.getContext("2d");
		context.beginPath();
		context.fillStyle = '#FF0000';//set color of background
		context.fillRect(0,0,board.width,board.height);//fill color
	},
	'click #yel': function(e){
		context = board.getContext("2d");
		context.beginPath();
		context.fillStyle = '#FFCA00';
		context.fillRect(0,0,board.width,board.height);
	},
	'click #blu': function(e){
		context = board.getContext("2d");
		context.beginPath();
		context.fillStyle = '#024FFF';
		context.fillRect(0,0,board.width,board.height);
	},
	'click #blk': function(e){
		context = board.getContext("2d");
		context.beginPath();
		context.fillStyle = '#000000';
		context.fillRect(0,0,board.width,board.height);
	},
	'click #gry': function(e){
		context = board.getContext("2d");
		context.beginPath();
		context.fillStyle = '#96989B';
		context.fillRect(0,0,board.width,board.height);
	}

})
