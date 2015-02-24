ReadOn = function(){
	_this = this;

	var $readon;
	
	var $nextBtn, $lastBtn;
	
	var $slides;
	var slidesCurrentX = 0;
	var slidesMargin = 5;
	
	var currentIndex = 0;
	var slideWidth;

	var $readonLinks;
	
	var init = function(){
		console.log('Readon Init!');

		$readon = $j('#readon');
		$readon.on('swipeleft', nextSlide).on('swiperight', lastSlide);

		$nextBtn = $j('#readon #nextBtn');
		$nextBtn.click(nextSlide);
		
		$lastBtn = $j('#readon #lastBtn');
		$lastBtn.click(lastSlide);

		initSlides();
		$j(window).resize(initSlides);

	}

	var initSlides = function () {

		$slides = $j('#readon .slide');
		
		$slides.each(function(index){
			var $slide = $j(this);
			$slide.data('index', index);
		
			if( !$slide.data('exists') ) { // only for new slides
				// position the element
				$slide.css('left', slidesCurrentX);


				if(index!=0){
					// add close button
					var $closeBtn = $j('<div class="closeBtn">X</div>');
					$closeBtn.click(destroySlide);
					$slide.append($closeBtn);
				}

				$slide.click(gotoSlide);
				$slide.data('exists', true);

				if( slidesCurrentX >= $j('body').outerWidth() ) nextSlide(); //$slide.click();
				slidesCurrentX += $slide.outerWidth() + slidesMargin;


			}

		});

		parseReadonLinks();

	}

	var parseReadonLinks = function(){
		$readonLinks = $j('a.readon');

		$readonLinks.each(function(){
			$j(this).unbind('click');
			$j(this).click(openReadonLink);
		});
	}

	var openReadonLink = function(event){
		event.preventDefault();
		event.stopPropagation();

		console.log('openReadonLink');

		var $slide = $j(this).closest('.slide'); // parent .slide element
		var slideIndex = $slide.data('index'); // store slide's index

		slidesCurrentX = $slide.offset().left + $slide.outerWidth() + slidesMargin;

		for(var index=slideIndex+1; index<$slides.length; index++){ // destroy all slides here after
			var $nextSlide = $slides.eq(index);
			$nextSlide.remove();
		}

		var divSize;
		if($j(this).hasClass('small') ) divSize = 'small';
		else if($j(this).hasClass('medium') ) divSize = 'medium';
		else if($j(this).hasClass('large') ) divSize = 'large';

		var $articleDiv = $j('<div class="slide '+divSize+'"></div>');

		$textURL = $j(this).attr('href');		
		$articleDiv.load($textURL, addSlide);

	}

	var addSlide = function(e){
		$readon.append($j(this));
		initSlides();
	}


	var destroySlide = function(){
		var $slide = $j(this).parent(); // close button's parent element
		
		slideWidth = $slide.outerWidth();  // store slide's width
		var slideIndex = $slide.data('index'); // store slide's index

		$slide.remove(); // actually remove the slide
		
		// move all slides here after
		for(var index=slideIndex+1; index<$slides.length; index++){ 
			var $nextSlide = $slides.eq(index);
			var left = $nextSlide.position().left;
			var pos = left-(slideWidth+slidesMargin);
			$nextSlide.css('left', pos);
			
			// set the currentIndex to whoever's at 0px
			if(pos = 0) currentIndex = $nextSlide.data('index');
		}

		if(slideIndex == $slides.length-1) { // if this is the last slide
			currentIndex = slideIndex;
			lastSlide(); // move slides in from left
		}

		initSlides(); // reset all slides
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

	var gotoSlide = function() {

		currentIndex = $j(this).data('index');
		console.log('gotoSlide: ', currentIndex);

		var offset = $j(this).offset().left;

		$slides.each(function(){
			var left = $j(this).position().left;
			var pos = left-offset;
			$j(this).css('left', pos);
		});
	}

	_this.helloWorld = function(){
		console.log('Hello Readon!');
	}
	
	
	init();
}
