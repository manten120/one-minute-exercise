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

// チャット最下部にオートスクロール
const leftSection = $('.left-section');
leftSection.animate({ scrollTop: 5000000 });
// messagesArea.scrollTop = messagesArea.scrollHeight;
// // messagesArea.scrollTop( $(messagesArea[0].scrollHeight )

$('.left-section').on('click', '.fukidashi', function () {
  const username = $(this).parent().data('user');
  console.log(username);
});

/**
 * 吹き出しとユーザーアイコンを
 * マウスホバーまたはクリックしたとき
 * 両要素に.hoverクラスを着脱することで
 * アニメーションをつける
 */
$('.left-section').on(
  {
    mouseenter: function () {
      $(this).find('.icon').addClass('hover');
      $(this).parent().find('.fukidashi').addClass('hover');
    },
    mouseleave: function () {
      $(this).find('.icon').removeClass('hover');
      $(this).parent().find('.fukidashi').removeClass('hover');
    },
  },
  '.user'
);

$('.left-section').on(
  {
    mouseenter: function () {
      $(this).addClass('hover');
      $(this).parent().find('.icon').addClass('hover');
    },
    mouseleave: function () {
      $(this).removeClass('hover');
      $(this).parent().find('.icon').removeClass('hover');
    },
  },
  '.fukidashi'
);

$('.left-section').on('mousedown', '.fukidashi', function () {
  $(this).removeClass('hover');
  $(this).parent().find('.icon').removeClass('hover');
});
$('.left-section').on('mouseup', '.fukidashi', function () {
  $(this).addClass('hover');
  $(this).parent().find('.icon').addClass('hover');
});

$('.left-section').on('mousedown', '.user', function () {
  $(this).find('.icon').removeClass('hover');
  $(this).parent().find('.fukidashi').removeClass('hover');
});

$('.left-section').on('mouseup', '.user', function () {
  $(this).find('.icon').addClass('hover');
  $(this).parent().find('.fukidashi').addClass('hover');
});

/**
 * socket.io
 */

// サーバーの IP アドレスに対して WebSocket 通信を開始するリクエストを送る
const socket = io();

socket.on('start data', () => {
  console.log('start data came');
});

socket.on('some one posts text', (data) => {
  const a = $('#postTemplate').clone().removeAttr('id');
  a.find('.text-comment').text(data.text);
  a.find('.wrapper-img-comment').hide();
  a.appendTo(leftSection).fadeIn();
  leftSection.animate({ scrollTop: 5000000 });
});

socket.on('some one posts stamp', (data) => {
  const a = $('#postTemplate').clone().removeAttr('id');
  a.find('.img-comment').attr('src', data.src);
  a.find('.text-comment').hide();
  a.appendTo(leftSection).fadeIn();
  leftSection.animate({ scrollTop: 5000000 });
});

// eslint-disable-next-line func-names
BtnText.on('click', function () {
  const text = $(this).data('text');
  socket.emit('post my text', { text });

  console.log('post my text: ', text);

  const a = $('#postOwnTemplate').clone().removeAttr('id');
  a.find('.text-comment').text(text);
  a.find('.wrapper-img-comment').hide();
  a.appendTo(leftSection).fadeIn();
  leftSection.animate({ scrollTop: 5000000 });
});

const BtnStamp = $('.btn-stamp');
BtnStamp.on('click', function () {
  const src = $(this).attr('src');
  socket.emit('post my stamp', { src });

  const a = $('#postOwnTemplate').clone().removeAttr('id');
  a.find('.img-comment').attr('src', src);
  a.find('.text-comment').hide();
  a.appendTo(leftSection).fadeIn();
  leftSection.animate({ scrollTop: 5000000 });
});

const imgMenus = $('.img-menus');
const imgSelected = $('.img-selected');
const imgRandom = $('.img-random');
// eslint-disable-next-line func-names
imgMenus.on('click', function () {
  const src = $(this).attr('src');
  socket.emit('post my stamp', { src });

  imgSelected.attr('src', src).show();
  imgRandom.show();

  const a = $('#postOwnTemplate').clone().removeAttr('id');
  a.find('.img-comment').attr('src', src);
  a.find('.text-comment').hide();
  a.appendTo(leftSection).fadeIn();
  leftSection.animate({ scrollTop: 5000000 });
  exerciseTimer();
});
