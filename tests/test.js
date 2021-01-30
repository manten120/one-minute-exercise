const request = require('supertest');
const passportStub = require('passport-stub');
const app = require('../app');

describe('/', () => {
  test('Twitterアカウントでログインするためのリンクが含まれる', () =>
    request(app)
      .get('/')
      .expect('Content-Type', 'text/html; charset=utf-8')
      .expect(/<a [^<>]*href="\/login\/twitter">/)
      .expect(200));
});

describe('/login', () => {
  test('簡易ログインするとき、クッキーをセットし/mainへリダイレクトする', () =>
    request
      .agent(app)
      .post('/login')
      .send({ name: 'taro', icon: 'images/icons/hoge.js' })
      .expect(
        'Set-Cookie',
        /mdOneMinEx=j%3A%7B%22name%22%3A%22taro%22%2C%22icon%22%3A%22images%2Ficons%2Fhoge.js%22%7D;/
      )
      .expect('Location', '/main')
      .expect(302));

  test('ログインフォームから送られた名前が0文字のとき/へリダイレクトする', () =>
    request
      .agent(app)
      .post('/login')
      .send({ name: 'tarotarotar', icon: 'images/icons/hoge.js' })
      .expect('Location', '/')
      .expect(302));

  test('ログインフォームから送られた名前が11文字以上のとき/へリダイレクトする', () =>
    request
      .agent(app)
      .post('/login')
      .send({ name: 'tarotarotar', icon: 'images/icons/hoge.js' })
      .expect('Location', '/')
      .expect(302));

  test('ログインフォームから送られたアイコン画像URLが不正なとき/へリダイレクトする', () =>
    request
      .agent(app)
      .post('/login')
      .send({ name: 'tarotarotar', icon: 'himages/icons/hoge.js' })
      .expect('Location', '/')
      .expect(302));
});

describe('/main', () => {
  test('未ログインの場合 /#login にリダイレクトされる', () =>
    request(app).get('/main').expect('Location', '/#login').expect(302));
});

describe('/main', () => {
  // cookieの有効日数
  const cookieExpireDays = 30;
  // ミリ秒単位に換算
  const cookieExpireDaysMs = cookieExpireDays * 24 * 60 * 60 * 1000;
  const d = new Date();
  const expires = new Date(d.setDate(d.getDate() + 30)).toGMTString();
  const cookie = `mdOneMinEx=j%3A%7B%22name%22%3A%22taro%22%2C%22icon%22%3A%22images%2Ficons%2Fhoge.js%22%7D; Max-Age=${
    cookieExpireDaysMs / 1000
  }; Path=/; Expires=${expires}`;

  test('簡易ログインしているときユーザー名が表示される', () =>
    request
      .agent(app)
      .get('/main')
      .set('Cookie', [cookie])
      .send()
      .expect(/taroさん/));
});

describe('/main', () => {
  beforeAll(() => {
    passportStub.install(app);
    passportStub.login({ _json: { name: 'testuser', profile_image_url_https: '' } });
  });

  afterAll(() => {
    passportStub.logout();
    passportStub.uninstall(app);
  });

  test('Twitterアカウントでログインしているときユーザー名が表示される', () =>
    request(app)
      .get('/main')
      .expect(/testuser/)
      .expect(200));

  test('ログアウトするためのリンクが含まれる', () =>
    request(app)
      .get('/main')
      .expect(/<a [^<>]*href="\/logout">/)
      .expect(200));
});

describe('/logout', () => {
  test('/ にリダイレクトされる', () => request(app).get('/logout').expect('Location', '/').expect(302));
});
