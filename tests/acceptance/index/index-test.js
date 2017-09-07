import { test } from 'qunit';
import moduleForAcceptance from 'ember-loopback-customers-demo/tests/helpers/module-for-acceptance';
import { authenticateSession } from 'ember-loopback-customers-demo/tests/helpers/ember-simple-auth';

moduleForAcceptance('Acceptance | index');

test('visiting / when authenticated', function(assert) {
  assert.expect(1);
  authenticateSession(this.application);
  visit('/');
  andThen(function () {
    assert.equal(currentURL(), '/');
  });
});

test('user is redirected from / to /users/login when unauthenticated', function(assert) {
  assert.expect(1);
  visit('/');
  andThen(function () {
    assert.equal(currentURL(), '/users/login');
  });
});

test('/users/new link is present when unauthenticated', function (assert) {
  visit('/');
  andThen(function () {
    assert.equal(find('[href="/users/new"]').length, 1);
  });
});

test('/users/new link is not present when authenticated', function (assert) {
  visit('/');
  authenticateSession(this.application);
  andThen(function () {
    assert.equal(find('[href="/users/new"]').length, 0);
  });
});

test('users/authenticate link is present when unauthenticated', function (assert) {
  visit('/');
  andThen(function () {
    assert.equal(find('[href="/users/login"]').length, 1);
  });
});

test('users/authenticate link is not present when authenticated', function (assert) {
  visit('/');
  authenticateSession(this.application);
  andThen(function () {
    assert.equal(find('[href="/users/login"]').length, 0);
  });
});

test('session invalidation link is not present when unauthenticated', function (assert) {
  visit('/');
  andThen(function () {
    assert.equal(find('.invalidate-session').length, 0);
  });
});

test('session invalidation link is present when authenticated', function (assert) {
  visit('/');
  authenticateSession(this.application);
  andThen(function () {
    assert.equal(find('.invalidate-session').length, 1);
  });
});

test('user is redirected to / after invalidating the session', function (assert) {
  authenticateSession(this.application);
  visit('/');
  click('.invalidate-session');
  andThen(function () {
    assert.equal(currentURL(), '/');
  });
});
