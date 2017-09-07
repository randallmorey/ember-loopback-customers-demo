import { moduleFor, test } from 'ember-qunit';
import { run } from '@ember/runloop';

moduleFor('route:users/login', 'Unit | Route | users/login', {
  // Specify the other units that are required for this test.
  needs: ['model:user', 'service:session']
});

test('it exists', function (assert) {
  assert.expect(1);
  const route = this.subject();
  assert.ok(route);
});

test('it generates a new user instance', function (assert) {
  assert.expect(2);
  const route = this.subject();
  run(() => {
    const model = route.model();
    assert.ok(model);
    assert.equal(model.constructor.modelName, 'user');
  });
});

test('it should call rollbackAttributes on the model on transition', function (assert) {
  assert.expect(1);
  const route = this.subject({
    modelFor: function () {
      return {
        rollbackAttributes() {
          assert.ok(true, 'should call rollbackAttributes on the model');
        },
        // placeholder for Ember.Object.get
        get(name) {
          return this[name];
        }
      };
    }
  });
  route.actions.willTransition.call(route);
});
