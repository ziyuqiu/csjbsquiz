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
				running=true;
				add(e);
			}
			//if there is a previous point
			else{
				if(running){
					add(e);				
					drawIt();
					var dis = distance(xnow,ynow,array[array.length-1].x,array[array.length-1].y);
					//if the point is close enough to the start point
					if(dis<=5){
						//stop drawing
						running=false;
					}
				}
			}

		}
	);
	//
	// board.addEventListener('mousemove', 
	// 	function(e){
	// 	   	if (running) {//if the mouse is clicked (in the drawing mode)
	// 	   		//connect start point and current point with a yellow line
	// 	   		context = board.getContext("2d");//get CanvasRenderingContext2D
	// 	   		xnow=e.pageX-board.offsetLeft;//get the x coordinate of the pen
	// 	   		ynow=e.pageY-board.offsetTop;//get the y coordinate of the pen
	// 	   		console.log(xnow,ynow);
	// 	   		$("#pos").html("position = ("+xnow+","+ynow+")");// update the coordinates of pen  		
	// 	   		context.lineTo(xnow,ynow);//draw a line to the specific ending point
	// 	   		context.strokeStyle
	// 	   		context.stroke();//the "ink" method, take the path the "lineTo" calls and actually draws it on canvas	   		
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

function clean(){

}

function distance(a,b,c,d) { 
	return Math.sqrt((a-c)*(a-c)+(b-d)*(b-d));
}

function add(e){
	var context = board.getContext("2d");
	xnow=e.pageX-board.offsetLeft;//get the x coordinate of the pen
	ynow=e.pageY-board.offsetTop;//get the y coordinate of the pen
	point=new Point(xnow,ynow);
	array.push(point);
	//if there is no previous point :start a point
	console.log(xnow,ynow);
	console.log(array);
	$("#pos").html("position = ("+xnow+","+ynow+")");
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
