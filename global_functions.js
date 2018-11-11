/* 

Return isMobile

*/
var isMobile;
if ($(window).width() < 767){
    isMobile = true;
}
else {
    isMobile = false;
}

/* 

headerAnimation function

*/
function headerAnimation(element) {

    //Set up variables, logo, h1 & hr.
    var logo = "#" + element + "_logo";
    var h1 = "#" + element + "_heading h1";
    var hr = "#" + element + "_heading hr";

    //Set the logo to have no stroke
    $(logo).css({
        "stroke-dashoffset": 412,
        "stroke-dasharray" : 412,
        "fill-opacity" : 0,
    });

    //TimeLine for Header Animation
    var tl = new TimelineMax({paused: true});
    tl 
        .to(logo, 1, {
            strokeDashoffset: 0, 
            ease:Sine.easeIn
        })
        .from(h1, 1, {
            y: -20, 
            opacity: 0, 
            ease:Power2.easeInOut
        }, "=-1") 
        .from(hr, 0.5, {
            width: 0, 
            ease:Power2.easeOut
        }, "=-0.2") 
    
    return tl;

}

/* 

wiggleElement function

*/
function wiggleElement(element) {
    TweenMax.fromTo(element,0.15, {x:-20},{
        x:15,
        repeat:2,
        yoyo:true,
        ease:Sine.easeInOut,
    onComplete:function(){
        TweenMax.to(this.target,1.5,{
            x:0,
            ease:Elastic.easeOut
        })
    }})
}

