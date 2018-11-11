/*
*
*
    contact.js 
    Uses jQueryv Validate Plug-in to validate the form, if it is valid it will
    send the data using AJAX to php/contact.php, then fade away and display a 
    Thankyou message by changing the fieldset's inner HTML.
    If it isnt valid a small animation will occur and the form will be reset.
*
* 
*/

$(document).ready(function() {

    //Validate the form using jQuery Validate Plugin
    $('form.ajax').validate();

    var submitted = false;

    $('form.ajax').on('submit', function(e) {
    
        //!COME BACK TO, POSITION NOT WORKING
        if (!submitted) {
                // contactFormTL.add(TweenMax.staggerFrom('label', 0.5, {
                //         y: -20, 
                //         opacity: 0,
                //         ease:Expo.EaseIn
                //     }, "-=0.5")  
                // ) 
            console.log(contactFormTL.duration());
            contactFormTL.add(TweenLite.from($('label'), 0.5, {opacity: 0, y: -10}, "-=1"));
            console.log(contactFormTL.duration());
        }
        submitted = true;


        //If the form is valid, send data and run animation
        if ($('form.ajax').valid()) {
            var submit = $('button[type=submit]');

            submit.prop('disabled',true) //Disable the submit button to prevent double submission
        
            $('button').unbind('mouseenter').unbind('mouseleave')  //UnBind the hover events
            
            var that = $(this),
                url = that.attr('action'),
                type = that.attr('method'),
                data = {};
        
            that.find('[name]').each(function(index, value) {
                var that = $(this),
                    name = that.attr('name'),
                    value = that.val();
                data[name] = value;   
            });
            
            $.ajax({
                url: url,
                type: type,
                data: data,
            });
        
            //Form submitted - true;
            submitted = true;

            //Animate Form
            contactWoosh($("label"));

        //Else - Wiggle the Submit Button (phone), Wiggle form (desktop)
        } else {
            if(isMobile) {
                wiggleElement($('button[type=submit]'));
            } else {
                wiggleElement($('form'));
            }
        }
        return false;
    });

    //Wiggle Animation for Reset and Clear Form
    $('form.ajax').on('reset', function(e) {
        $("form").validate().resetForm();
        wiggleElement($('#reset'));
    });

    //Contact Form Animation
    function contactWoosh() {
        TweenMax.staggerTo($(contact_form).find('input,textarea,button,fieldset'), 0.6, {
            y: 20, 
            opacity: 0,
            ease:Expo.EaseIn,
        }, -0.2, function(){

            //Take contact form out of DOM
            $(contact_form).find('input,textarea,button').hide();
            contactBoxesScene.enabled(false);
            //Once complete run changeFieldSet and animate down.
            changeFieldSet();
            TweenLite.to('fieldset', 1, {
                opacity: 1, 
                y: 150,
                ease:Sine.easeOut
            });

        });
    }

    //Change the fieldset CSS Properties and inner HTML.
    function changeFieldSet() {
        $('fieldset')
        .css({
            "font-size": "2.2em", 
            "line-height": "1.5em",
            "letter-spacing": "2px",
        })
        .html('Thank you. <br> I\'ll be in touch soon.');  
    }

    var contactController = new ScrollMagic.Controller();

    //Contact Header Scene
    var contactHeaderScene = new ScrollMagic.Scene({
        triggerElement: "#contact",
        offset: 135
    })
    //.addIndicators({name: "Contact Header"})
    .setTween( headerAnimation('contact').play() )
    .addTo(contactController);

    //Contact Boxes Timeline
    var contactFormTL = new TimelineMax({delay: 1});
    contactFormTL
    .staggerFrom($(contact_form).find('input,textarea,button,fieldset'), 0.5, {
        y: -50, 
        opacity: 0,
        ease:Bounce.EaseOut
    }, 0.15)  
        
    //Contact Boxes Scene
    var contactBoxesScene = new ScrollMagic.Scene({
        triggerElement: "#contact_form",
        offset: 0
    })
    //.addIndicators({name: "Contact Form"})
    .setTween(contactFormTL.play())
    .addTo(contactController);


});