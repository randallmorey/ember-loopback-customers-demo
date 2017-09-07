import Router from '@ember/routing/router';
import config from './config/environment';

/**
 * The Ember router.
 *
 * @module
 * @augments ember/Router
 */
export default Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
}).map(function () {
  this.route('users/new');
  this.route('users/login');
});
