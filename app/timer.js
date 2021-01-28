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
// タイマーの横幅(灰色の箇所に対する%)
let w2 = 100;
// タイマー終了までの秒数
const sec2 = 15;
// timer()実行の間隔(ミリ秒)
const span2 = 100;
// timer()1回あたりに減るタイマーの横幅(%)
const shrink2 = (100 / (sec2 * 1000)) * span2;
const closeTimer = () => {
  w2 -= shrink2;
  progressBar.css('width', `${w2}%`);
  if (w2 <= 0) {
    // notice.text('※Chrome拡張機能が必要です');
    setTimeout(() => {
      tabsArea.hide();
      $('#chrome-extension').show();
    }, 3000);
    return;
  }
  setTimeout(() => {
    closeTimer();
  }, span2);
};

// エクササイズ中のタイマー
// タイマーの横幅(%)
let w = 100;
// タイマー終了までの秒数
const sec = 60;
// timer()実行の間隔(ミリ秒)
const span = 100;
// timer()1回あたりに減るタイマーの横幅(%)
const shrink = (100 / (sec * 1000)) * span;

let CanChange1 = true;
let CanChange2 = true;

const timer = () => {
  w -= shrink;
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
      closeTimer();
      notice.text('このページを自動で閉じます');
    }, 3000);
    return;
  }

  if (w <= 25 && CanChange2) {
    CanChange2 = false;
    notice.text('あとすこし！がんばれ～!');
    progressBar.removeClass('bg-warning');
    progressBar.addClass('bg-danger');
    imgSelected.fadeIn();
    imgRandom.fadeOut();
    textAddition.fadeOut();
  } else if (w <= 50 && CanChange1) {
    CanChange1 = false;
    progressBar.addClass('bg-warning');
    imgSelected.fadeOut();
    imgRandom.fadeIn();
    textAddition.fadeIn();
  }

  setTimeout(() => {
    timer();
  }, span);
};

export default timer;
