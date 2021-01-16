import 'bootstrap';
import $ from 'jquery';
import io from 'socket.io-client';

// モーダルをデフォルトで表示する
$('#modalLong').modal('show');

const myData = $('body').data('mine');
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
      $(this).find('.icon:not(.mine)').addClass('hover');
      $(this).find('.name:not(.mine)').addClass('hover');
      $(this).parent().find('.fukidashi:not(.mine)').addClass('hover');
    },
    mouseleave() {
      $(this).find('.icon:not(.mine)').removeClass('hover');
      $(this).find('.name:not(.mine)').removeClass('hover');
      $(this).parent().find('.fukidashi:not(.mine)').removeClass('hover');
    },
  },
  '.user:not(.mine)'
);

$('.left-section').on(
  {
    mouseenter() {
      $(this).addClass('hover');
      $(this).parent().find('.icon:not(.mine)').addClass('hover');
      $(this).parent().find('.name:not(.mine)').addClass('hover');
    },
    mouseleave() {
      $(this).removeClass('hover');
      $(this).parent().find('.icon:not(.mine)').removeClass('hover');
      $(this).parent().find('.name:not(.mine)').removeClass('hover');
    },
  },
  '.fukidashi:not(.mine)'
);

$('.left-section').on('mousedown', '.fukidashi:not(.mine)', function () {
  $(this).removeClass('hover');
  $(this).parent().find('.icon:not(.mine)').removeClass('hover');
});
$('.left-section').on('mouseup', '.fukidashi:not(.mine)', function () {
  $(this).addClass('hover');
  $(this).parent().find('.icon:not(.mine)').addClass('hover');
});

$('.left-section').on('mousedown', '.user:not(.mine)', function () {
  $(this).find('.icon:not(.mine)').removeClass('hover');
  $(this).find('.name:not(.mine)').removeClass('hover');
  $(this).parent().find('.fukidashi:not(.mine)').removeClass('hover');
});

$('.left-section').on('mouseup', '.user:not(.mine)', function () {
  $(this).find('.icon:not(.mine)').addClass('hover');
  $(this).find('.name:not(.mine)').addClass('hover');
  $(this).parent().find('.fukidashi:not(.mine)').addClass('hover');
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

$('.left-section').on('click', '.fukidashi:not(.mine)', function () {
  dataSomeone = $(this).parent().data('someone');
  setMention(dataSomeone);
});

$('.left-section').on('click', '.user:not(.mine)', function () {
  dataSomeone = $(this).parent().data('someone');
  setMention(dataSomeone);
});

$(document).on('click', (event) => {
  if (!$(event.target).closest('.fukidashi:not(.mine)').length && !$(event.target).closest('.user:not(.mine)').length) {
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
  const template = $('#postTemplate').clone().removeAttr('id').data('someone', data.from);
  if (data.to) {
    template.find('.mention-comment').text(`${data.to.name}さん`);
    template.find('.mention-comment').show();

    if (data.to.name === myData.name) {
      template.find('.mention-comment').addClass('me');
    }
  }
  template.find('.icon').attr('src', data.from.icon);
  template.find('.name').text(data.from.name);
  template.find('.text-comment').text(data.text);
  template.find('.text-comment').show();
  template.appendTo(leftSection).fadeIn();
  leftSection.animate({ scrollTop: 5000000 });
});

socket.on('some one posts stamp', (data) => {
  const template = $('#postTemplate').clone().removeAttr('id').data('someone', data.from);
  if (data.to) {
    template.find('.mention-comment').text(`${data.to.name}さん`);
    template.find('.mention-comment').show();

    if (data.to.name === myData.name) {
      template.find('.mention-comment').addClass('me');
    }
  }
  template.find('.icon').attr('src', data.from.icon);
  template.find('.name').text(data.from.name);
  template.find('.img-comment').attr('src', data.src);
  template.find('.wrapper-img-comment').show();
  template.appendTo(leftSection).fadeIn();
  leftSection.animate({ scrollTop: 5000000 });
});

// eslint-disable-next-line func-names
BtnText.on('click', function () {
  const text = $(this).data('text');

  const emitData = {
    to: '',
    from: myData,
    text,
  };

  if (dataSomeone) {
    emitData.to = dataSomeone;
  }

  socket.emit('post my text', emitData);

  const myTemplate = $('#myPostTemplate').clone().removeAttr('id');
  myTemplate.find('.text-comment').text(text).show();

  if (dataSomeone) {
    myTemplate.find('.mention-comment').text(`${dataSomeone.name}さん`).show();
  }

  myTemplate.appendTo(leftSection).fadeIn();
  leftSection.animate({ scrollTop: 5000000 });

  removeMention();
});

const BtnStamp = $('.btn-stamp');
BtnStamp.on('click', function () {
  const src = $(this).attr('src');

  const emitData = {
    to: '',
    from: myData,
    src,
  };

  if (dataSomeone) {
    emitData.to = dataSomeone;
  }

  socket.emit('post my stamp', emitData);

  const myTemplate = $('#myPostTemplate').clone().removeAttr('id');

  if (dataSomeone) {
    myTemplate.find('.mention-comment').text(`${dataSomeone.name}さん`).show();
  }

  myTemplate.find('.img-comment').attr('src', src);
  myTemplate.find('.wrapper-img-comment').show();
  myTemplate.appendTo(leftSection).fadeIn();
  leftSection.animate({ scrollTop: 5000000 });

  removeMention();
});

const imgMenus = $('.img-menus');
const imgSelected = $('.img-selected');
const imgRandom = $('.img-random');
// eslint-disable-next-line func-names
imgMenus.on('click', function () {
  const src = $(this).attr('src');

  const emitData = {
    to: '',
    from: myData,
    src,
  };
  socket.emit('post my stamp', emitData);

  imgSelected.attr('src', src).show();
  imgRandom.show();

  const myTemplate = $('#myPostTemplate').clone().removeAttr('id');
  myTemplate.find('.img-comment').attr('src', src).show();
  myTemplate.find('.wrapper-img-comment').show();
  myTemplate.appendTo(leftSection).fadeIn();
  leftSection.animate({ scrollTop: 5000000 });
  exerciseTimer();
});
