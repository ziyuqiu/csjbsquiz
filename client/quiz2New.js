var running =false;//set the default state of drawing as stopped
//modified from firefly
Template.quiz2New.rendered = function(){
	//when mouse is clicked, start drawing
	board.addEventListener('mousedown', 
		function(e){ 
			running = true;//start drawing
			// var board=document.getElementById("board");
	   		//This step is not needed becaus meteor automatically does this for us
			context = board.getContext("2d");//get CanvasRenderingContext2D
			xnow=e.pageX-board.offsetLeft;//get the x coordinate of the pen
	   		ynow=e.pageY-board.offsetTop;//get the y coordinate of the pen
			context.moveTo(xnow,ynow);//move the pen to the new position
		}
	);
	//when mouse is released, stop drawing
	board.addEventListener('mouseup', 
		function(e){ 
			running = false;//stop drawing
		}
	)
	//
	board.addEventListener('mousemove', 
		function(e){
		   	if (running) {//if the mouse is clicked (in the drawing mode)
		   		//var board=document.getElementById("board");
		   		//This step is not needed becaus meteor automatically does this for us
		   		context = board.getContext("2d");//get CanvasRenderingContext2D
		   		xnow=e.pageX-board.offsetLeft;//get the x coordinate of the pen
		   		ynow=e.pageY-board.offsetTop;//get the y coordinate of the pen
		   		console.log(xnow,ynow);
		   		$("#pos").html("position = ("+xnow+","+ynow+")");// update the coordinates of pen  		
		   		context.lineTo(xnow,ynow);//draw a line to the specific ending point
		   		context.stroke();//the "ink" method, take the path the "lineTo" calls and actually draws it on canvas	   		
		 	}
		}
	)
}
//set the width of line
Template.line.events({
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
Template.bgColor.events({
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
	}
})
//set color of pen
Template.penColor.events({
	'click #red': function(e){
		context = board.getContext("2d");
		context.beginPath();
		context.strokeStyle = '#FF0000';//set color of pen
		context.stroke();//draw
	},
	'click #yel': function(e){
		context = board.getContext("2d");
		context.beginPath();
		context.strokeStyle = '#FFCA00';
		context.stroke();
	},
	'click #blu': function(e){
		context = board.getContext("2d");
		context.beginPath();
		context.strokeStyle = '#024FFF';
		context.stroke();
	},
	'click #blk': function(e){
		context = board.getContext("2d");
		context.beginPath();
		context.strokeStyle = '#000000';
		context.stroke();
	}
})



