import 'bootstrap';
import $ from 'jquery';

/**
 * スクロールボタン
 */
const topBtn = $('.page-top');

// eslint-disable-next-line func-names
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
