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

// dataSomeone = { name: "メンション相手の名前", icon: "メンション相手のアイコンのパス" }
// メンションしないとき dataSomeone = undefined
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
  // 他人のアイコンと吹き出し以外をクリックした時
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

// mainページにアクセスしたとき
if ($('#modalLong').length) {
  // socket.io イベント送信
  const randomMenus = $('#modalLong').data('random-menus');
  socket.emit('call npc on loading main page', { randomMenus });
}

// myData = { name: "自分の名前", icon: "自分のアイコンのパス" }
const myData = $('body').data('mine');

const BtnText = $('.btn-text');
// eslint-disable-next-line func-names
BtnText.on('click', function () {
  // socket.io イベント送信
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

  // 自分の投稿を表示
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
  // socket.io イベント送信
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

  // 自分の投稿を表示
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
  // socket.io イベント送信
  const key = $(this).data('key');
  const emitData = {
    to: '',
    from: myData,
    key,
  };
  socket.emit('post my menu', emitData);

  // 自分の投稿を表示
  const src = $(this).attr('src');
  const myTemplate = $('#myPostTemplate').clone().removeAttr('id');
  myTemplate.find('.img-comment').attr('src', src).show();
  myTemplate.find('.wrapper-img-comment').show();
  myTemplate.appendTo(leftColumn).fadeIn();
  autoScroll();

  // 選択したエクササイズを右カラムに表示
  imgSelected.attr('src', src).show();

  // 時間が余ったとき用のエクササイズをランダムに決定
  const randomMenus = $('#modalLong').data('random-menus');
  let randomKey;
  do {
    randomKey = randomMenus[Math.floor(Math.random() * randomMenus.length)].key;
  } while (randomKey === key);
  const srcOfImgRandom = randomMenus.find((element) => element.key === randomKey).src;
  imgRandom.attr('src', srcOfImgRandom);

  // プログレスバー(タイマーの残り時間を表す)を最大値まで伸ばす
  $('.progress-bar').css('width', '100%');

  // プログレスバーが伸びきってからタイマーを開始
  setTimeout(() => {
    timer();
  }, 1000);
});

socket.on('someone posts menu', (data) => {
  // 他人の投稿を表示
  const template = $('#postTemplate').clone().removeAttr('id').data('someone', data.from);
  template.find('.icon').attr('src', data.from.icon);
  template.find('.name').text(data.from.name);
  template.find('.img-comment').attr('src', data.src);
  template.find('.wrapper-img-comment').show();
  template.appendTo(leftColumn).fadeIn();
  autoScroll();
});

socket.on('someone posts stamp', (data) => {
  // 他人の投稿を表示
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
  // 他人の投稿を表示
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

// タブをクリックしたときのアニメーション
$('.nav-link').on('click', () => {
  if (rightColum.scrollTop() >= 57) {
    rightColum.animate({ scrollTop: 57 }, 300);
  }
});
