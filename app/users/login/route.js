import Route from '@ember/routing/route';
import UnauthenticatedRouteMixin from 'ember-simple-auth/mixins/unauthenticated-route-mixin';

/**
 * The login route displays the user login form.
 *
 * @module
 * @augments ember/routing/route
 * @augments ember-simple-auth/mixins/unauthenticated-route-mixin
 */
export default Route.extend(UnauthenticatedRouteMixin, {
  // =methods

  /**
   * This route generates a new, disposable user instance.
   *
   * @override
   * @function
   * @returns {module:app/user/model}
   */
  model() {
    return this.store.createRecord('user');
  },

  // =actions

  actions: {
    /**
     * Rollsback and removes the route's user model if it `isNew`.
     *
     * @function actions:willTransition
     * @returns {undefined}
     */
    willTransition() {
      const model = this.modelFor('users/login');
      // `rollbackAttributes` on a model that `isNew` both reverts all
      // attributes to their defaults and causes the record to be removed
      // from the store.
      // Thus, this is a good way to clean up new unsaved records that we
      // want to get rid of.
      model.rollbackAttributes();
    }
  }
});
