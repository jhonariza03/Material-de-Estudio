var createBoard = function()
{
	rank = ["A","B","C","D","E","F","G","H"];
	file = [1,2,3,4,5,6,7,8];
	var currentTile = {};
  	var count = 0;
	  for(var i = 0; i < rank.length; i++)
	  {
	    for (var j = 0; j < file.length; j++)
	      {
	        if(count%8 == 0)
	        {
	          $("#chessboard").append('<div class="tile" style="clear:left"></div>');

	        }
	        else
	        {
	          $("#chessboard").append('<div class="tile"></div>');
	         }
	        $(".tile").eq(count).attr("data-gridpos",((rank[rank.length - (i +1)]+file[j])));
	        
	        if(((i%2 == 0) && (j%2 != 0)) || ((i%2 != 0) && (j%2 == 0)))
	        {
	          $(".tile").eq(count).addClass("black");
	        }
	        else
	        {
	          $(".tile").eq(count).addClass("white");
	        }
	        count++;
	    }
	  } 
}

var createPlayers = function()
{
	$(".tile").eq(1).append('<div class="playerRed" data-gridpos="'+$(".tile").eq(1).attr('data-gridpos')+'"></div>');
	$(".tile").eq(3).append('<div class="playerRed" data-gridpos="'+$(".tile").eq(3).attr('data-gridpos')+'"></div>');
	$(".tile").eq(5).append('<div class="playerRed" data-gridpos="'+$(".tile").eq(5).attr('data-gridpos')+'"></div>');
	$(".tile").eq(7).append('<div class="playerRed" data-gridpos="'+$(".tile").eq(7).attr('data-gridpos')+'"></div>');
	$(".tile").eq(8).append('<div class="playerRed" data-gridpos="'+$(".tile").eq(8).attr('data-gridpos')+'"></div>');
	$(".tile").eq(10).append('<div class="playerRed" data-gridpos="'+$(".tile").eq(10).attr('data-gridpos')+'"></div>');
	$(".tile").eq(12).append('<div class="playerRed" data-gridpos="'+$(".tile").eq(12).attr('data-gridpos')+'"></div>');
	$(".tile").eq(14).append('<div class="playerRed" data-gridpos="'+$(".tile").eq(14).attr('data-gridpos')+'"></div>');
	$(".tile").eq(17).append('<div class="playerRed" data-gridpos="'+$(".tile").eq(17).attr('data-gridpos')+'"></div>');
	$(".tile").eq(19).append('<div class="playerRed" data-gridpos="'+$(".tile").eq(19).attr('data-gridpos')+'"></div>');
	$(".tile").eq(21).append('<div class="playerRed" data-gridpos="'+$(".tile").eq(21).attr('data-gridpos')+'"></div>');
	$(".tile").eq(23).append('<div class="playerRed" data-gridpos="'+$(".tile").eq(23).attr('data-gridpos')+'"></div>');

	$(".tile").eq(53).append('<div class="playerBlue" data-gridpos="'+$(".tile").eq(53).attr('data-gridpos')+'"></div>');
	$(".tile").eq(55).append('<div class="playerBlue" data-gridpos="'+$(".tile").eq(55).attr('data-gridpos')+'"></div>');
	$(".tile").eq(56).append('<div class="playerBlue" data-gridpos="'+$(".tile").eq(56).attr('data-gridpos')+'"></div>');
	$(".tile").eq(58).append('<div class="playerBlue" data-gridpos="'+$(".tile").eq(58).attr('data-gridpos')+'"></div>');
	$(".tile").eq(60).append('<div class="playerBlue" data-gridpos="'+$(".tile").eq(60).attr('data-gridpos')+'"></div>');
	$(".tile").eq(62).append('<div class="playerBlue" data-gridpos="'+$(".tile").eq(52).attr('data-gridpos')+'"></div>');
	$(".tile").eq(40).append('<div class="playerBlue" data-gridpos="'+$(".tile").eq(40).attr('data-gridpos')+'"></div>');
	$(".tile").eq(42).append('<div class="playerBlue" data-gridpos="'+$(".tile").eq(42).attr('data-gridpos')+'"></div>');
	$(".tile").eq(44).append('<div class="playerBlue" data-gridpos="'+$(".tile").eq(44).attr('data-gridpos')+'"></div>');
	$(".tile").eq(46).append('<div class="playerBlue" data-gridpos="'+$(".tile").eq(46).attr('data-gridpos')+'"></div>');
	$(".tile").eq(49).append('<div class="playerBlue" data-gridpos="'+$(".tile").eq(49).attr('data-gridpos')+'"></div>');
	$(".tile").eq(51).append('<div class="playerBlue" data-gridpos="'+$(".tile").eq(51).attr('data-gridpos')+'"></div>');

}

$(document).ready(function($) {
	createBoard();
	$('.tile').droppable({
            drop: function(event, ui){
            	debugger;
            	ui.draggable.attr('data-gridpos',this.attributes[1].nodeValue);
        	alert('Has soltado la ficha en la posición '+this.attributes[1].nodeValue);
        }
    });
	createPlayers();
	$('.playerRed').effect("pulsate", 1000);
	$('.playerBlue').effect("pulsate", 1000);
	$('.playerRed').draggable();
	$('.playerBlue').draggable();
});

