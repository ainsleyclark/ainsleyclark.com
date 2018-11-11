/*
*
*
    Nav
    
*
* 
*/


var position = '#home';
var is_nav_open = false;

$(window).resize(resizeNav);

scrollTo();

var navItems = ["#nav_overlay", "nav span", '.circle', '.circle img'];

/*
    resizeNav Function
    - Unbinds all scroll events (window).
    - Clear all properties from timeline.
    - Moves the circles up and down in the DOM.
    - Unbinds any hovers from the nav.
    - Kills the timelines.
    - Recalls the nav function.
*/
function resizeNav() {

    is_nav_open = false;
    navMobileTL.reverse();
    $(window).unbind('scroll');
    TweenMax.set(navItems, {
        clearProps: 'all'
    });
    changeCircles();
    $('nav').unbind();

    if ($(window).width() <= 700) {
        isMobile = true;
        navTL.kill();
    }
    else {
        isMobile = false;
        navMobileTL.kill();
    }

    nav();
}

/*

    Desktop Nav Timeline

*/
var navTime = 0.3;
var y = 30;

var navTL = new TimelineMax({
    paused: true
    , onReverseComplete: function() {
        TweenMax.set('.circle', {
            clearProps: 'scale'
        });
        $(window.location.hash + '_circle').addClass("current");
    }
});
navTL
    .to(".circle", navTime, {
        scale: 3.5
        , borderRadius: 3
    })
    .to("li:nth-child(1) .circle", navTime, {
        y: y - (y * 4)
    }, "-=" + navTime)
    .to("li:nth-child(2) .circle", navTime, {
        y: y - (y * 2)
    }, "-=" + navTime)
    .to("li:nth-child(3) .circle", navTime, {
        y: y
    }, "-=" + navTime)
    .to("li:nth-child(4) .circle", navTime, {
        y: y * 3
    }, "-=" + navTime)
    .to(".circle img", navTime, {
        opacity: 1
    }, "-=" + navTime)
    .to("nav span", navTime, {
        x: -80
        , ease: Linear.easeNone
    }, "-=" + navTime)
    .to("#nav_overlay", navTime, {
        x: -85
        , ease: Linear.easeNone
    }, "-=" + navTime);

/*

    Mobile Nav Timeline

*/
var navMobileTL = new TimelineMax({
    paused: true
});
navMobileTL
    .to("#nav_overlay", 0.2, {
        width: "100vw"
        , ease: Linear.easeOut
    })
    .staggerTo("nav span", 0.2, {
        x: 300
        , opacity: 1
        , ease: Expo.EaseOut
    }, 0.1)
    .to("li:nth-child(2) .circle", 0.2, {
        x: -10
        , opacity: 0
        , ease: Linear.easeOut
    }, "-=0.6")
    .to("li:nth-child(1) .circle", 0.2, {
        rotation: 45
        , y: 9
        , ease: Linear.easeOut
    }, "-=0.5")
    .to("li:nth-child(3) .circle", 0.2, {
        rotation: -45
        , y: -9
        , ease: Linear.easeOut
    }, "-=0.5");

/*
    checkPosition Function
    - Stores the users scroll position.
    - Loops through each section and stores the height and position in DOM.
    - If the user is within bounds:
        * Update position variable.
        * Use History API to replace state.
*/
function checkPosition() {
    var scrolled = $(window).scrollTop();

    $("section").each(function() {

        var section_pos = $(this).offset().top - 100;
        var section_height = $(this).height();

        if (section_pos <= scrolled && section_pos + section_height > scrolled) {

            //Set the position variable to the section.
            position = '#' + $(this).attr('id');

            //Change to location.hash using replaceState (wont push).
            if (history.replaceState) {
                history.replaceState(null, null, position);
            }
            else {
                location.hash = position;
            }
        }
    })
}

/*
    scrollTo Function
    - Prevents the defautlt behaviour on any link thats clicked with a hash tag.
    - Checks the position of the page does not equal where user has clicked.
    - Wiggle the dots if it does.
*/
function scrollTo() {
    $('a[href^="#"]').on('click', function(e) {
        e.preventDefault();

        //Sets time and delay of scroll.
        var scroll_speed = 1000;
        var scroll_delay;
        if (!isMobile) {
            scroll_delay = 0;
        }
        else {
            scroll_delay = navMobileTL.duration() * 1000;
        }

        var target = this.hash;
        var $target = $(target);

        //If the position of page, does not equal where were going, we can animate
        if (position != target) {
            position = target;
            //Scroll to
            setTimeout(function() {
                $('html, body').animate({
                    'scrollTop': $target.offset().top
                }, scroll_speed, 'swing', function() {});
            }, scroll_delay);
            //Else wiggle the dots/a links   
        }
        else {
            if (!isMobile) {
                wiggleElement($("nav ul"));
            }
        }
    });
}

/*
    nav Function
    - Determines whether the user is using desktop/mobile.
    - Moves the circles up and down the DOM
    - Uses hover/click functions to play and reverse timeline.
        Desktop 
            * Removes all current classes.
            * Binds changeCircles function to scroll.
*/
function nav() {
    //Throttle check position function to update hash.
    $(window).scroll($.throttle(250, checkPosition));
    /*
        Nav Desktop
    */
    if (!isMobile) {
        $(window).scroll($.throttle(300, changeCircles));
        moveCircles();
        $('nav').hover(function() {
            is_nav_open = true;
            $('.circle').removeClass("current");
            navTL.play();
        }, function() {
            is_nav_open = false;
            navTL.reverse();
        });
    }
    /*
        Nav Mobile
    */
    if (isMobile) {
        moveCircles();
        $("nav").click(function() {
            if (!is_nav_open) {
                console.log('nav');
                is_nav_open = true;
                navMobileTL.play();
            }
            else {
                is_nav_open = false;
                navMobileTL.reverse();
            }
        });
    }
}

/*
    changeCircles Function
    - Changes the dots class to increase size and change colour on scroll.
*/
function changeCircles() {
    $('.circle').removeClass("current");
    if (!is_nav_open && !isMobile) {
        $(window.location.hash + '_circle').addClass("current");
    }
}

/*
    moveCircles Function
    - Moves the cirlces up and down the DOM to ensure there is no link
    attached in mobiule.
*/
function moveCircles() {
    //Get parents name
    var parent = $(".circle").parent()[0].nodeName;
    if (parent == 'A' && isMobile) {
        //Insert before A Link
        $(".circle").each(function() {
            $(this).insertBefore($(this).parent());
        });
    }
    else if (parent == 'LI' && !isMobile) {
        //Insert after A link
        $(".circle").each(function() {
            $(this).insertBefore($(this).siblings().children());
        });
    }
    else {
        return;
    }
}