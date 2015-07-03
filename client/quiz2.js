var drawing = false;

Template.quiz2.events({
	'click #bold': function(e){
		context = gameBoard.getContext("2d");
		context.beginPath();
		context.lineWidth = 10;
		context.fillStyle = 'yellow';
		context.fillRect(0,0,gameBoard.width,gameBoard.height);
	}
})

Template.quiz2.rendered = function(){
	gameBoard.addEventListener('mousemove', 
	  function(e){
		  if (drawing){
		  currentx = e.pageX - gameBoard.offsetLeft;
		  currenty = e.pageY - gameBoard.offsetTop;
		  context = gameBoard.getContext("2d");
		  context.lineTo(currentx,currenty);
		  context.stroke();
		  $("#pos").html("position = ("+currentx+","+currenty+")");
	  	} 
	  } 
	); 

	gameBoard.addEventListener('mousedown', function(e){ drawing = true;
		context = gameBoard.getContext("2d");
		
		context.moveTo(e.pageX - gameBoard.offsetLeft,e.pageY - gameBoard.offsetTop);
	})
	gameBoard.addEventListener('mouseup', function(e){ drawing = false;})
	$("#gameBoard").css('background','yellow');

}

