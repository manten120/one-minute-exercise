import 'bootstrap';
import $ from 'jquery';
import io from 'socket.io-client';
import timer from './timer';

// モーダルウインドウをデフォルトで表示する
$('#modalLong').modal('show');

// チャット最下部にオートスクロール
const leftColumn = $('#left-column');
const autoScroll = () => {
  leftColumn.animate({ scrollTop: 5000000 });
};
autoScroll();

/**
 * 他のユーザーの吹き出しとユーザーアイコンを
 * マウスホバーまたはクリックしたとき
 * 両要素に.hoverクラスを着脱することで
 * アニメーションをつける
 */
$(leftColumn).on(
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

$(leftColumn).on(
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

$(leftColumn).on('mousedown', '.fukidashi:not(.mine)', function () {
  $(this).removeClass('hover');
  $(this).parent().find('.icon:not(.mine)').removeClass('hover');
});
$(leftColumn).on('mouseup', '.fukidashi:not(.mine)', function () {
  $(this).addClass('hover');
  $(this).parent().find('.icon:not(.mine)').addClass('hover');
});

$(leftColumn).on('mousedown', '.user:not(.mine)', function () {
  $(this).find('.icon:not(.mine)').removeClass('hover');
  $(this).find('.name:not(.mine)').removeClass('hover');
  $(this).parent().find('.fukidashi:not(.mine)').removeClass('hover');
});

$(leftColumn).on('mouseup', '.user:not(.mine)', function () {
  $(this).find('.icon:not(.mine)').addClass('hover');
  $(this).find('.name:not(.mine)').addClass('hover');
  $(this).parent().find('.fukidashi:not(.mine)').addClass('hover');
});

/**
 * メンション
 */

let dataSomeone;

// メンション相手の名前を表示する
const setMention = (data) => {
  if (data) {
    $('.at')
      .text(`@${data.name.slice(0, 10)}さん`)
      .addClass('line');
  } else {
    $('.at').text(`@全員`).removeClass('line');
  }
};

$(leftColumn).on('click', '.fukidashi:not(.mine)', function () {
  dataSomeone = $(this).parent().data('someone');
  setMention(dataSomeone);
});

$(leftColumn).on('click', '.user:not(.mine)', function () {
  dataSomeone = $(this).parent().data('someone');
  setMention(dataSomeone);
});

$(document).on('click', (event) => {
  // 他者のアイコンと吹き出し以外をクリックした時
  if (!$(event.target).closest('.fukidashi:not(.mine)').length && !$(event.target).closest('.user:not(.mine)').length) {
    dataSomeone = undefined;
    setMention(dataSomeone);
  }
});

/**
 * socket.io
 */

// サーバーの IP アドレスに対して WebSocket 通信を開始するリクエストを送る
const socket = io();

if ($('#modalLong').length) {
  const randomMenus = $('#modalLong').data('random-menus');
  socket.emit('call npc on loading main page', { randomMenus });
}

const myData = $('body').data('mine');

const BtnText = $('.btn-text');
// eslint-disable-next-line func-names
BtnText.on('click', function () {
  const key = $(this).data('key');
  const emitData = {
    to: '',
    from: myData,
    key,
  };
  if (dataSomeone) {
    emitData.to = dataSomeone;
  }
  socket.emit('post my text', emitData);
  socket.emit('call npc', { from: myData, type: 'text', key });

  const text = $(this).text();
  const myTemplate = $('#myPostTemplate').clone().removeAttr('id');
  myTemplate.find('.text-comment').text(text).show();
  if (dataSomeone) {
    myTemplate.find('.mention-comment').text(`${dataSomeone.name}さん`).show();
  }
  myTemplate.appendTo(leftColumn).fadeIn();
  autoScroll();
});

const BtnStamp = $('.btn-stamp');
BtnStamp.on('click', function () {
  const key = $(this).data('key');
  const emitData = {
    to: '',
    from: myData,
    key,
  };
  if (dataSomeone) {
    emitData.to = dataSomeone;
  }
  socket.emit('post my stamp', emitData);
  socket.emit('call npc', { from: myData, type: 'stamp', key });

  const src = $(this).attr('src');
  const myTemplate = $('#myPostTemplate').clone().removeAttr('id');
  if (dataSomeone) {
    myTemplate.find('.mention-comment').text(`${dataSomeone.name}さん`).show();
  }
  myTemplate.find('.img-comment').attr('src', src);
  myTemplate.find('.wrapper-img-comment').show();
  myTemplate.appendTo(leftColumn).fadeIn();
  autoScroll();
});

const imgMenus = $('.img-menus');
const imgSelected = $('.img-selected');
const imgRandom = $('.img-random');

// eslint-disable-next-line func-names
imgMenus.on('click', function () {
  const key = $(this).data('key');
  const emitData = {
    to: '',
    from: myData,
    key,
  };
  socket.emit('post my menu', emitData);

  const src = $(this).attr('src');
  const myTemplate = $('#myPostTemplate').clone().removeAttr('id');
  myTemplate.find('.img-comment').attr('src', src).show();
  myTemplate.find('.wrapper-img-comment').show();
  myTemplate.appendTo(leftColumn).fadeIn();
  autoScroll();

  imgSelected.attr('src', src).show();

  const randomMenus = $('#modalLong').data('random-menus');
  let randomKey;
  do {
    randomKey = randomMenus[Math.floor(Math.random() * randomMenus.length)].key;
  } while (randomKey === key);
  const srcOfImgRandom = randomMenus.find((element) => element.key === randomKey).src;
  imgRandom.attr('src', srcOfImgRandom);

  timer();
});

socket.on('someone posts menu', (data) => {
  const template = $('#postTemplate').clone().removeAttr('id').data('someone', data.from);
  template.find('.icon').attr('src', data.from.icon);
  template.find('.name').text(data.from.name);
  template.find('.img-comment').attr('src', data.src);
  template.find('.wrapper-img-comment').show();
  template.appendTo(leftColumn).fadeIn();
  autoScroll();
});

socket.on('someone posts stamp', (data) => {
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
  template.appendTo(leftColumn).fadeIn();
  autoScroll();
});

socket.on('someone posts text', (data) => {
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
  template.find('.text-comment').text(data.text).show();
  template.appendTo(leftColumn).fadeIn();
  autoScroll();
});

/**
 * タブエリア
 */
const rightColum = $('#right-column');
const notice = $('#notice');

rightColum.on('scroll', function () {
  const scroll = $(this).scrollTop();
  if (scroll < 40) {
    notice.removeClass('scrolled');
  } else {
    notice.addClass('scrolled');
  }
});

// タブクリック時のアニメーション
$('.nav-link').on('click', () => {
  if (rightColum.scrollTop() >= 57) {
    rightColum.animate({ scrollTop: 57 }, 300);
  }
});
