import Mixin from '@ember/object/mixin';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

/**
 * Redirects to the route specified in `authenticationRoute` if the route this
 * mixin is applied to is accessed while unauthenticated.
 *
 * @module
 * @augments ember/object/mixin
 * @augments ember-simple-auth/mixins/authenticated-route-mixin
 */
export default Mixin.create(AuthenticatedRouteMixin, {
  // =attributes

  /**
   * @override
   * @type {String}
   */
  authenticationRoute: 'users/login'
});
