import { moduleFor, test } from 'ember-qunit';
import { run } from '@ember/runloop';

moduleFor('route:users/new', 'Unit | Route | users/new', {
  // Specify the other units that are required for this test.
  needs: ['model:user', 'service:session']
});

test('it exists', function (assert) {
  assert.expect(1);
  let route = this.subject();
  assert.ok(route);
});

test('it generates a new user instance', function (assert) {
  assert.expect(2);
  let route = this.subject();
  run(() => {
    const model = route.model();
    assert.ok(model);
    assert.equal(model.constructor.modelName, 'user');
  });
});

test('it should call rollbackAttributes on a new model on transition', function (assert) {
  assert.expect(1);
  let route = this.subject({
    modelFor: function () {
      return {
        isNew: true,
        rollbackAttributes() {
          assert.ok(true, 'should call rollbackAttributes on a new model');
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

test('it should not call rollbackAttributes on a non-new model on transition', function (assert) {
  assert.expect(0);
  let route = this.subject({
    modelFor: function () {
      return {
        isNew: false,
        rollbackAttributes() {
          throw new Error('should not call rollbackAttributes');
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
