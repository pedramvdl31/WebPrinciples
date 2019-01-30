$(document).ready(function () {

    'use strict';

    //LAZY LOADING
    $("head").append('<link rel="preload" rel="stylesheet" type="text/css" href="/assets/css/animate.css">');
    $("head").append('<link rel="preload" rel="stylesheet" type="text/css" href="/assets/css/bootstrap.min.css">');
    $("head").append('<link rel="preload" rel="stylesheet" type="text/css" href="/assets/css/main.css">');
    

    // Get all of the images that are marked up to lazy load
    const images = document.querySelectorAll('.js-lazy-image');
    const imagesLoadImmediately = document.querySelectorAll('.js-lazy-image-imm');
    const config = {
      // If the image gets within 50px in the Y axis, start the download.
      rootMargin: '50px 0px',
      threshold: 0.01
    };

    setTimeout(function(){ 

        $('body').removeClass("loading");

        setTimeout(function(){ 

            loadImagesImmediately(imagesLoadImmediately);

         }, 1000);
        
    }, 2000);

    let imageCount = images.length;
    let observer;

    // If we don't have support for intersection observer, loads the images immediately
    if (!('IntersectionObserver' in window)) {
      loadImagesImmediately(images);
    } else {
      // It is supported, load the images
      observer = new IntersectionObserver(onIntersection, config);

      // foreach() is not supported in IE
      for (let i = 0; i < images.length; i++) { 
        let image = images[i];
        if (image.classList.contains('js-lazy-image--handled')) {
          continue;
        }

        observer.observe(image);
      }
    }

    /**
     * Fetchs the image for the given URL
     * @param {string} url 
     */
    function fetchImage(url) {
      return new Promise((resolve, reject) => {
        const image = new Image();
        image.src = url;
        image.onload = resolve;
        image.onerror = reject;
      });
    }

    /**
     * Preloads the image
     * @param {object} image 
     */
    function preloadImage(image) {
      const src = image.dataset.src;
      if (!src) {
        return;
      }

      return fetchImage(src).then(() => { applyImage(image, src); });
    }

    /**
     * Load all of the images immediately
     * @param {NodeListOf<Element>} images 
     */
    function loadImagesImmediately(images) {
      // foreach() is not supported in IE
      for (let i = 0; i < images.length; i++) { 
        let image = images[i];
        preloadImage(image);
      }
    }

    /**
     * Disconnect the observer
     */
    function disconnect() {
      if (!observer) {
        return;
      }

      observer.disconnect();
    }

    /**
     * On intersection
     * @param {array} entries 
     */
    function onIntersection(entries) {
      // Disconnect if we've already loaded all of the images
      if (imageCount === 0) {
        disconnect();
        return;
      }

      // Loop through the entries
      for (let i = 0; i < entries.length; i++) { 
        let entry = entries[i];
        // Are we in viewport?
        if (entry.intersectionRatio > 0) {
          imageCount--;

          // Stop watching and load the image
          observer.unobserve(entry.target);
          preloadImage(entry.target);
        }
      }
    }

    /**
     * Apply the image
     * @param {object} img 
     * @param {string} src 
     */
    function applyImage(img, src) {
      // Prevent this from being lazy loaded a second time.
      img.classList.add('js-lazy-image--handled');
      img.src = src;
      img.classList.add('fade-in');
    }



    // LAZY LAODING END




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


        var url = window.location.href;
        var host = window.location.host;
        var array = url.split('/#');

        if (array[1] != undefined) {

            if ($('a[data-name='+array[1]+']').length != 0) {

                $('#portfolio-modal').modal('show');
                $(this).find('.modal-body').hide();
                $('.modal-body[data-name = '+array[1]+']').show();

            }
            
        }


    // //init custom select
    // $('select').customSelect();

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
      Array.from(document.querySelectorAll(selector)).forEach(item => {
        item.addEventListener('input', (e) => {
            if(e.target.value === ''){
                item.dataset.touched = false;
            }
        });
        item.addEventListener('invalid', () => {
          item.dataset.touched = true;
        });
        item.addEventListener('blur', () => {
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

  modalForm.addEventListener('submit', function(e){
    submitForm(e, modalFormName);
  });

  footerForm.addEventListener('submit', function(e){
    submitForm(e, footerFormName);
  });

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
