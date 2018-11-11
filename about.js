$(document).ready(function() {

    var aboutController = new ScrollMagic.Controller();

    //About Header Scene
    var scene = new ScrollMagic.Scene({
        triggerElement: "#about",
        //offset:500
    })
    //.addIndicators()
    .setTween( headerAnimation('about').play() )
    .addTo(aboutController);





    // //First Paragraph TimeLine
    // var firstParagraphTL = new TimelineMax();
    // firstParagraphTL
    //     .from("#adventures_container", 1, {
    //         opacity: 0,
    //         x: -100,
    //         ease:Power2.easeOut
    //     })
    //     // .from("p:first-of-type", 0.5, {
    //     //     opacity: 0,
    //     //     left: "-100",
    //     //     ease:Power2.easeOut
    //     // }) 
    //     .from("#photo_of_me", 1, {
    //         // scale: 0.5,
    //         opacity: 0, 
    //         ease:Power2.easeOut
    //     }, "-=0.5")

    // //First Paragraph Scene
    // var scene = new ScrollMagic.Scene({
    //     triggerElement: "#adventures_container",
    //     offset:100
    // })
    // .addIndicators()
    // .setTween(firstParagraphTL)
    // .addTo(aboutController);







    //Code Header TimeLine
    var codeBannerTL = new TimelineMax({});
    codeBannerTL
        .from("#code_box", 1, {
            opacity: 0, 
            height: 0, 
            ease:Power2.easeOut
        }) 
        .from("#code_background span", 1, {
            y: -10, 
            opacity: 0, 
            ease:Power2.easeOut
        }, "-=.5")

    //Code Header Scene
    var scene = new ScrollMagic.Scene({
        triggerElement: "#code_background",
        offset:100
    })
    //.addIndicators()
    .setTween(codeBannerTL)
    .addTo(aboutController);


    //Block Quote Scene
    var scene = new ScrollMagic.Scene({
        triggerElement: "#learning",
        offset:200
    })
        .on('start', type("#learning"))
        //.addIndicators({name: "BlockQuote"})
        .addTo(aboutController);

    function type(element) {

        var text = [
            $(element + ' h3').text(), 
            $(element + ' h2').text(), 
            $(element + ' h1').text()
        ]

        var heading = [
            'h3',
            'h2',
            'h1'
        ]

    var i = 0; 
    var k = 0;               
    var speed = 75;
    var typed = '';
    var length;

    // function myLoop () { 
    //     if (k < 3) {
            
    //         length = text[k].length;
            
    //         setTimeout(function () {  
    //             console.log(k);  
    //             typed += text[k].charAt(i);  
    //             $(element + ' ' + heading[k]).html(typed);
    //             i++;
    //             if (i - 1 == length) {
    //                 k++;
    //                 i = 0;
    //                 typed = ''
    //                 myLoop();
    //             }          
    //             if (i <= length) {          
    //                 myLoop();             
    //             }
    //         }, speed)
    //     }

        
    // }

    
    // myLoop();
}


        // var h3 = $(element + ' h3').text();
        // var typed = '';
        //var length = h3.length;
        // $(element + ' h3').html('');

        // for (var i = 0; i < length; i++) {
        //     (function(index) {
        //         setTimeout(function() { 
        //             typed += h3.charAt(index);
        //             $(element + ' h3').html(typed);
        //         }, i * 75);
        //     })(i);
        // }

        //TweenMax.from("#learning", 1, {y: -200, ease:Power1.easeInOut});
    
    
});