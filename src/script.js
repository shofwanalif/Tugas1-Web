$(document).ready(function () {
  // Mobile Menu Toggle
  $('#mobile-menu-btn').click(function () {
    $('#mobile-menu').slideToggle(300);
  });

  // Smooth Scrolling untuk Navigation Links
  $('.nav-link, #mobile-menu a').click(function (e) {
    e.preventDefault();
    var target = $(this).attr('href');

    $('html, body').animate(
      {
        scrollTop: $(target).offset().top - 70,
      },
      800
    );

    // Close mobile menu setelah klik
    $('#mobile-menu').slideUp(300);
  });

  // Navbar Shadow saat Scroll
  $(window).scroll(function () {
    if ($(this).scrollTop() > 50) {
      $('#navbar').addClass('scrolled');
    } else {
      $('#navbar').removeClass('scrolled');
    }

    // Show/Hide Back to Top Button
    if ($(this).scrollTop() > 300) {
      $('#back-to-top').fadeIn();
    } else {
      $('#back-to-top').fadeOut();
    }
  });

  // Back to Top Button
  $('#back-to-top').click(function () {
    $('html, body').animate(
      {
        scrollTop: 0,
      },
      800
    );
  });

  // CTA Button - Scroll ke Kontak
  $('#cta-btn').click(function () {
    $('html, body').animate(
      {
        scrollTop: $('#kontak').offset().top - 70,
      },
      800
    );
  });

  var counterAnimated = false;

  $(window).scroll(function () {
    var statSection = $('#tentang').offset().top;
    var scrollPos = $(window).scrollTop() + $(window).height();

    if (scrollPos > statSection && !counterAnimated) {
      counterAnimated = true;

      $('.counter').each(function () {
        var $this = $(this);
        var target = parseInt($this.data('target'));

        $({ counter: 0 }).animate(
          { counter: target },
          {
            duration: 2000,
            easing: 'swing',
            step: function () {
              $this.text(Math.ceil(this.counter));
            },
            complete: function () {
              $this.text(target);
            },
          }
        );
      });
    }
  });

  // Project Item Hover Effect
  $('.project-item').hover(
    function () {
      $(this).find('.project-overlay').stop().fadeTo(300, 1);
    },
    function () {
      $(this).find('.project-overlay').stop().fadeTo(300, 0);
    }
  );

  // Form Submission Handler
  $('#contact-form').submit(function (e) {
    e.preventDefault();

    // Ambil data form
    var nama = $('#nama').val();
    var email = $('#email').val();
    var telepon = $('#telepon').val();
    var pesan = $('#pesan').val();

    // Validasi sederhana
    if (nama && email && telepon && pesan) {
      // Tampilkan loading
      var submitBtn = $(this).find('button[type="submit"]');
      var originalText = submitBtn.text();
      submitBtn.text('Mengirim...').addClass('loading');

      setTimeout(function () {
        // Reset form
        $('#contact-form')[0].reset();

        // Tampilkan pesan sukses
        $('#form-message')
          .removeClass('hidden error-message')
          .addClass('success-message')
          .html('✓ Terima kasih! Pesan Anda telah terkirim. Kami akan segera menghubungi Anda.')
          .fadeIn();

        submitBtn.text(originalText).removeClass('loading');

        setTimeout(function () {
          $('#form-message').fadeOut(function () {
            $(this).addClass('hidden');
          });
        }, 5000);
      }, 1500);
    } else {
      // Tampilkan pesan error
      $('#form-message').removeClass('hidden success-message').addClass('error-message').html('✗ Mohon lengkapi semua field!').fadeIn();

      setTimeout(function () {
        $('#form-message').fadeOut(function () {
          $(this).addClass('hidden');
        });
      }, 3000);
    }
  });

  // Active Navigation Link saat Scroll
  $(window).scroll(function () {
    var scrollPos = $(window).scrollTop() + 100;

    $('.nav-link').each(function () {
      var currLink = $(this);
      var refElement = $(currLink.attr('href'));

      if (refElement.length) {
        if (refElement.offset().top <= scrollPos && refElement.offset().top + refElement.height() > scrollPos) {
          $('.nav-link').removeClass('text-orange-600 font-semibold');
          currLink.addClass('text-orange-600 font-semibold');
        }
      }
    });
  });

  // Lazy Loading untuk Images (Optional)
  $('img').each(function () {
    $(this).addClass('lazy-loaded');
  });

  // Add Animation Class saat Element terlihat
  function checkVisible(elm) {
    var rect = elm.getBoundingClientRect();
    var viewHeight = Math.max(document.documentElement.clientHeight, window.innerHeight);
    return !(rect.bottom < 0 || rect.top - viewHeight >= 0);
  }

  $(window).scroll(function () {
    $('.project-item, .service-card').each(function () {
      if (checkVisible(this)) {
        $(this).addClass('fade-in');
      }
    });
  });

  // Console Message
  console.log('%c✓ Website KonstruksiPro Loaded Successfully!', 'color: #ea580c; font-size: 16px; font-weight: bold;');
  console.log('%cBuilt with HTML, Tailwind CSS & jQuery', 'color: #666; font-size: 12px;');
});
