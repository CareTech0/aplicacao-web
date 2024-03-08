$(document).ready(function(){
  $('.carousel').slick({
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: false,
    pauseOnClick: false,
    speed: 1000,
  });
});

$('.carousel').on('click', function(event) {
  event.stopPropagation();
});
