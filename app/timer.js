import $ from 'jquery';

const progressGray = $('.progress');
const progressBar = $('.progress-bar');
const notice = $('#notice');
const selectedImgArea = $('#selected-img-area');
const imgSelected = $('.img-selected');
const imgRandom = $('.img-random');
const textAddition = $('.text-addition');
const tabsArea = $('#tabs-area');
const dropdownToggle = $('.dropdown-toggle');

// エクササイズ後のタイマー
let closeTimerWidth = 100;
const closeTimer = () => {
  setTimeout(() => {
    if (closeTimerWidth <= 0) {
      // notice.text('※Chrome拡張機能が必要です');
      setTimeout(() => {
        tabsArea.hide();
        $('#chrome-extension').show();
      }, 1000);
      return;
    }
    closeTimerWidth -= 100 / 1200;
    progressBar.css('width', `${closeTimerWidth}%`);
    closeTimer();
  }, 10);
};

// エクササイズ中のタイマー
let w = 100;
const timer = () => {
  setTimeout(() => {
    w -= 100 / 3000; // 100 / 6000
    progressBar.css('width', `${w}%`);

    if (w <= 0) {
      setTimeout(() => {
        notice.text('おつかれさまでした!');
        selectedImgArea.hide();
        tabsArea.show();
        dropdownToggle.removeClass('cantClick');
      }, 1000);
      setTimeout(() => {
        progressGray.css('width', '20%');
        progressBar.css('width', '100%');
      }, 2000);
      setTimeout(() => {
        notice.text('このページを自動で閉じます');
        closeTimer();
      }, 3000);
    } else if (w <= 25) {
      notice.text('あとすこし！がんばれ～!');
      progressBar.removeClass('bg-warning');
      progressBar.addClass('bg-danger');
      imgSelected.fadeIn(2000);
      imgRandom.fadeOut(2000);
      textAddition.fadeOut(2000);
      timer();
    } else if (w <= 50) {
      progressBar.addClass('bg-warning');
      imgSelected.fadeOut(2000);
      imgRandom.fadeIn(2000);
      textAddition.fadeIn(2000);
      timer();
    } else if (w <= 100) {
      timer();
    }
  }, 10);
};

export default timer;
