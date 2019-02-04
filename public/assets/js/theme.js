


$(document).ready(function () {


    'use strict';

    progressively.init({
        onLoadComplete: function() {
        }
    });

    $("head").append('<link rel="stylesheet" type="text/css" href="/assets/css/animate.css?1">');
    $("head").append('<link href="https://cdn.materialdesignicons.com/2.0.46/css/materialdesignicons.min.css" rel="stylesheet">');
    $("head").append('<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.0/css/all.css" integrity="sha384-lZN37f5QGtY3VHgisS14W3ExzMWZxybE1SJSEsQp9S+oqd12jhcu+A56Ebc1zFSJ" crossorigin="anonymous">');


    

    function wowInit() {
        var scrollingAnimations = false; // Set false for turn off animation
        if(scrollingAnimations){
            $(window).on('load', function () {
                setTimeout(function () {
                    new WOW().init();
                },400);
            });

        }
    }
    wowInit();


    var flag = [];

    $('.portfolio-box').click(function(event) {

      let modalName = $(this).attr('data-name');

      if (flag.indexOf(modalName)) {

        flag.push(modalName);

        let allImages = $('.modal-body[data-name="'+modalName+'"]').find('.load-on-modal-open');

          allImages.each(function( index ) {

            $(this).attr("src", $(this).attr( "data-progressive" ));

          });
      }

    });
 
    //mobile-menu
    $('.mobile-btn, .close-mob-menu').on('click', function () {
        $('.mob-menu-wrapper').toggleClass('active');
    });
    $('.mobile-menu ul li a').on('click', function () {
        $('.mob-menu-wrapper').removeClass('active');
    });

    //scroll to anchor
    $('.main-menu ul li a[href*="#"], .mobile-menu ul li a[href*="#"]').on('click', function(event){
        event.preventDefault();
        var margin = $('.header').outerHeight();
        var anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $(anchor.attr('href')).offset().top - margin
        }, 800);
    });

    //init Mix It Up (portfolio)
    if($('div').is('.portfolio')) {
        mixitup('.portfolio', {
            animation: {
                duration: 400,
                effectsIn: 'fade translateY(-100%)',
                effectsOut: 'fade translateY(-100%)'
            },
            selectors: {
                control: '[data-mixitup-control]'
            }
        });
    }

    //bootstrap portfolio modal
    $('#portfolio-modal').on('show.bs.modal', function (event) {
        var button = $(event.relatedTarget); // Button that triggered the modal
        var workName = button.data('name'); // Extract info from data-* attributes
        // If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
        // Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.
        $(this).find('.modal-body').hide();

        $('.modal-body[data-name = ' + workName + ']').show();
    });

    //fixed header
    function fixedHeader() {
        var ww = $(window).scrollTop();
        if(ww > 0){
            $('.header').addClass('active');
        }else{
            $('.header').removeClass('active');
        }
    }
    fixedHeader();
    $(window).on('scroll', function () {
        fixedHeader();
    });

    //open bootstrap modal from modal
    $(document).on('hidden.bs.modal', '.modal', function () {
        if($('.modal:visible').length){
            $(document.body).addClass('modal-open');
             if($(window).width() > 991){
                 $(document.body).css({paddingRight: '17px'});
             }
        }else {
            $(document.body).css({paddingRight: 0});
        }
    });

    function validateForm(selector) {
Array.from(document.querySelectorAll(selector)).forEach(function (item) {
  item.addEventListener('input', function (e) {
    if (e.target.value === '') {
      item.dataset.touched = false;
    }
  });
  item.addEventListener('invalid', function () {
    item.dataset.touched = true;
  });
  item.addEventListener('blur', function () {
    if (item.value !== '') item.dataset.touched = true;
  });
});
    };
    validateForm('.js-modal-form .form-field');
    validateForm('.js-footer-form .form-field');
  //  validateForm('.form-wrapper .form-field');

  var modalForm = document.querySelector('.js-modal-form');
  var footerForm = document.querySelector('.js-footer-form');
  var modalFormName = '.js-modal-form';
  var footerFormName = '.js-footer-form';

  // modalForm.addEventListener('submit', function(e){
  //   submitForm(e, modalFormName);
  // });

  // footerForm.addEventListener('submit', function(e){
  //   submitForm(e, footerFormName);
  // });

  function submitForm(e, formName){
    e.preventDefault();
    var name = $(formName + ' .js-field-name').val();
    var email = $(formName + ' .js-field-email').val();
    var message = $(formName + ' .js-field-message').val();

    var formData = {
        name: name,
        email: email,
        message: message
    };

    $.ajax({
      type: "POST",
      url: '/mail.php',
      data: formData,
      success: function() {
        $('#contact-modal').modal('hide');
        $('#thanks-modal').modal('show');
      },
      error: function() {
        console.log('error');
        $('#contact-modal').modal('hide');
        // $('#error-modal').modal('show');
        $('#thanks-modal').modal('show');

      }
    });
  }

});
