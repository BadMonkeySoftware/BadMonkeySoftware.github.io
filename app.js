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

     // get the form elements defined in your form HTML above
    
     var form =     document.getElementById("my-form");
     var button =   document.getElementById("btnContactUs");
     var status =   document.getElementById("error_message");
 
     // Success and Error functions for after the form is submitted
     
     function success() {
       form.reset();
    //    form.hide();
       jQuery('form#my-form').hide();
       button.style = "display: none ";
       status.innerHTML = "Thanks!";
     }
 
     function error() {
       status.innerHTML = "Oops! There was a problem.";
     }
 
     // handle the form submission event
 
     form.addEventListener("submit", function(ev) {
       ev.preventDefault();
       var data = new FormData(form);
       ajax(form.method, form.action, data, success, error);
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
        url: $form.action,
        data: $form.serialize(),
        success: after_form_submitted,
        dataType: 'json'
    });

});

function ajax(method, url, data, success, error) {
    var xhr = new XMLHttpRequest();
    xhr.open(method, url);
    xhr.setRequestHeader("Accept", "application/json");
    xhr.onreadystatechange = function() {
      if (xhr.readyState !== XMLHttpRequest.DONE) return;
      if (xhr.status === 200) {
        success(xhr.response, xhr.responseType);
      } else {
        error(xhr.status, xhr.response, xhr.responseType);
      }
    };
    xhr.send(data);
}