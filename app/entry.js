import 'bootstrap';
import $ from 'jquery';
import io from 'socket.io-client';

// モーダルをデフォルトで表示する
$('#modalLong').modal('show');

const imgSelectedExercise = $('.img-selected');
// const imgRandomExercise = $('.img-random')
const title = $('.title');
const progressGray = $('.progress');
const progressBar = $('.progress-bar');
const textAddition = $('.text-addition');
const imgArea = $('#img-area');
const commentBtnArea = $('#comment-btn-area');
const BtnText = $('.btn-text');

// エクササイズ後のタイマー
let closeTimerWidth = 100;
const closeTimer = () => {
  setTimeout(() => {
    if (closeTimerWidth <= 0) {
      return;
    }
    closeTimerWidth -= 100 / 1200;
    progressBar.css('width', `${closeTimerWidth}%`);
    closeTimer();
  }, 10);
};

// エクササイズ中のタイマー
let w = 100;
const exerciseTimer = () => {
  setTimeout(() => {
    w -= 100 / 100; // 100 / 6000
    progressBar.css('width', `${w}%`);

    if (w <= 0) {
      setTimeout(() => {
        title.text('おつかれさまでした!');
        imgArea.hide();
        commentBtnArea.show();
      }, 1000);
      setTimeout(() => {
        progressGray.css('width', '20%');
        progressBar.css('width', '100%');
      }, 3000);
      setTimeout(() => {
        title.text('このページを自動で閉じます');
        closeTimer();
      }, 4000);
    } else if (w <= 25) {
      progressBar.removeClass('bg-warning');
      progressBar.addClass('bg-danger');
      exerciseTimer();
    } else if (w <= 50) {
      progressBar.addClass('bg-warning');
      imgSelectedExercise.fadeOut(2000);
      textAddition.fadeIn(2000);
      exerciseTimer();
    } else if (w <= 100) {
      exerciseTimer();
    }
  }, 10);
};

$('.img-menus').on('click', () => {
  exerciseTimer();
});

const leftSection = $('.left-section');
leftSection.animate({ scrollTop: 5000000 });
// messagesArea.scrollTop = messagesArea.scrollHeight;
// // messagesArea.scrollTop( $(messagesArea[0].scrollHeight )

/**
 * socket.io
 */

// サーバーの IP アドレスに対して WebSocket 通信を開始するリクエストを送る
const socket = io();

socket.on('start data', () => {
  console.log('start data came');
});

// eslint-disable-next-line func-names
BtnText.on('click', function () {
  const text = $(this).data('text');
  console.log($(this).data('text'));
  socket.emit('post text', { text });

  const a = $('#postOwnTemplate').clone().removeAttr('id');
  a.find('.text-comment').text(text);
  a.find('.wrapper-img-comment').hide();
  a.appendTo(leftSection).fadeIn();
  leftSection.animate({ scrollTop: 5000000 });
});

const BtnStamp = $('.btn-stamp');
BtnStamp.on('click', function () {
  const src = $(this).attr('src');

  const a = $('#postOwnTemplate').clone().removeAttr('id');
  a.find('.img-comment').attr('src', src);
  a.find('.text-comment').hide();
  a.appendTo(leftSection).fadeIn();
  leftSection.animate({ scrollTop: 5000000 });
});

const imgMenus = $('.img-menus');
const imgSelected = $('.img-selected');
const imgRandom = $('.img-random');
imgMenus.on('click', function () {
  const src = $(this).attr('src');

  imgSelected.attr('src', src).show();
  imgRandom.show();
  const a = $('#postOwnTemplate').clone().removeAttr('id');
  a.find('.img-comment').attr('src', src);
  a.find('.text-comment').hide();
  a.appendTo(leftSection).fadeIn();
  leftSection.animate({ scrollTop: 5000000 });
});
