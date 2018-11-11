/*
*
*
    PreLoader - uses page show event, when fired, it hides the 
*
* 
*/


window.location.hash = '#home';
$('.circle').removeClass("current");
if (!isMobile) {
    $('#home_circle').addClass("current");
}
    

function preLoaderTL() {

    //PreLoader Logo Animation
    var tl = new TimelineMax({
        repeat:2, 
        yoyo: true,
        repeatDelay: 1
    });

    tl
    .to("#left_logo", 0.6, {
        strokeDashoffset: 0,  
        ease:Sine.easeIn
    })
    .to("#slash", 0.6, {
        strokeDashoffset: 0, 
        ease:Sine.easeIn
    }, "-=0.4")
    .to("#right_logo", 0.6, {
        strokeDashoffset: 0, 
        ease:Sine.easeIn
    }, "-=0.4")
    
    return tl;

}

$(window).on("pageshow", function(e){

    //Hide all sections apart from the home which disables scroll whilst preloader is animating
    $('section, nav').hide();

    $("#preloader svg").removeClass("hidden");
    $("#preloader h1").removeClass("hidden");

    //Set up stroke-dasharray & dash-offset for logo animation
    var logoLength = 800;
    var slashLength = 1200;

    $("#left_logo, #right_logo").css({
        "stroke-dashoffset": logoLength,
        "stroke-dasharray" : logoLength,
    });
    $("#slash").css({
        "stroke-dashoffset": slashLength,
        "stroke-dasharray" : slashLength
    });

    //Header (Welcome) Animation
    TweenLite.from("#preloader h1", 0.6, {
        y: -40,
        opacity: 0, 
        ease:Sine.easeIn
    })

    //Run the preloader animation function
    preLoaderTL().play();
    
    //Sets a timeout for the preloader so it doesnt load too early.
    setTimeout(function() {

        //Show the other sections
        $('section').show();        

        //Hide Header (Welcome) Animation
        TweenLite.to("#preloader h1", 0.6, {
            y: 40,
            opacity: 0, 
            ease:Sine.easeIn
        });


        //FadeOut Prerloader and call home animation functions.
        $("#preloader").fadeOut('slow', function() {

            //Hide the preloader and show other sections.
            $("#preloader").hide();
            $('nav').show(); 
                
            //Play home animations
            drawLogoTL.play();
            homeBannerTL.play();

            nav();

            // if (!isMobile) {
            //     TweenMax.set('nav span', { right: "-160px" });
            //     //Tween the dots (nav)
            //     TweenLite.from("nav ul", 1, {
            //         x:100, 
            //         ease:Elastic.easeOut,
            //         onComplete: function() {
            //             TweenMax.set('nav span', { right: "-80px" });
            //             //Call the main nav function
            //             nav();
            //         }
            //     });
            // } else {
            //     nav();
            // }


        });
    }, 3000);

});