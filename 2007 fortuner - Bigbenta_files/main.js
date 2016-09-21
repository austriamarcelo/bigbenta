(function ($) {
 "use strict";
 
/*----------------------------
 jQuery MeanMenu
------------------------------ */
	jQuery('nav#dropdown').meanmenu();	 
/*----------------------------
 wow js active
------------------------------ */
	new WOW().init();
    
    /*category left menu*/
    $('.category-heading').on('click', function(){
        $('.category-menu-list').slideToggle(300);
    });
    /*category accordion*/
    $('.rx-parent').on('click', function(){
        $('.rx-child').slideToggle();
        $(this).toggleClass('rx-change');
    });
    
/*----------------------------
features-curosel owl active
------------------------------ */  
  $(".features-curosel").owlCarousel({
      autoPlay: false, 
	  slideSpeed:2000,
	  pagination:false,
	  navigation:true,	  
      items : 5,
	  /* transitionStyle : "fade", */    /* [This code for animation ] */
	  navigationText:["<i class='fa fa-arrow-left'></i>","<i class='fa fa-arrow-right'></i>"],
      itemsDesktop : [1199,4],
	  itemsDesktopSmall : [980,3],
	  itemsTablet: [768,2],
	  itemsMobile : [479,1],
  });
    
/*----------------------------
box-content-all owl active
------------------------------ */  
  $(".box-content-all").owlCarousel({
      autoPlay: false, 
	  slideSpeed:2000,
	  pagination:false,
	  navigation:true,	  
      items : 1,
	  /* transitionStyle : "fade", */    /* [This code for animation ] */
	  navigationText:["<i class='fa fa-chevron-left'></i>","<i class='fa fa-chevron-right'></i>"],
      itemsDesktop : [1199,1],
	  itemsDesktopSmall : [980,1],
	  itemsTablet: [768,1],
	  itemsMobile : [479,1],
    }); 
    
/*----------------------------
features-curosel2 owl active
------------------------------ */  
  $(".features-curosel2").owlCarousel({
      autoPlay: false, 
	  slideSpeed:2000,
	  pagination:false,
	  navigation:true,	  
      items : 4,
	  /* transitionStyle : "fade", */    /* [This code for animation ] */
	  navigationText:["<i class='fa fa-chevron-left'></i>","<i class='fa fa-chevron-right'></i>"],
      itemsDesktop : [1199,4],
	  itemsDesktopSmall : [980,3],
	  itemsTablet: [768,2],
	  itemsMobile : [479,1],
    }); 
/*----------------------------
item_all owl active
------------------------------ */      
   $(".item_all").owlCarousel({
      autoPlay: false, 
	  slideSpeed:2000,
	  pagination:false,
	  navigation:true,	  
      items : 7,
	  /* transitionStyle : "fade", */    /* [This code for animation ] */
	  navigationText:["<i class='fa fa-chevron-left'></i>","<i class='fa fa-chevron-right'></i>"],
      itemsDesktop : [1199,4],
	  itemsDesktopSmall : [980,3],
	  itemsTablet: [768,2],
	  itemsMobile : [479,1],
    });
/*----------------------------
latest_all owl active
------------------------------ */  
    $(".latest_all").owlCarousel({
      autoPlay: false, 
	  slideSpeed:2000,
	  pagination:false,
	  navigation:true,	  
      items : 1,
	  /* transitionStyle : "fade", */    /* [This code for animation ] */
	  navigationText:["<i class='fa fa-arrow-left'></i>","<i class='fa fa-arrow-right'></i>"],
      itemsDesktop : [1199,1],
	  itemsDesktopSmall : [980,1],
	  itemsTablet: [768,1],
	  itemsMobile : [479,1],
    });
/*----------------------------
client-slider-all owl active
------------------------------ */ 
    $(".client-slider-all").owlCarousel({
      autoPlay: false, 
	  slideSpeed:2000,
	  pagination:false,
	  navigation:true,	  
      items : 1,
	  /* transitionStyle : "fade", */    /* [This code for animation ] */
	  navigationText:["<i class='fa fa-arrow-left'></i>","<i class='fa fa-arrow-right'></i>"],
      itemsDesktop : [1199,1],
	  itemsDesktopSmall : [980,1],
	  itemsTablet: [768,1],
	  itemsMobile : [479,1],
    });
 /*----------------------------
 features-tab3 owlcarousel  active
------------------------------ */ 
    $(".features-tab3").owlCarousel({
      autoPlay: false, 
	  slideSpeed:2000,
	  pagination:false,
	  navigation:true,	  
      items : 5,
	  /* transitionStyle : "fade", */    /* [This code for animation ] */
	  navigationText:["<i class='fa fa-chevron-left'></i>","<i class='fa fa-chevron-right'></i>"],
      itemsDesktop : [1199,4],
	  itemsDesktopSmall : [980,3],
	  itemsTablet: [768,2],
	  itemsMobile : [479,1],
    });
/*----------------------------
features-curosel8  owl active 
------------------------------ */ 
  $(".features-curosel8").owlCarousel({
      autoPlay: false, 
	  slideSpeed:2000,
	  pagination:false,
	  navigation:true,	  
      items : 4,
	  /* transitionStyle : "fade", */    /* [This code for animation ] */
	  navigationText:["<i class='fa fa-arrow-left'></i>","<i class='fa fa-arrow-right'></i>"],
      itemsDesktop : [1199,4],
	  itemsDesktopSmall : [980,2],
	  itemsTablet: [768,2],
	  itemsMobile : [479,1],
    });
/*----------------------------
what-client-say  owl active 
------------------------------ */     
    $(".what-client-say").owlCarousel({
        autoPlay: false, 
        slideSpeed:2000,
        items : 1,
        pagination:false,
        navigation:true,
        navigationText:["<i class='fa fa-chevron-left'></i>","<i class='fa fa-chevron-right'></i>"],
        animateOut:'fade',
        itemsDesktop : [1199,1],
        itemsDesktopSmall : [979,1],
        itemsMobile : [767,1]
    });
/*----------------------------
 price-slider active
------------------------------ */  
    $( "#slider-range" ).slider({
        range: true,
        min: 80,
        max: 730,
        values: [ 88, 721 ],
        slide: function( event, ui ) {
        $( "#amount" ).val( ui.values[ 0 ] + " - " + ui.values[ 1 ] );
        }
    });
    $( "#amount" ).val(  $( "#slider-range" ).slider( "values", 0 ) +
    " - " + $( "#slider-range" ).slider( "values", 1 ) );
/*---------------------
Image Zoom
--------------------- */
	$('.simpleLens-big-image').simpleLens({
		loading_image: 'demo/images/loading.gif'
	});
    
/*--------------------------
 scrollUp
---------------------------- */	
    $(window).on('scroll',function () {
        if($(window).scrollTop()>200) {
            $("#toTop").fadeIn();
        } else {
            $("#toTop").fadeOut();
        }
    });
    $("#toTop").on('click', function() {
        $("html,body").animate({
            scrollTop:0
        }, 500)
    });
    
 
})(jQuery); 