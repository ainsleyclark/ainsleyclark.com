
///////////////////// Drawing Logo TimeLine ///////////////////// 
var length = 412;

var logo = $("#home_logo");
$("#home_logo").css({
    "stroke-dashoffset": length,
    "stroke-dasharray" : length,
    "fill-opacity": "0"
});

var drawLogoTL = new TimelineLite({
    paused: true
}); 
drawLogoTL
.to(logo, 1.5, {strokeDashoffset: 0, ease:Sine.easeIn})
.to('.blue_stroke, .orange_stroke, .shadow', 1.4, {fillOpacity: 1}, "-=0.1")
.to(logo, 0.5, {strokeOpacity: 0, ease:Power1.easeIn}, "-=1");

///////////////////// Banner TimeLine ///////////////////// 
var homeBannerTL = new TimelineLite({
    paused: true,
    onComplete: function(){
        logoRollOver();
        //Scroll Arrow Animation
        TweenMax.to("#home_small_arrow", 1, {y: -15, ease:Power1.easeInOut, repeat:-1, yoyo: true});
    }
});

homeBannerTL
    .from('.letters', 1, {x: -75, opacity: 0})
    .from('#home_banner h1', 1, {opacity: 0, x: 75}, "-=0.5")
    .from('#home_banner h2', 1, {opacity: 0, x: -75}, "-=0.5")
    .from('#home_banner button', 0.7, {opacity: 0, y: -75}, "-=0.5")
    .from('#home_small_arrow, #scroll', 0.7, {opacity: 0, y: -75}, "-=0.5");

///////////////////// Logo RollOver Animation ///////////////////// 
//Clone Home Logo
var clone  = $("#home_logo").clone().prependTo("#home_banner svg");
clone.attr('id','home_logo_clone');
clone.css({
    "z-index": "-2",
    "stroke-dashoffset": "0",
    "stroke-opacity": "0"
});

var logoRollOverTL = new TimelineMax({paused: true});
logoRollOverTL
    .staggerTo(".letters > path:not(:first-child)", 0.2, {x: 250, ease:Expo.EaseOut}, 0.1) 
    .to("#home_logo", 0.7, {rotation: -90, transformOrigin:"50% 50%", strokeOpacity: 1, ease:Expo.easeOut}, "-=1")
    .to('.blue_stroke, .orange_stroke, .shadow', 0.6, {fillOpacity: 0}, "-=1.3")
    .to("#I", 0.5, {rotation: -335, x: 70, y: -40, scaleX: 2, scaleY: 4, transformOrigin:"50% 50%", fillOpacity: 0, strokeOpacity: 0.7, ease:Power2.easeInOut}, "-=1")
    .to(clone, 0.7, {x: 320, rotation: 90, transformOrigin:"50% 50%", strokeOpacity: 1, fillOpacity: 0, ease:Expo.easeOut}, "-=1")
        
function logoRollOver() {
    //Mouse Enter Play TimeLine
    $('#logo_container').mouseover(function() {  
        logoRollOverTL.play().timeScale(1.5);
    });
    //Mouse Out Reverse TimeLine
    $('#logo_container').mouseleave(function() {
        logoRollOverTL.reverse();
    });
}


    /* -------------------------------- 

    #learnmore click function,
    rerverse timeline.

    -------------------------------- */
    $('#learnmore').click(function() {

    //Get the time it takes for banner animation to reverse
    var reverseTime = drawLogoTL.duration() * 1000 / 2;

    //Rid of rollover
    $('#logo_container').addClass("no_hover");

    //Hide the clone logo
    clone.hide();

    //Reverse drawLogo and homeBanner timelines, quicker.
    drawLogoTL.reverse().timeScale(2);
    homeBannerTL.reverse().timeScale(2);
    
    //Scroll to about
    setTimeout(function(){ 
        $('html, body').animate({
            'scrollTop': $(window).height()

        }, 1000, 'swing', function() {

            //Reinstate hover, show the clone and reset the timelines
            $('#logo_container').removeClass("no_hover");

            //Show the clone
            clone.show();

            //Reset the home timelines and pause.
            drawLogoTL.seek(reverseTime * 2).pause();
            homeBannerTL.seek(reverseTime * 2).pause();


        });
    }, reverseTime);

});

