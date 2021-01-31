import 'bootstrap';
import $ from 'jquery';

/**
 * スクロールボタン
 */
const topBtn = $('.page-top');
topBtn.hide();
$(window).on('scroll', function () {
  if ($(this).scrollTop() > 3800) {
    topBtn.fadeIn();
  } else {
    topBtn.fadeOut();
  }
});

topBtn.on('click', () => {
  $('body,html').animate({ scrollTop: 0 }, 500);
  return false;
});
