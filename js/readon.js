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
		
		$slides.each(function(index){
			$j(this).data('index', index);
		
			// add close button
			var $closeBtn = $j('<div class="closeBtn">X</div>');
			$closeBtn.click(destroySlide);
			$j(this).append($closeBtn);
		
			// position the element
			$j(this).css('left', slidesCurrentX);
			slidesCurrentX += $j(this).outerWidth() + slidesMargin;
		});
	}
	
	var destroySlide = function(){
		var $slide = $j(this).parent(); // close button's parent element
		
		slideWidth = $slide.outerWidth();  // store slide's width
		var slideIndex = $slide.data('index'); // store slide's index
		
		$slide.remove(); // actually remove the slide
		
		for(var index=slideIndex+1; index<$slides.length; index++){ // move all slides here after
			var $nextSlide = $slides.eq(index);
			var left = $nextSlide.position().left;
			var pos = left-(slideWidth+slidesMargin);
			$nextSlide.css('left', pos);
			
			// set the currentIndex to whoever's at 0px
			if(pos == 0) currentIndex = $nextSlide.data('index');
		}
	}
	
	var nextSlide = function(){
		if(currentIndex != $slides.length-1) {
			slideWidth = $slides.eq(currentIndex).outerWidth();

			$slides.each(function(){
				var left = $j(this).position().left;
				var pos = left-(slideWidth+slidesMargin);
				$j(this).css('left', pos);
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
				var pos = left+(slideWidth+slidesMargin);
				$j(this).css('left', pos);
			});
		
		}
	}

	_this.helloWorld = function(){
		console.log('Hello Readon!');
	}
	
	
	init();
}
