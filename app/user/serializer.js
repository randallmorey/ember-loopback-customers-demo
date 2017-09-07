import JSONAPISerializer from 'ember-data/serializers/json-api'

/**
 * The {@link module:app/user/model|User} serializer is configured to omit
 * -`Confirmation` fields from serialized payloads, as these should not be sent
 * in API requests.
 *
 * @module
 * @augments ember-data/serializers/json-api
 */
export default JSONAPISerializer.extend({
  // =attributes

  /** @type {Object} */
  attrs: {
    /** Omit field from serialized payload. @type {Object} */
    emailConfirmation: { serialize: false },
    /** Omit field from serialized payload. @type {Object} */
    passwordConfirmation: { serialize: false }
  },

  // =methods

  /**
   * Sets `password` and `passwordConfirmation` to null in response hash
   * to ensure the model has these fields nulled after saving.
   * Also nulls `emailConfirmation` for good measure, since this is no longer
   * useful after save.
   *
   * @override
   * @function
   * @returns {Object}
   */
  normalize(typeClass, hash) {
    hash.attributes.password = null;
    hash.attributes.passwordConfirmation = null;
    hash.attributes.emailConfirmation = null;
    return this._super(typeClass, hash);
  }
});
