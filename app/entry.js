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
const tabsArea = $('#tabs-area');
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
        tabsArea.show();
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

/**
 * 他のユーザーの吹き出しとユーザーアイコンを
 * マウスホバーまたはクリックしたとき
 * 両要素に.hoverクラスを着脱することで
 * アニメーションをつける
 */
$('.left-section').on(
  {
    mouseenter() {
      $(this).find('.icon:not(.own)').addClass('hover');
      $(this).parent().find('.fukidashi:not(.own)').addClass('hover');
    },
    mouseleave() {
      $(this).find('.icon:not(.own)').removeClass('hover');
      $(this).parent().find('.fukidashi:not(.own)').removeClass('hover');
    },
  },
  '.user'
);

$('.left-section').on(
  {
    mouseenter() {
      $(this).addClass('hover');
      $(this).parent().find('.icon:not(.own)').addClass('hover');
    },
    mouseleave() {
      $(this).removeClass('hover');
      $(this).parent().find('.icon:not(.own)').removeClass('hover');
    },
  },
  '.fukidashi:not(.own)'
);

$('.left-section').on('mousedown', '.fukidashi:not(.own)', function () {
  $(this).removeClass('hover');
  $(this).parent().find('.icon:not(.own)').removeClass('hover');
});
$('.left-section').on('mouseup', '.fukidashi:not(.own)', function () {
  $(this).addClass('hover');
  $(this).parent().find('.icon:not(.own)').addClass('hover');
});

$('.left-section').on('mousedown', '.user:not(.own)', function () {
  $(this).find('.icon:not(.own)').removeClass('hover');
  $(this).parent().find('.fukidashi:not(.own)').removeClass('hover');
});

$('.left-section').on('mouseup', '.user:not(.own)', function () {
  $(this).find('.icon:not(.own)').addClass('hover');
  $(this).parent().find('.fukidashi:not(.own)').addClass('hover');
});

/**
 * reply
 */
let dataSomeone;

const removeMention = () => {
  dataSomeone = undefined;
  $('.at').text(`@全員`);
};

const setMention = (data) => {
  $('.at').text(`@${data.name}さん`);
};

$('.left-section').on('click', '.fukidashi:not(.own)', function () {
  dataSomeone = $(this).parent().data('someone');
  setMention(dataSomeone);
});

$('.left-section').on('click', '.user:not(.own)', function () {
  dataSomeone = $(this).parent().data('someone');
  setMention(dataSomeone);
});

$(document).on('click', (event) => {
  if (!$(event.target).closest('.fukidashi:not(.own)').length && !$(event.target).closest('.user:not(.own)').length) {
    removeMention();
  }
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
  /**
   * data = {
   *   mention: '返信相手の名前または空文字列',
   *   text: '返信内容のテキスト'
   * }
   */
  const a = $('#postTemplate').clone().removeAttr('id');
  if (data.mention) {
    a.find('.mention-comment').text(`${data.mention}さん`);
    a.find('.mention-comment').show();
  }
  a.find('.text-comment').text(data.text);
  a.find('.text-comment').show();
  a.appendTo(leftSection).fadeIn();
  leftSection.animate({ scrollTop: 5000000 });
});

socket.on('some one posts stamp', (data) => {
  /**
   * data = {
   *   mention: '返信相手の名前または空文字列',
   *   src: 'スタンプ画像のurl'
   * }
   */
  const a = $('#postTemplate').clone().removeAttr('id');
  if (data.mention) {
    a.find('.mention-comment').text(`${data.mention}さん`);
    a.find('.mention-comment').show();
  }
  a.find('.img-comment').attr('src', data.src);
  a.find('.wrapper-img-comment').show();
  a.appendTo(leftSection).fadeIn();
  leftSection.animate({ scrollTop: 5000000 });
});

// eslint-disable-next-line func-names
BtnText.on('click', function () {
  const text = $(this).data('text');

  const emitData = {
    to: '',
    from: '',
    text,
  };

  if (dataSomeone) {
    console.log(dataSomeone.name);
    emitData.to = dataSomeone;
    emitData.from = 'myid';
  }

  socket.emit('post my text', emitData);

  const a = $('#postOwnTemplate').clone().removeAttr('id');
  a.find('.text-comment').text(text).show();

  if (dataSomeone) {
    a.find('.mention-comment').text(`${dataSomeone.name}さん`).show();
  }

  a.appendTo(leftSection).fadeIn();
  leftSection.animate({ scrollTop: 5000000 });

  removeMention();
});

const BtnStamp = $('.btn-stamp');
BtnStamp.on('click', function () {
  const src = $(this).attr('src');

  const emitData = {
    to: '',
    from: '',
    src,
  };

  if (dataSomeone) {
    emitData.to = dataSomeone;
    emitData.from = 'myid';
  }

  socket.emit('post my stamp', emitData);

  const a = $('#postOwnTemplate').clone().removeAttr('id');

  if (dataSomeone) {
    a.find('.mention-comment').text(`${dataSomeone.name}さん`).show();
  }

  a.find('.img-comment').attr('src', src);
  a.find('.wrapper-img-comment').show();
  a.appendTo(leftSection).fadeIn();
  leftSection.animate({ scrollTop: 5000000 });

  removeMention();
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
  a.find('.img-comment').attr('src', src).show();
  a.find('.wrapper-img-comment').show();
  a.appendTo(leftSection).fadeIn();
  leftSection.animate({ scrollTop: 5000000 });
  exerciseTimer();
});
