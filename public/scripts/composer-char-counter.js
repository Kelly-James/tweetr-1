$(document).ready(function() {

  $(function() {
    const $counter = $('.counter');

    const max = 140;

    function updateCharsLeft() {
      let len = $(this).val().length;
      let char = max - len;
      $counter.text(char + ' Characters Left');
      if (len >= max) {
        $counter.addClass('max');
      } else {
        $counter.removeClass('max');
      }
    }

    $('.textarea').on('input', updateCharsLeft);
    $('.textarea').on('change', updateCharsLeft);

  });

})
