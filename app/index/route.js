import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from 'ember-loopback-customers-demo/mixins/authenticated-route-mixin';

/**
 * Index route
 *
 * @module
 * @augments ember/routing/route
 * @augments ember-loopback-customers-demo/mixins/authenticated-route-mixin
 */
export default Route.extend(AuthenticatedRouteMixin);
