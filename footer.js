$(document).ready(function() {

    //Create a each loop and pass to the rollover function.
    $('#footer_container a').each(footerRollOver);

    //Crafts RollOver TimeLine
    function footerRollOver(i, element) {

            //Set up variables
            var icon = $(element).find("i");
            //var this = $(this);

            var tl = new TimelineLite({ paused: true }); 
            
            tl
                .to($(this), 0.2, {
                    scale: 0.9, 
                    backgroundColor: "#f15a29", 
                    ease:Sine.easeInOut
                })
                .to(icon, 0.1, {
                    opacity: 0, 
                    y: -50, 
                    ease:Linear.easeOut
                }, "-=.2")
                .set(icon, {y: 50})
                .to(icon, 0.1, {
                    opacity: 1, 
                    y: -10, 
                    ease:Linear.easeOut
                })
            
            //Hover Function
            $(element).hover(function(){
                tl.play();
            }, function(){
                tl.reverse();
            });
    }

    //Arrow hover
    $('#arrow').hover(
        function() {
            arrowIconTL.play();
        },
        function() {
            arrowIconTL.seek(0).pause();
        }
    )

    //Arrow TimeLine
    var arrowIconTL = new TimelineMax({paused: true, repeat:-1, repeatDelay:0.7})
        .to('#contact_arrow_icon', 0.2, {y: -40, ease:Power3.easeOut})
        .set('#contact_arrow_icon', {y: 30, opacity: 0})
        .to('#contact_arrow_icon', 0.2, {y: 0, opacity: 1, ease:Back.easeOut})

    $('#arrow').click(function(){
        drawLogoTL.seek(0).pause();
        homeBannerTL.seek(0).pause();
        setTimeout(function(){
            drawLogoTL.play();
            homeBannerTL.play();
        }, 1000);

    });
});