import { test } from 'qunit';
import moduleForAcceptance from 'ember-loopback-customers-demo/tests/helpers/module-for-acceptance';
import { authenticateSession } from 'ember-loopback-customers-demo/tests/helpers/ember-simple-auth';

moduleForAcceptance('Acceptance | users/login');

test('visiting /users/login', function(assert) {
  visit('/users/login');
  andThen(function() {
    assert.equal(currentURL(), '/users/login');
  });
});

test('navigating to /users/login', function (assert) {
  visit('/');
  click('[href="/users/login"]');
  andThen(function () {
    assert.equal(currentURL(), '/users/login');
  });
});

test('navigating to /users/login redirects to root / when authenticated', function (assert) {
  authenticateSession(this.application);
  visit('/users/login');
  andThen(function () {
    assert.equal(currentURL(), '/');
  });
});
/*
test('viewing authentication errors', function (assert) {
  const done = assert.async();

  // TODO
  // https://github.com/emberjs/ember.js/issues/12791
  // This test always fails because the test system does not allow errors to
  // occur, even if they're expected.
  const adapterException = Ember.Test.adapter.exception;
  Ember.Test.adapter.exception = () => null;

  visit('/users/login');
  fillIn('[name="email"]', 'test@foo.com');
  fillIn('[name="password"]', 'this password is good enough');
  click('button[type="submit"]');
  andThen(function () {
    setTimeout(function () {
      assert.equal(server.schema.users.all().length, 0);
      assert.equal(find('.form-group.has-danger:visible').length, 1);
      assert.equal(find('.form-group:last .form-control-feedback').text(), 'login failed');
      assert.equal(currentURL(), '/users/login');
      done();
      Ember.Test.adapter.exception = adapterException;
    }, 500);
  });
});
*/
test('authenticating succesfully and redirecting to root /', function (assert) {
  const done = assert.async();
  const user = server.create('user', {
    email: 'test@foo.com',
    password: 'this password is good enough'
  });
  visit('/users/login');
  fillIn('[name="email"]', user.email);
  fillIn('[name="password"]', user.password);
  click('button[type="submit"]');
  andThen(function () {
    setTimeout(function () {
      assert.equal(currentURL(), '/');
      done();
    }, 500);
  });
});
