var position = '#home';
var is_open = false;


$(window).scroll( $.throttle( 250, checkPosition ) );

$(window).resize(function() {
    if($(window).width() < 770) {
        isMobile = true;
        
    } else {
        isMobile = false;
    }
});

scrollTo();


function checkPosition() {
    var scrolled = $(window).scrollTop();

    $("section").each(function(){
        
        var section_pos = $(this).offset().top - 100;
        var section_height = $(this).height();

        if (section_pos <= scrolled && section_pos + section_height > scrolled) {

            //Set the position variable to the section.
            position = '#' + $(this).attr('id');

            //Change to location.hash using replaceState (wont push).
            if(history.replaceState) {
                history.replaceState(null, null, position);
            }
            else {
                location.hash = position;
            }
        }
    })
}

/*
    Change Circles Function
    - Changes the dots class to increase size and change colour.
*/
function changeCircles() {
    $('.circle').removeClass("current");
    if (!is_open) {
        $(position + '_circle').addClass("current");
    } 
}

/*
    Scroll To Anchor Function
    - Prevents the defautlt behaviour on any link thats clicked with a hash tag.
    - Checks the position of the page does not equal where user has clicked.
    - Wiggle the dots if it does.
*/
function scrollTo() {
    $('a[href^="#"]').on('click', function(e) {
        e.preventDefault();
    
        //IMPORTANT, SETS TIME OF SCROLL
        var scroll_speed = 800;
    
        var target = this.hash;
        var $target = $(target);
    
        //If the position of page, does not equal where were going, we can animate
        if(position != target){
    
            position = target;
            //Scroll to
                $('html, body').animate({
                    'scrollTop': $target.offset().top
                }, scroll_speed, 'swing', function() {

                });
    
        //Else wiggle the dots/a links   
        } else {
            if(!isMobile) {
                wiggleElement($("nav ul"));
            }
        }
    
    });
}


function nav() {

    /*
        Nav Desktop
    */
    if(!isMobile) {
        $(window).scroll( $.throttle( 250, changeCircles ) );

        var navTime = 0.3;
        var y = 30;
        
        var navTL = new TimelineMax({paused: true, onReverseComplete:function() {
            TweenMax.set('.circle', {clearProps:'scale'});
            $(position + '_circle').addClass("current");
        }});
        navTL
            .to(".circle", navTime, {scale: 3.5, borderRadius: 3})
            .to("li:nth-child(1) .circle", navTime, {y: y - (y * 4)}, "-=" + navTime)
            .to("li:nth-child(2) .circle", navTime, {y: y - (y * 2)}, "-=" + navTime)
            .to("li:nth-child(3) .circle", navTime, {y: y}, "-=" + navTime)
            .to("li:nth-child(4) .circle", navTime, {y: y * 3}, "-=" + navTime)
            .from(".circle img", navTime, {scale: 0, opacity: 0}, "-=" + navTime)
            .to("nav span", navTime, {x: -80, ease:Linear.easeNone}, "-=" + navTime)
            .to("#nav_overlay", navTime, {x: -80, ease:Linear.easeNone}, "-=" + navTime);
    
        $('nav').hover(function() {
            is_open = true;
            $('.circle').removeClass("current");
            navTL.play();
    
        }, function(){
            is_open = false;
            navTL.reverse();     
        });
    }

    /*
        Nav Mobile
    */
    if(isMobile) {
        $(".circle").each(function (){
            $(this).insertBefore($(this).parent());
        });
    
        var navMobileTL = new TimelineMax({paused: true});
            navMobileTL
                .to("#nav_overlay", 0.2, {left: 0, ease:Linear.easeOut})
                .staggerFrom("nav span", 0.2, {x: -250, opacity: 0, ease:Expo.EaseOut}, 0.1) 
        
        var hamburgerTL = new TimelineMax({paused: true});
            hamburgerTL
                .to("li:nth-child(2) .circle", 0.2, {x: -10, opacity: 0, ease:Linear.easeOut})
                .to("li:nth-child(1) .circle", 0.2, {rotation: 45, y: 9, ease:Linear.easeOut}, "-=0.1")
                .to("li:nth-child(3) .circle", 0.2, {rotation: -45, y: -9, ease:Linear.easeOut}, "-=0.2");
    
        $("nav").click(function() {
            if (!is_open) {
                is_open = true;
                navMobileTL.play();
                hamburgerTL.play();
            } else {
                is_open = false;
                navMobileTL.reverse();
                hamburgerTL.reverse();
            }   
        });
    }


}




