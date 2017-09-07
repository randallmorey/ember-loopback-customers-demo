import Model from 'ember-data/model';
import attr from 'ember-data/attr';

import Validator from 'ember-model-validator/mixins/model-validator';
import strength from 'password-strength';

import { computed } from '@ember/object';

/**
 * A simple, validatable user model.
 *
 * @module
 * @augments ember-data/model
 * @augments ember-model-validator/mixins/model-validator
 */
export default Model.extend(Validator, {
  // =properties

  /**
   * User's email address.
   *
   * @type {?String} */
  email: attr('string'),

  /**
   * User's email address again, for validating email accuracy.
   *
   * @type {?String} */
  emailConfirmation: attr('string'),

  /**
   * User's password.
   *
   * @type {?String} */
  password: attr('string'),

  /**
   * User's password again, for validating password accuracy.
   *
   * @type {?String} */
  passwordConfirmation: attr('string'),

  /**
   * Computed property for password strength report as returned by `zxcvbn`.
   *
   * @type {Object}
   * @readonly
   * @see {@link https://github.com/dropbox/zxcvbn|zxcvbn}
   */
  passwordStrength: computed('email', 'password', function () {
    const { email, password } = this.getProperties('email', 'password');
    if (password) return strength(password, [email]);
  }).readOnly(),

  // =attributes

  /**
   * Validations declarations.
   *
   * @type {Object.<Object>}
   * @see {@link https://www.npmjs.com/package/ember-model-validator|Ember Model Validator}
   */
  validations: {
    email: {
      presence: true,
      email: true
    },
    emailConfirmation: {
      match: {
        attr: 'email'
      }
    },
    password: {
      presence: true,
      custom: {
        // Strength is scored on a scale 0 - 4.
        // Password is valid if score is 2 or greater.
        validation(key, value, user) {
          return (user.get('passwordStrength.score') || 0) > 1;
        },
        // Strength report includes plain-English recommendations for improving
        // passwords.  These recommendations are returned as the validation
        // error message.
        message(key, value, user) {
          if (value) {
            const {
              warning,
              suggestions
            } = user.get('passwordStrength.feedback');
            let message = suggestions.map(s => s)
            if (warning) message.unshift(`${warning}.`);
            return message.join(' ');
          }
        }
      }
    },
    passwordConfirmation: {
      match: {
        attr: 'password'
      }
    }
  }
});
