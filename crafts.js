$(document).ready(function() {

    //Create a each loop and pass to the rollover function.
    $(".crafts_box").each(craftsRollOver);

    //Crafts RollOver TimeLine
    function craftsRollOver(i, element) {

        //Set up variables
        var img = $(element).find("img");
        var shadow = $(element).find(".crafts_shadow");
        var title = $(element).find(".crafts_title");
        var li = $(element).find("li");

        //Create new timeline
        var tl = new TimelineMax({ paused: true })
            //Move shadow & image up and fade out
            .to([img, shadow], 0.4, {
                y: -10, 
                opacity: 0, 
                ease:Power2.easeInOut
            })
            //Move title and border up
            .to(title, 0.5, {
                y: -250, 
                ease:Power2.easeOut
            }, "-=0.2") 
            //Stagger li elements from right
            .staggerFrom(li, 0.4, {
                x: 100, 
                opacity: 0, 
                ease:Sine.easeOut
            }, 0.2)  

        //Hover Function
        $(element).hover(function(){
                tl.play().timeScale(1);
            }, function(){
                tl.reverse().timeScale(2);
        });

    }

    var craftsController = new ScrollMagic.Controller();

    //Crafts Header Scene
    var scene = new ScrollMagic.Scene({
        triggerElement: "#crafts",
        offset: 85
    })
    //.addIndicators({name: "Cafts Header"})
    .setTween( headerAnimation('crafts').play() )
    .addTo(craftsController);

    //Code Boxes TimeLine
    var craftsContainerTL = new TimelineMax({delay: 0.8});
    craftsContainerTL
    .staggerFrom(".crafts_box", 0.4, {
        scale: 0.7,
        opacity: 0, 
        ease:Sine.easeOut
    }, 0.2)  

    //Crafts Boxes Scene
    var scene = new ScrollMagic.Scene({
        triggerElement: "#crafts",
        offset: 250
    })
    //.addIndicators({name: "Crafts Boxes"})
    .setTween(craftsContainerTL)
    .addTo(craftsController);
    
});