import 'bootstrap';
import $ from 'jquery';

// jQueryをグローバルスコープに適用する
// eslint-disable-next-line no-new-func
const global = Function('return this;')();
global.jQuery = $;

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

let w = 100;
const exerciseTimer = () => {
  setTimeout(() => {
    w -= 100 / 3000; // 100 / 6000
    progressBar.css('width', `${w}%`);

    if (w <= 25) {
      progressBar.removeClass('bg-warning');
      progressBar.addClass('bg-danger');
    } else if (w <= 50) {
      progressBar.addClass('bg-warning');
      imgSelectedExercise.fadeOut(2000);
      textAddition.fadeIn(2000);
    }

    if (w <= 0) {
      setTimeout(() => {
        title.text('おつかれさまでした!');
        imgArea.hide();
        commentBtnArea.show();
      }, 1000);
      setTimeout(() => {
        title.text('このページを自動で閉じます');
        progressGray.css('width', '20%');
        progressBar.css('width', '100%');
      }, 5000);
      return;
    }
    exerciseTimer();
  }, 10);
};

$('.img-menus').on('click', () => {
  exerciseTimer();
});

const messagesArea = $('.left-section');
messagesArea.animate({ scrollTop: 5000000 });
// messagesArea.scrollTop = messagesArea.scrollHeight;
// // messagesArea.scrollTop( $(messagesArea[0].scrollHeight )
