import 'bootstrap';
import $ from 'jquery';

// jQueryをグローバルスコープに適用する
// eslint-disable-next-line no-new-func
const global = Function('return this;')();
global.jQuery = $;
