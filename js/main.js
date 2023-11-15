'use strict';

window.requestAnimFrame = (function()
{
  return  window.requestAnimationFrame       ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame    ||
          function( callback ){
            window.setTimeout(callback, 1000 / 60);
          };
})();

$(document).ready(function () {
    var rtime;
    var timeout = false;
    var delta = 200;
    var $windowWidth = $(window).width();

    function resizeend() {
      if (new Date() - rtime < delta) {
          setTimeout(resizeend, delta);
      } else {
          timeout = false;
          $windowWidth = $(window).width();
          $(document).trigger('sccResizeEnd');
      }
    }

    $(window).on('resize', function () {
        rtime = new Date();
        if (timeout === false) {
            timeout = true;
            setTimeout(resizeend, delta);
        }
    });

    if($('.innerbannerwrap .innerbanner').length){
      var scrollOptions = {
       test : $('.innerbannerwrap .innerbanner')
      };

      var scrolling = new Scroller();  
      scrolling.init(scrollOptions);
    }


    $('.navbar-toggle').on('click', function () {
        $(this).toggleClass('is-active');
        $('.nav-menu').toggleClass('open-nav');
        var wH = $(window).height();

        if ($('.nav-menu').hasClass('open-nav')) {
            $('.wrapper').css('height', wH);
        } else {
            $('.wrapper').css('height', 'auto');
        }
    });


    var lastScrollTop = 0,
        scrollDelta = 5,
        navbarHeight = $('.header-lower').outerHeight(),
        st;

    //Stick Up Menu

    $(window).on('scroll', function(){
      st = $(this).scrollTop();

      if(Math.abs(lastScrollTop - st) <= scrollDelta){
        return;
      }

      if(st < 40){
        $('.header-lower').removeClass('nav-down').removeClass('sticky-menu');
      }
      else if (st > lastScrollTop && st > navbarHeight){
        $('.header-lower').removeClass('sticky-menu').addClass('nav-down');
      } else {
        if(st + $(window).height() < $(document).height()) {
          $('.header-lower').addClass('sticky-menu').removeClass('nav-down');
        }
      }

      lastScrollTop = st;
    });


    $('.menu-bar li').on('click', function () {
        $(this).find('.sub-menu').toggleClass('addSubMenu');
    });


    if ($('#videoSlide').length) {
        $('#videoSlide').slick({
          infinite: false,
          prevArrow: '.btn-down',
          nextArrow: '.btn-up',
          responsive: [
              {
                breakpoint: 2000,
                settings: {
                  slidesToShow: 4,
                  slidesToScroll: 1,
                  infinite: true,
                  vertical: true,
                  dots: false
                }
              },
              {
                breakpoint: 992,
                settings: {
                  slidesToShow: 2,
                  slidesToScroll:1,
                  infinite:true,
                  vertical:false,
                }
              },
              {
                breakpoint:600,
                settings: {
                  slidesToShow: 1,
                  slidesToScroll: 1,
                  vertical:false
                }
              }
          ]
      });
    }

  // if($('#galleryWrapper').length){
    $('.galleryMenu a').on('click' , function() {
      var el = $(this);
            el.parents('.menu-wrapper').find('a').removeClass('selected');
            el.addClass('selected');
        });
        var $container2 = $('#galleryWrapper');
        $container2.isotope({
              itemSelector: '.item',
              animationOptions: {
                duration: 750,
                easing: 'linear',
                queue: false
              }
        });
        $('.galleryMenu  li a').on('click', function(e) {
            e.preventDefault();
            var filterValue = $(this).attr('data-filter');
            $container2.isotope({
                filter: filterValue
            });
        });
    
    // }
    

    if($('.awards-wrap').length){
        $('.awards-wrap').slick({
            infinite:true,
            slidesToShow: 4,
            slidesToScroll:1,
            dots:false,
            prevArrow: '.awards_prev',
            nextArrow: '.awards_next',
            responsive: [
                {
                    breakpoint: 2000,
                    settings: {
                      slidesToShow: 4,
                      slidesToScroll: 1,
                    }
                },
                {
                    breakpoint: 1200,
                    settings: {
                      slidesToShow: 3,
                      slidesToScroll:1,
                    }
                },
                {
                    breakpoint: 768,
                    settings: {
                      slidesToShow: 2,
                      slidesToScroll:1,
                    }
                },
                {
                    breakpoint:480,
                    settings: {
                      slidesToShow:1 ,
                      slidesToScroll:1,
                    }
                }
            ]
        });
    }


    if($('.slideHeroes').length){
        $('.slideHeroes').slick({
          infinite:true,
          slidesToShow: 3,
          slidesToScroll:1,
          dots:false,
          centerMode: true,
          centerPadding: '0px',
          prevArrow: '.prev-player',
          nextArrow: '.next-player',
          responsive: [
              {
                breakpoint: 2000,
                settings: {
                  slidesToShow: 3,
                  slidesToScroll: 1
                }
              },
              {
                breakpoint: 992,
                settings: {
                  slidesToShow: 2,
                  slidesToScroll:1,
                  centerMode: false,
                  centerPadding: '0px'
                }
              },
              {
                breakpoint:480,
                settings: {
                  slidesToShow: 1,
                  slidesToScroll:1,
                  centerMode: false,
                  centerPadding: '0px',
                }
              }
          ]
        });
    }

    if($('.socialinfo').length){
        $('.socialinfo').slick({
            infinite:true,
            slidesToShow: 1,
            slidesToScroll:1,
            autoplay:true,
            arrows:false,
            dots:false,
        });
    }

    var slickOptions = {
        infinite: true,
        slidesToShow: 4,
        slidesToScroll: 1,
        prevArrow: '.club_prev',
        nextArrow: '.club_next',
        responsive: [
            {
              breakpoint: 992,
              settings: {
                slidesToShow: 3,
                slidesToScroll:1,
                infinite:true
              }
            },
            {
              breakpoint:600,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 1
              },  
            },
            {
              breakpoint:480,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1
              },
            }
        ]
    };

    if (('#club_news').length){
        $('#club_news').slick(slickOptions);
    }
    
    $('#world_news_button').on('shown.bs.tab', function () {
        $('#club_news').slick('unslick');
        $('#world_news').slick(slickOptions);
    });

    $('#club_news_button').on('shown.bs.tab', function () {
        $('#world_news').slick('unslick');
        $('#club_news').slick(slickOptions);
    });


    if($('.historyMeter').length){
        $('.historyMeter').slick({
            infinite:true,
            slidesToShow:12,
            arrows:false,
            dots:false,
            responsive: [
                {
                  breakpoint: 992,
                  settings: {
                    slidesToShow: 6,
                    slidesToScroll:1,
                    infinite:true
                  }
                },
                {
                  breakpoint:600,
                  settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1
                  }
                }
            ]
        });
    }

    $('.historyMeter a').on('click',function (event) {
        event.preventDefault();
        var target = $(this).attr('href');
        if (target==='#') {
        }else {
            $('.historyMeter li').removeClass('active');
            $(this).parent().addClass('active');
            $('.historyVideoWrap .tab-pane').hide();
            $(target).show();
        }
    });


    var $grid = $('.grid');
    if($grid.length){
        var masonaryOptions = {
          gutter: '.gutter',
          isFitWidth: true
        };

        $grid.imagesLoaded(function () {
            $grid.masonry(masonaryOptions);
        });

        $(window).on('sccResizeEnd', function () {
            $grid.masonry(masonaryOptions);
        });
    }


    if($('.boardmember').length){
        $('.boardmember').slick({
            infinite:true,
            slidesToShow: 3,
            slidesToScroll:1,
            dots:false,
            prevArrow: '.prev-player',
            nextArrow: '.next-player',
            responsive: [
                {
                  breakpoint: 2000,
                  settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1
                  }
                },
                {
                  breakpoint: 992,
                  settings: {
                    slidesToShow: 2,
                    slidesToScroll:1
                  }
                },
                {
                  breakpoint:600,
                  settings: {
                    slidesToShow: 1,
                    slidesToScroll:1
                  }
                }
            ]
        });
    }

    if($('.wrap-achive').length){
        $('.wrap-achive').slick({
            infinite:true,
            slidesToShow: 1,
            slidesToScroll:1,
            dots:true,
            arrows:false
        });
    }

    if($('.player02').length){
        $('.player02').slick({
            infinite:true,
            slidesToShow: 1,
            slidesToScroll:1,
            dots:false,
            prevArrow: '.prev',
            nextArrow: '.next'
        });
    }

    if($('.client').length){
        $('.client').slick({
            infinite:true,
            slidesToShow: 5,
            slidesToScroll:1,
            dots:false,
            arrows:false,
            autoplay:true,
                responsive: [
                    {
                      breakpoint: 2000,
                      settings: {
                        slidesToShow: 5,
                        slidesToScroll: 1
                      }
                    },
                    {
                      breakpoint: 992,
                      settings: {
                        slidesToShow: 3,
                        slidesToScroll:1
                      }
                    },
                    {
                      breakpoint:600,
                      settings: {
                        slidesToShow: 2,
                        slidesToScroll:1
                      }
                    },
                    {
                      breakpoint:480,
                      settings: {
                        slidesToShow: 1,
                        slidesToScroll:1
                      }
                    }
                ]
        });
    }

    if($('.blog_slider').length){
        $('.blog_slider').slick({
            infinite:true,
            slidesToShow: 1,
            slidesToScroll:1,
            dots:false,
            prevArrow: '.blog_prev',
            nextArrow: '.blog_next'
        });
    }

    if($('.shop-wrap-slider').length){
        $('.shop-wrap-slider').slick({
            infinite:true,
            slidesToShow: 1,
            slidesToScroll:1,
            dots:false,
            arrows:false
        });
    }
    

    function playerwindows(){       
        var playerWh = $('.player02info').innerHeight();
        $('.player02fig .imgplayer').css('height' , playerWh);
    }
    playerwindows();
    

    if($('#layerSlider').length){
        $('#layerSlider').layerSlider({
            autoStart : false,
            skin : 'noskin',
            skinsPath : '/css/skins/'
        });
    }

    

   

    $('#aboutTab a').click(function (e) {
      e.preventDefault();
      $(this).tab('show');
    });
   
    var $containergallery = $('#galleryWrapper');
    if($containergallery.length){

        var $boxes = $('.item');
        var masonaryOptionsGallery = {
                                isAnimated: true,
                                isFitWidth: true
                            };
        $boxes.hide();

        $containergallery.imagesLoaded( function() {
            $boxes.fadeIn();
    
            $containergallery.masonry(masonaryOptionsGallery);    
        });
    
        $(window).on('sccResizeEnd', function () {
            $containergallery.masonry(masonaryOptionsGallery);
        });

        $containergallery.one( 'layoutComplete', function() {
            $('#galleryLoader').hide();
        });
    }
   
    var heightachivement = $('.achivementwrapper .achievement li .figcontentachv').innerHeight();
    $('.achivementwrapper .achievement li .fig').css('height' ,heightachivement );
    $('.achivementwrapper .achievement li .fig').css('line-height' ,heightachivement+ 'px');



    $('.yr_accordion a').on('click',function (event) {
        event.preventDefault();
        var target = $(this).attr('href');
        if (target !== '#') {
            $('.yr_accordion li').removeClass('active');
            $(this).parent().addClass('active');
            $('.information-wrap .tab-pane').hide();
            $(target).show();
        }
    });

   


    function scoreboard(){
        if($windowWidth <= 991){
            if(!$('.wrapper-score-scrollbar .wrap').hasClass('slick-initialized')){
                $('.wrapper-score-scrollbar .wrap').slick({
                    infinite:true,
                    slidesToShow: 1,
                    slidesToScroll:1,
                    dots:false,
                    arrows:true,
                    prevArrow: '.prevScore',
                    nextArrow: '.nextScore'
                });
            }
            
        }else{
            if($('.wrapper-score-scrollbar .wrap').hasClass('slick-initialized')){
                $('.wrapper-score-scrollbar .wrap').slick('unslick');
            }
        }   
    }   
     scoreboard();
    $(window).on('sccResizeEnd', function () {
        scoreboard();
    });

   

    function wayPoint() {
        if ($windowWidth >= 1200){
            $('.latestResult').waypoint(function() {
                setTimeout(function() {
                    $('.figure').addClass('addfigure');
                }, 100);
                setTimeout(function() {
                    $('.team-logo').css('opacity' , '1');
                }, 1000);
                setTimeout(function() {
                    $('.figure').addClass('animatefig-before');
                }, 1000);
                setTimeout(function() {
                    $('.content').css('opacity' , '1');
                }, 2000);

            }, { offset: '70%' });
        }   

        $('.achivementwrapper').waypoint(function() {
            setTimeout(function() {
                $('.achievement .fig img').addClass('figachvadd');
            }, 600);

        }, { offset: '70%' });

        
    }
    
    if ($windowWidth >= 992) { wayPoint(); }


   

    //Single Item
    $('.magnificPopup').magnificPopup({
      type:'image',
      image: {
          // options for image content type
          titleSrc: 'title'
        }
    });

    //Multiple Item - Gallery
    $('.magnificPopupParent').magnificPopup({
        delegate: 'a', // child items selector, by clicking on it popup will open
        type: 'image',
        gallery:{
            enabled:true
        },
        mainClass: 'mfp-with-zoom', // this class is for CSS animation below

        zoom: {
            enabled: true, // By default it's false, so don't forget to enable it

            duration: 300, // duration of the effect, in milliseconds
            easing: 'ease-in-out', // CSS transition easing function 

            // The "opener" function should return the element from which popup will be zoomed in
            // and to which popup will be scaled down
            // By defailt it looks for an image tag:
            opener: function(openerElement) {
              // openerElement is the element on which popup was initialized, in this case its <a> tag
              // you don't need to add "opener" option if this code matches your needs, it's defailt one.
              return openerElement.is('img') ? openerElement : openerElement.find('img');
            }
        }
    });


   
    if($('.datetime').length){
        var today = new Date;
        var n = today.toDateString();
        $('.datetime').html(n);
    }


      if($('.scrollable').length){
        if ($(window).width() > 768){
          $('.scrollable').slimScroll({
              alwaysVisible: false,
              railVisible: false,
              height: '400px',
              size: '0px',
          });
        }  
      }   



    if($('.match_timing').length){
        $('.match_timing').countdown('2023/11/31', function(event) {
            $(this).html(
                event.strftime('<ul class="counter-wrap ">' + 
                                '<li ><span>%D</span>days</li>' + 
                                '<li ><span>%H</span>hours</li>' + 
                                '<li> <span>%M</span>minutes</li>' + 
                                '<li ><span>%S</span>seconds</li>' + 
                              '</ul>')
            );
        });
    }
});
