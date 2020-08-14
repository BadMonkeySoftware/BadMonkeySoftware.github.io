jQuery(document).ready(function () {
    var mySwiper = new Swiper('.swiper-container', {
        // Optional parameters
        direction: 'horizontal',
        loop: true,

        // If we need pagination
        pagination: {
            el: '.swiper-pagination',
            dynamicBullets: true
        },

        // Navigation arrows
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },

        // And if we need scrollbar
        scrollbar: {
            el: '.swiper-scrollbar',
        },
    });


});
jQuery('#contact-btn').click(e => {
    e.stopPropagation();
    e.preventDefault();
    alert("Hey There")
})

function after_form_submitted(data) {
    if (data.result == 'success') {
        jQuery('form#reused_form').hide();
        jQuery('#success_message').show();
        jQuery('#error_message').hide();
    } else {
        jQuery('#error_message').append('<ul></ul>');

        jQuery.each(data.errors, function (key, val) {
            jQuery('#error_message ul').append('<li>' + key + ':' + val + '</li>');
        });
        jQuery('#success_message').hide();
        jQuery('#error_message').show();

        //reverse the response on the button
        jQuery('button[type="button"]', $form).each(function () {
            $btn = jQuery(this);
            label = $btn.prop('orig_label');
            if (label) {
                $btn.prop('type', 'submit');
                $btn.text(label);
                $btn.prop('orig_label', '');
            }
        });

    } //else
}
//http://reusableforms.com/d/p3/jquery-popup-contact-form-with-validation
jQuery('#reused_form').submit(function (e) {
    e.preventDefault();

    $form = jQuery(this);
    //show some response on the button
    jQuery('button[type="submit"]', $form).each(function () {
        $btn = jQuery(this);
        $btn.prop('type', 'button');
        $btn.prop('orig_label', $btn.text());
        $btn.text('Sending ...');
    });


    jQuery.ajax({
        type: "POST",
        url: '/api/contact',
        data: $form.serialize(),
        success: after_form_submitted,
        dataType: 'json'
    });

});