import config from '../config/environment';
import { Response } from 'ember-cli-mirage';

export default function() {
  this.urlPrefix = config.api.host;    // make this `http://localhost:8080`, for example, if your API is on a different server
  this.namespace = config.api.namespace;    // make this `/api`, for example, if your API is namespaced
  this.timing = 100;      // delay for each request, automatically set to 0 during testing

  // https://github.com/kategengler/ember-cli-code-coverage
  this.passthrough('/write-coverage');

  // http://www.ember-cli-mirage.com/docs/v0.3.x/shorthands/
  this.post('/users');
  this.post('/users/login', (schema, request) => {
    const credentials = JSON.parse(request.requestBody);
    const user = schema.users.findBy(credentials);
    if (user) {
      return new Response(200, {
        id: 'token-id-string',
        ttl: 1209600,
        created: '2000-01-01T00:00:00.000Z',
        userId: user.id
      });
    } else {
      return new Response(401, {
        errors: [{
          status: 401,
          source: '',
          title: 'Error',
          code: 'LOGIN_FAILED',
          detail: 'login failed'
        }]
      });
    }
  });
}
