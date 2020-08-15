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
    
    var form =              document.getElementById("my-form");
    var button =            document.getElementById("btnContactUs");
    var status_error =      document.getElementById("error_message");
    var status_success =    document.getElementById("success_message");

 
     // Success and Error functions for after the form is submitted
     
    function success() {
        form.reset();
        form.style = "display: none";
        status_success.style = "display: block";
        status_success.innerHTML = "Message was sent!";
        status_error.style = "display: none";
        button.style = "display: none ";
    //    status_error.innerHTML = "Thanks!";
    }
 
    function error() {
        status_error.style = "display: block";
        status_success.style = "display: none";
        status_error.innerHTML = "Oops! There was a problem.";
    }
 
     // handle the form submission event
 
     form.addEventListener("submit", function(ev) {
       ev.preventDefault();
       var data = new FormData(form);
       ajax(form.method, form.action, data, success, error);
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