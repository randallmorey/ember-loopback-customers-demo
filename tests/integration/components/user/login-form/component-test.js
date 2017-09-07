import { moduleForComponent, test } from 'ember-qunit';
import { run } from '@ember/runloop';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('user/login-form', 'Integration | Component | user/login form', {
  integration: true
});

test('it renders with a new empty user model', function (assert) {
  assert.expect(2);
  this.set('user', {});
  this.render(hbs`{{user/login-form user=user}}`);
  assert.equal(this.$('[name="email"]:visible').length, 1);
  assert.equal(this.$('[name="password"]:visible').length, 1);
});

test('it renders with a new filled user model', function (assert) {
  assert.expect(2);
  this.set('user', {
    email: 'test@foo.com',
    password: 'password1234'
  });
  this.render(hbs`{{user/login-form user=user}}`);
  assert.equal(this.$('[name="email"]:visible').val(), 'test@foo.com');
  assert.equal(this.$('[name="password"]:visible').val(), 'password1234');
});

test('it updates underlaying instance based on user input', function (assert) {
  assert.expect(2);
  const user = {};
  this.set('user', user);
  this.render(hbs`{{user/login-form user=user}}`);
  run(() => {
    // fill out the form and force an onchange
    this.$('[name="email"]:visible')
      .val('test@foo.com')
      .change();
    this.$('[name="password"]:visible')
      .val('this is a simple passphrase')
      .change();
  });
  run(() => {
    // test that changes propogate to underlaying instance
    assert.equal(user.email, 'test@foo.com');
    assert.equal(user.password, 'this is a simple passphrase');
  });
});

test('it renders validation error messages', function (assert) {
  assert.expect(3);
  const store = this.container.lookup('service:store');
  run(() => {
    const user = store.createRecord('user', {
      email: 'test',
      password: 'password1234'
    });
    this.set('user', user);
    this.render(hbs`{{user/login-form user=user}}`);
    user.validate();
  });
  run(() => {
    const emailErrors = this.get('user.errors').errorsFor('email');
    const passwordErrors = this.get('user.errors').errorsFor('password');
    assert.equal(this.$('.invalid-feedback:visible').length, 2);
    assert.equal(this.$('.form-group:eq(0) .invalid-feedback').text(), emailErrors[0].message);
    assert.equal(this.$('.form-group:eq(1) .invalid-feedback').text(), passwordErrors[0].message);
  });
});

test('its `submit` action calls `validate` on the user instance', function (assert) {
  assert.expect(1);
  const user = {
    validate() {
      assert.ok(true, 'user.validate() was called');
      return false;
    }
  };
  this.set('user', user);
  this.render(hbs`{{user/login-form user=user}}`);
  // submit form
  this.$('button[type="submit"]').click();
});

test('it triggers the external login action on submit if the user instance is valid', function (assert) {
  assert.expect(3);
  const store = this.container.lookup('service:store');
  this.set('externalLogin', (loginUser) => {
    assert.ok(loginUser);
    assert.equal(loginUser.get('email'), 'test@foo.com');
    assert.equal(loginUser.get('password'), 'this is a simple passphrase');
  });
  run(() => {
    const user = store.createRecord('user', {});
    this.set('user', user);
    this.render(hbs`{{user/login-form user=user login=(action externalLogin)}}`);
    // fill out the form and force an onchange
    this.$('[name="email"]')
      .val('test@foo.com')
      .change();
    this.$('[name="password"]')
      .val('this is a simple passphrase')
      .change();
    // submit form
    this.$('button[type="submit"]').click();
  });
});

test('it renders base error message', function (assert) {
  assert.expect(2);
  const store = this.container.lookup('service:store');
  run(() => {
    const user = store.createRecord('user', {
      email: 'test@foo.com',
      password: 'this is a simple passphrase'
    });
    this.set('user', user);
    user.pushErrors({
      base: ['Login failed.']
    });
  });
  run(() => {
    this.render(hbs`{{user/login-form user=user}}`);
    const baseErrors = this.get('user.errors').errorsFor('base');
    assert.equal(this.$('.text-danger:visible').length, 1);
    assert.equal(this.$('.text-danger:visible').text(), baseErrors[0].message);
  });
});
