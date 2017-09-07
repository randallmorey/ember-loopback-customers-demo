import Ember from 'ember';
import Controller from '@ember/controller';

const { inject: { service } } = Ember;

/**
 * The login controller handles the `loginUser` action by delegating to
 * the session service authenticate method.
 *
 * @module
 * @augments ember/controller
 */
export default Controller.extend({
  // =dependencies

  /**
   * @see module:ember-simple-auth-loopback/services/session
   * @type {Object}
   */
  session: service(),

  // =actions

  /** @type {Object} */
  actions: {
    /**
     * Authenticates via the session service using credentials from the
     * passed user instance.
     * If authentication fails, an error is added to the user instance's
     * base field.
     *
     * @function actions:loginUser
     * @param {module:app/user/model} user
     * @returns {undefined}
     */
    loginUser(user) {
      this.get('session').authenticate('authenticator:application', user);
    }
  }
});
