ReadOn = function(){
	_this = this;
	
	var $nextBtn, $lastBtn;
	
	var $slides;
	var slidesCurrentX = 0;
	var slidesMargin = 5;
	
	var currentIndex = 0;
	var slideWidth;
	
	var init = function(){
		console.log('Readon Init!');

		$nextBtn = $j('#readon #nextBtn');
		$nextBtn.click(nextSlide);
		
		$lastBtn = $j('#readon #lastBtn');
		$lastBtn.click(lastSlide);
		
		$slides = $j('#readon .slide');
		
		$slides.each(function(){
			$j(this).css('left', slidesCurrentX);
			slidesCurrentX += $j(this).outerWidth() + slidesMargin;
		});
		
		
	}
	
	var nextSlide = function(){
		if(currentIndex != $slides.length-1) {
			slideWidth = $slides.eq(currentIndex).outerWidth();

			$slides.each(function(){
				var left = $j(this).position().left;
				console.log(left);
				$j(this).css('left', left-(slideWidth+slidesMargin));
			});
		
			currentIndex++;
		}
	}
	var lastSlide = function(){
		if(currentIndex != 0) {
			currentIndex--;

			slideWidth = $slides.eq(currentIndex).outerWidth();

			$slides.each(function(){
				var left = $j(this).position().left;
				console.log(left);
				$j(this).css('left', left+(slideWidth+slidesMargin));
			});
		
		}
	}

	_this.helloWorld = function(){
		console.log('Hello Readon!');
	}
	
	
	init();
}
