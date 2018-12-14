console.log('custom js loaded')
//Var declarations
	//var baseUrl = 'https://www.aconsaca.com/';
	var baseUrl = 'http://localhost:4000/';
	var formAction = 'https://liveformhq.com/form/46238499-ae13-4125-9dfe-c36c9765e953';
	//Navigation
		var navLinksLW	= $('#mhNavbar .navleftside').width(); //Width of navigation left side items
		var nameW				= ($('#mhNavbar .name a').width() + 2 )/ 2; //Width of logo /2 because its substracted form each side
		var navLinksRW	= $('#mhNavbar .navrightside').width(); //Width of navigation right side items
		var socialW			= $('#mhNavbar .social').width(); // Width of social items
		var langW				= $('#mhNavbar .lang').width(); //Width of language selector

//Function declarations
	//Test navigation items fit in window
		function testfit(e){
			var windowWidth = $(window).width() - 32;//Show the width of the actual viewport (doesn't take the scrollbar width), the navigation padding (16 on both sides) is reduced
			var halfWidth 	= windowWidth / 2;
			var rightItemsS = nameW + navLinksRW + socialW + langW;
			var rightItems = nameW + navLinksRW + langW;
			var leftItems = nameW + navLinksLW;
			
			if(halfWidth <= rightItemsS){//If the right items including the social icons is bigger than half the window
				$('#mhNavbar .social').hide();
			}else{
				$('#mhNavbar .social').show();
			}

			if(halfWidth <= leftItems || halfWidth <= rightItems){//If the left items are bigger than half the window or right items without social is bigger than half window
				$('#mhNavbar').addClass('mobile');
			}else{
				$('#mhNavbar').removeClass('mobile');
			}

			if(e.type === 'load' || e.type === 'orientationchange'){//Remove the calculating class which makes all elements transparent while is calculated how will be displayed the navbar
				$('#mhNavbar').removeClass('calculating');
			}	
		}

//On load
	$('.slider').slick({
		arrows: true,
		dots: true
	});	
	$('form').attr('action', formAction)

//Interactions
	//Show-hide navigation logo on scroll
		$(document).scroll(function(){
			if($(document).scrollTop() >= 100){
				if(!$('#mhNavbar').hasClass('scrolled')){
					$('#mhNavbar').addClass('scrolled');
				}
			}else {
				if($('#mhNavbar').hasClass('scrolled')){
					$('#mhNavbar').removeClass('scrolled');
				}		
			}
		});
	
	//Test nav items fit on window load, resize or orientation change
		$(window).bind('load resize orientationchange', function(e){
			if(e.type === 'orientationchange'){
				$('#mhNavbar').addClass('calculating');
			}
			testfit(e);
		});	

	//Open menu on mobile display
		$('.navbar-toggle').click(function(){
			$('.mobile').toggleClass('open');
		});

	//Gallery
		$('.mhgallery').each(function(){
			lightGallery(document.getElementById($(this).attr('id')));
		});

	//Product Modal slider
		$(document).on('click', '[data-mhsection="products_preview"] li', function(){
			productSlide(this);
			//
		});
		$(document).on('click', '#productsModal .next', function(){
			var currentSlide = $('[data-mhsection="products_preview"] li[data-slide=' + $('#productsModal').attr('data-slide') + ']');
			var currentSlideContainer = $(currentSlide).closest('.col-md');
			var nextSlide = $(currentSlide).next();
			if(nextSlide.length === 0){
				if($(currentSlideContainer).hasClass('first-half')){
					nextSlide = $('[data-mhsection="products_preview"] .second-half li:first');
				}else if($(currentSlideContainer).hasClass('second-half')){
					nextSlide = $('[data-mhsection="products_preview"] .first-half li:first');
				}else if($(currentSlideContainer).hasClass('first')){
					nextSlide = $('[data-mhsection="products_preview"] .second li:first');
				}else if($(currentSlideContainer).hasClass('second')){
					nextSlide = $('[data-mhsection="products_preview"] .first li:first');
				}
			}
			productSlide(nextSlide)
		})
		$(document).on('click', '#productsModal .prev', function(){
			var currentSlide = $('[data-mhsection="products_preview"] li[data-slide=' + $('#productsModal').attr('data-slide') + ']');
			var currentSlideContainer = $(currentSlide).closest('.col-md');
			var prevSlide = $(currentSlide).prev();
			if(prevSlide.length === 0){
				if($(currentSlideContainer).hasClass('first-half')){
					prevSlide = $('[data-mhsection="products_preview"] .second-half li:last');
				}else if($(currentSlideContainer).hasClass('second-half')){
					prevSlide = $('[data-mhsection="products_preview"] .first-half li:last');
				}else if($(currentSlideContainer).hasClass('first')){
					prevSlide = $('[data-mhsection="products_preview"] .second li:last');
				}else if($(currentSlideContainer).hasClass('second')){
					prevSlide = $('[data-mhsection="products_preview"] .first li:last');
				}
			}
			productSlide(prevSlide)
		})
		function productSlide(item){
			var image = '<img class="img-fluid" src="' + $(item).attr('data-img') + '">';
		  var text  = $.trim($(item).text()) + '(' + $(item).attr('data-scientific') + ')';
		  var slide = $(item).attr('data-slide');	
			$('#productsModal .modal-title').text(text);
			$('#productsModal .modal-body .image').html(image);  
			$('#productsModal').attr('data-slide', slide);
			if(!$('#productsModal').hasClass('show')){
				$('#productsModal').modal('show');
			}
		}
		function fireSession(){
			$('.alert').hide();
			var mail = $.trim($('#adminEmail').val());
			var pass = $.trim($('#password').val());
			if(mail && pass){
				$('.btn').attr("disabled", true).text('Please wait...');
				mailSignin({
					email    : mail,
					password : pass,
					success  : function(){
						window.location.replace(baseUrl);
					},
					error    : function(error){
						$('.login-alert').toggle().text(error.message);
						$('.btn').attr("disabled", false).text('Sign in');
					}
				});
			}else{
				if(!mail){
					$('.mail-alert').toggle();
				}
				if(!pass){
					$('.pass-alert').toggle();
				}
			}
		}
		
/*
$('.header-slider, .nosotros-slider').slick({
	arrows: true,
	dots: true
});
$(document).ready(function() {
  if ($('[data-img]').length > 0) {
    $('[data-img]').each(function() {
      var $background, $this;
      $this = $(this);
      $background = $(this).attr('data-img');
      if ($this.attr('data-img').substr(0, 1) === '#') {
        return $this.css('background-color', $background);
      } else {
        return $this.css('background-image', 'url(' + $background + ')');
      }
    });
  }
	if ($('[data-bg]').length > 0) {
    $('[data-bg]').each(function() {
      var $background, $this;
      $this = $(this);
      $background = $(this).attr('data-bg');
      if ($this.attr('data-bg').substr(0, 1) === '#') {
        return $this.css('background-color', $background);
      } else {
        return $this.css('background-image', 'url(' + $background + ')');
      }
    });
  }  
});
lightGallery(document.getElementById('lightgallery'));
 */
var loader = '<div class="mhloading"><div class="icon"><i class="fas fa-spinner fa-pulse"></i><i class="fas fa-check" style="display: none;"></i></div></div>';
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
  	if (!document.getElementById("mhAdminbar")) {
		  $.getScript('/assets/admin/admin.js?' + new Date(), function(){});
		}
  }
});
//if(user){
//	$.getScript('http://127.0.0.1:4000/assets/admin/admin.js?' + new Date(), function(){});	
//}


