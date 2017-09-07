import { moduleForComponent, test } from 'ember-qunit';
import { run } from '@ember/runloop';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('user/user-form', 'Integration | Component | user/user form', {
  integration: true
});

test('it renders with a new empty user model', function (assert) {
  assert.expect(4);

  this.set('user', {});
  this.render(hbs`{{user/user-form user=user}}`);

  assert.equal(this.$('[name="email"]:visible').length, 1);
  assert.equal(this.$('[name="emailConfirmation"]:visible').length, 1);
  assert.equal(this.$('[name="password"]:visible').length, 1);
  assert.equal(this.$('[name="passwordConfirmation"]:visible').length, 1);
});

test('it renders with a new filled user model', function (assert) {
  assert.expect(4);

  this.set('user', {
    email: 'test@foo.com',
    emailConfirmation: 'test@foo.com',
    password: 'password1234',
    passwordConfirmation: 'password1234'
  });
  this.render(hbs`{{user/user-form user=user}}`);

  assert.equal(this.$('[name="email"]:visible').val(), 'test@foo.com');
  assert.equal(this.$('[name="emailConfirmation"]:visible').val(), 'test@foo.com');
  assert.equal(this.$('[name="password"]:visible').val(), 'password1234');
  assert.equal(this.$('[name="passwordConfirmation"]:visible').val(), 'password1234');
});

test('it updates underlaying instance based on user input', function (assert) {
  assert.expect(4);

  const user = {};
  this.set('user', user);
  this.render(hbs`{{user/user-form user=user}}`);

  run(() => {
    // fill out the form and force an onchange
    this.$('[name="email"]').val('test@foo.com');
    this.$('[name="email"]').change();
    this.$('[name="emailConfirmation"]').val('test@foo.com');
    this.$('[name="emailConfirmation"]').change();
    this.$('[name="password"]').val('this is a simple passphrase');
    this.$('[name="password"]').change();
    this.$('[name="passwordConfirmation"]').val('this is a simple passphrase');
    this.$('[name="passwordConfirmation"]').change();

    // test that changes propogate to underlaying instance
    assert.equal(user.email, 'test@foo.com');
    assert.equal(user.emailConfirmation, 'test@foo.com');
    assert.equal(user.password, 'this is a simple passphrase');
    assert.equal(user.passwordConfirmation, 'this is a simple passphrase');
  });
});

test('it renders validation error messages', function (assert) {
  assert.expect(5);

  const store = this.container.lookup('service:store');

  run(() => {
    const user = store.createRecord('user', {
      email: 'test',
      emailConfirmation: 'example@baz.com',
      password: 'password1234',
      passwordConfirmation: 'passfoo'
    });
    this.set('user', user);
    this.render(hbs`{{user/user-form user=user}}`);
    user.validate();
  });

  run(() => {
    const emailErrors = this.get('user.errors').errorsFor('email');
    const emailConfirmationErrors = this.get('user.errors').errorsFor('emailConfirmation');
    const passwordErrors = this.get('user.errors').errorsFor('password');
    const passwordConfirmationErrors = this.get('user.errors').errorsFor('passwordConfirmation');

    assert.equal(this.$('.is-invalid:visible').length, 4);
    assert.equal(this.$('.form-group:eq(0) .invalid-feedback').text(), emailErrors[0].message);
    assert.equal(this.$('.form-group:eq(1) .invalid-feedback').text(), emailConfirmationErrors[0].message);
    assert.equal(this.$('.form-group:eq(2) .invalid-feedback').text(), passwordErrors[0].message);
    assert.equal(this.$('.form-group:eq(3) .invalid-feedback').text(), passwordConfirmationErrors[0].message);
  });
});

// ===
test('its `submit` action calls `validate` on the user instance', function (assert) {
  assert.expect(1);

  const user = {
    validate() {
      assert.ok(true, 'user.validate() was called');
      return false;
    }
  };

  this.set('user', user);
  this.render(hbs`{{user/user-form user=user}}`);

  this.$('button[type="submit"]').click();
});

test('it doesn\'t trigger the external save action on submit if the user instance is invalid', function (assert) {
  assert.expect(1);

  const user = {
    validate() {
      assert.ok(true, 'user.validate() was called');
      return false;
    }
  };

  this.set('externalSave', () => {
    throw new Error('externalSave method should not be called.');
  });

  this.set('user', user);
  this.render(hbs`{{user/user-form user=user save=(action externalSave)}}`);

  this.$('button[type="submit"]').click();
});

test('it triggers the external save action on submit if the user instance is valid', function (assert) {
  assert.expect(5);

  const store = this.container.lookup('service:store');

  this.set('externalSave', (savedUser) => {
    assert.ok(savedUser);
    assert.equal(savedUser.get('email'), 'test@foo.com');
    assert.equal(savedUser.get('emailConfirmation'), 'test@foo.com');
    assert.equal(savedUser.get('password'), 'this is a simple passphrase');
    assert.equal(savedUser.get('passwordConfirmation'), 'this is a simple passphrase');
  });

  run(() => {
    const user = store.createRecord('user', {});

    this.set('user', user);

    this.render(hbs`{{user/user-form user=user save=(action externalSave)}}`);

    // fill out the form and force an onchange
    this.$('[name="email"]').val('test@foo.com');
    this.$('[name="email"]').change();
    this.$('[name="emailConfirmation"]').val('test@foo.com');
    this.$('[name="emailConfirmation"]').change();
    this.$('[name="password"]').val('this is a simple passphrase');
    this.$('[name="password"]').change();
    this.$('[name="passwordConfirmation"]').val('this is a simple passphrase');
    this.$('[name="passwordConfirmation"]').change();

    // submit form
    this.$('button[type="submit"]').click();
  });
});
