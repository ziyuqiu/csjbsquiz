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
	
	board.addEventListener('mousemove', 
		function(e){
		   	if (!running) {
		   		return;
		   	} else{
		   		clean();
		   		drawIt();
		    	context = board.getContext("2d");
		    	current(e);
		    	context.moveTo(array[array.length-1].x,array[array.length-1].y);
		    	console.log(array[array.length-1].x);
		    	console.log(array[array.length-1].y);
		    	context.lineTo(xnow,ynow);
		    	context.strokeStyle='#FFCA00';
		    	context.stroke();
		    	context.closePath();
		    	drawIt();
		    }
		}
	)
}
Template.makeupquiz.events({
	'click #erase': function(e){
		clean();
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
	context = board.getContext("2d");
	context.beginPath();
	context.fillStyle = '#96989B';
	context.fillRect(0,0,board.width,board.height);
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
	$("#pos").html("position = ("+xnow+","+ynow+")");
	return point;
}
function add(e){
	array.push(current(e));
}

function drawIt(){
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
