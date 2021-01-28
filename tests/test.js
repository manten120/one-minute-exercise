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

describe('/main', () => {
  test('未ログインの場合 /#login にリダイレクトされる', () =>
    request(app).get('/main').expect('Location', '/#login').expect(302));
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
