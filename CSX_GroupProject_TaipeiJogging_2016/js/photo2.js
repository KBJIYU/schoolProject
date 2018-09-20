$(document).ready(function(event) {
	
	$("div#swipe_like").on( "click", function() {
		swipeLike();
	});	

	$("div#swipe_dislike").on( "click", function() {
		swipeDislike();
	});	

	addNewProfile();

	function swipe() {
		Draggable.create("#photo", {
		   	throwProps:true,
		   	onDragEnd:function(endX) {
	   			if(Math.round(this.endX) > 0 ) {
	   				swipeLike();			
	   			}
	   			else {
	   				swipeDislike();
	   			}
	   			console.log(Math.round(this.endX));
			}
		});
	}

	function swipeLike() {
		
			var $photo = $("div.content").find('#photo');

			var swipe = new TimelineMax({repeat:0, yoyo:false, repeatDelay:0, onComplete:remove, onCompleteParams:[$photo]});
			swipe.staggerTo($photo, 0.8, {bezier:[{left:"+=400", top:"+=300", rotation:"60"}], ease:Power1.easeInOut});

			addNewProfile();
	}

	function swipeDislike() {
		
			var $photo = $("div.content").find('#photo');

			var swipe = new TimelineMax({repeat:0, yoyo:false, repeatDelay:0, onComplete:remove, onCompleteParams:[$photo]});
			swipe.staggerTo($photo, 0.8, {bezier:[{left:"+=-350", top:"+=300", rotation:"-60"}], ease:Power1.easeInOut});

			addNewProfile();
	}

	function remove(photo) {
	    $(photo).remove();
	}

    
	function addNewProfile() {
		var names = ['Amanda', 'Jiyu', 'Ryan', 'Crea', 'Hannah', 'Sunny', 'Shasta'][Math.floor(Math.random() * 7)];
		/*var ages = ['爬蟲','網頁主視覺','18','27','21', '18', '24']
 [Math.floor(Math.random() * 7)]
    */
  
		var photos = ['1', '2', '3', '4', '5', '6', '7'][Math.floor(Math.random() * 7)]
    if(photos==1){
      names='Amanda';
    }
    if(photos==2){
      names='Jiyu';
    }
     if(photos==3){
      names='Ryan';
    }
    if(photos==4){
      names='Crea';
    }
    if(photos==5){
      names='Hannah';
    }
    if(photos==6){
      names='Sunny';
    }
     if(photos==7){
      names='Shasta';
    }
		$("div.content").prepend('<div class="photo" id="photo" style="background-image:url(https://hannahchiu.github.io/D3/img/'+photos+'.jpg)">'
    	+ '<span class="meta">' 
    	+ '<p id="k">'+names+'</p>' 
    	+ '<span class="moments">0</span>' 
    	+ '<span class="users">0</span>' 
    	+ '</span>' 
    	+ '</div>');

    	swipe();
	}
  
});