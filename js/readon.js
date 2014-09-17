ReadOn = function(){
	_this = this;
	
	var $slides;
	var slidesCurrentX = 0;
	var slidesMargin = 10;
	
	var init = function(){
		console.log('Readon Init!');

		$slides = $j('#readon .slide');
		
		$slides.each(function(){
			$j(this).css('left', slidesCurrentX);
			slidesCurrentX += $j(this).outerWidth() + slidesMargin;
		});
	}

	_this.helloWorld = function(){
		console.log('Hello Readon!');
	}
	
	
	init();
}
