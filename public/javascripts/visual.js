document.addEventListener("DOMContentLoaded", function(e) {
	bindEvents();
});

function fullScreen(elem){
	if (elem.requestFullscreen) {
	  elem.requestFullscreen();
	} else if (elem.mozRequestFullScreen) {
	  elem.mozRequestFullScreen();
	} else if (elem.webkitRequestFullscreen) {
	  elem.webkitRequestFullscreen();
	}
}

function bindExitFullScreen(elem,fn){
	if (elem.requestFullscreen) {
		elem.addEventListener('fullscreenchange',function(){
			var state = document.fullScreen;
		    var isOpen = state ? 'FullscreenOn' : 'FullscreenOff';
			fn && fn.apply(this,[e,isOpen]);
		});
	}  else if (elem.mozRequestFullScreen) {
		elem.addEventListener('mozfullscreenchange',function(){
			var state = document.mozFullScreen;
		    var isOpen = state ? 'FullscreenOn' : 'FullscreenOff';
			fn && fn.apply(this);
		});
	} else if (elem.webkitRequestFullscreen) {
	  	elem.addEventListener('webkitfullscreenchange',function(e){
			var state = document.webkitIsFullScreen;
		    var isOpen = state ? 'FullscreenOn' : 'FullscreenOff';
			fn && fn.apply(this,[e,isOpen]);
		});
	}
}


function bindEvents(){
	var $imgCon = document.querySelector('.imgCon');
	var $imgPreview = document.querySelector('.imgPreview');

	$imgCon.addEventListener('click',function(e){
		var $target = e.target;

		if($target.nodeName === 'IMG'){
			var src = $target.src;
			if(!src){return;}
			$imgPreview.classList.add('show');
			$imgPreview.querySelector('img').setAttribute('src',src);
			fullScreen($imgPreview);
		}

	});

	bindExitFullScreen($imgPreview,function(e,isOpen){
		if(isOpen === 'FullscreenOff'){
			this.classList.remove('show');
		}
	});
}