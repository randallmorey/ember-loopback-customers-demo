import { moduleFor, test } from 'ember-qunit';

moduleFor('controller:application', 'Unit | Controller | application', {
  // Specify the other units that are required for this test.
  needs: ['service:session']
});

test('it exists', function(assert) {
  assert.expect(1);
  let controller = this.subject();
  assert.ok(controller);
});

test('its `invalidateSession` action calls `invalidate` on the session service', function (assert) {
  assert.expect(1);
  const controller = this.subject({
    session: {
      invalidate() {
        assert.ok(true, 'invalidate method was called');
      }
    }
  });
  controller.send('invalidateSession');
});
