import Component from '@ember/component';

/**
 * A simple user form component with fields for {@link module:app/user/model|User}.
 *
 * @module
 * @augments ember/Component
 * @example
 *  {{user/user-form user=model save=(action externalSave)}}
 */
export default Component.extend({
  // =actions

  /** @type {Object} */
  actions: {
    /**
     * Trigger a bound `save` method when the form is submitted *if* the user
     * instance is valid, passing the form's user instance.
     *
     * @function actions:submit
     * @returns {undefined}
     */
    submit() {
      const user = this.get('user');
      if (user.validate()) this.get('save')(user);
    }
  }
});
