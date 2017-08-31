# ember-loopback-customers-demo

[![Travis](https://img.shields.io/travis/randallmorey/ember-loopback-customers-demo.svg?style=flat-square)](https://travis-ci.org/randallmorey/ember-loopback-customers-demo)
[![Coveralls](https://img.shields.io/coveralls/randallmorey/ember-loopback-customers-demo.svg?style=flat-square)](https://coveralls.io/github/randallmorey/ember-loopback-customers-demo)
[![CodeClimate](https://img.shields.io/codeclimate/github/randallmorey/ember-loopback-customers-demo.svg?style=flat-square)](https://codeclimate.com/github/randallmorey/ember-loopback-customers-demo)
[![Inline docs](https://inch-ci.org/github/randallmorey/ember-loopback-customers-demo.svg?branch=master&style=flat-square)](http://inch-ci.org/github/randallmorey/ember-loopback-customers-demo)
[![David](https://img.shields.io/david/dev/randallmorey/ember-loopback-customers-demo.svg?style=flat-square)](https://github.com/randallmorey/ember-loopback-customers-demo)
[![Ember 2.14.2](https://img.shields.io/badge/ember-2.14.2-blue.svg?style=flat-square)](https://github.com/ember-cli/ember-cli/tree/v2.14.2)
[![License](https://img.shields.io/npm/l/ember-loopback-customers-demo.svg?style=flat-square)](https://github.com/randallmorey/ember-loopback-customers-demo/blob/master/LICENSE)

A demonstration app with authentication and simple CRUD for customer records, targeting a Loopback backend.


## Prerequisites

You will need the following things properly installed on your computer.

* [Git](https://git-scm.com/)
* [Node.js](https://nodejs.org/) (with NPM)
* [Ember CLI](https://ember-cli.com/)
* [PhantomJS](http://phantomjs.org/)


## Installation

* `git clone https://github.com/randallmorey/ember-loopback-customers-demo.git`
* `cd ember-loopback-customers-demo`
* `npm install`


## Running / Development

* `npm start`
* Visit your app at [http://localhost:4200](http://localhost:4200).


### Code Generators

Make use of the many generators for code, try `ember help generate` for more details


### Running Tests

* `npm test`
* `ember test --server`


### Building

* `ember build` (development)
* `ember build --environment production` (production)


### Deploying

Specify what it takes to deploy your app.


## Contributing

This repository uses [semantic-release-cli][semantic-release-cli] for automated
releases and [commitizen][commitizen] and
[cz-conventional-changelog][cz-conventional-changelog] for standardized commit
messages and changelogs.


### Committing

All work should be committed to a new topic branch created from `develop`, never
to a mainline branch directly.  When ready to commit changes, stage them as
usual with `git add .`.  Commit changes with `npm`, rather than `git`, in order
to ensure standardized commit messages and follow the interactive prompts:

		npm run commit

**Note**:  [watch the overview video of commitizen and the conventional changelog tool][commitizen-video].

[semantic-release-cli]: https://www.npmjs.com/package/semantic-release-cli
[commitizen]: https://www.npmjs.com/package/commitizen
[cz-conventional-changelog]: https://www.npmjs.com/package/cz-conventional-changelog
[commitizen-video]: https://egghead.io/lessons/javascript-how-to-write-a-javascript-library-committing-a-new-feature-with-commitizen


### Pull Requests

When a branch is ready to be merged, submit a pull request to `develop` via
GitHub.  Pull requests are automatically tested with Travis CI and may not be
merged until tests pass.  Once tests have passed and the PR has been reviewed,
a team member may safely merge the PR into `develop`.


### Releasing

Releases are made from the `master` branch automatically.  To initiate a
release, create a PR from `develop` to `master`.  Releases are automated with
`semantic-release`.  An automatic release is tagged and published to npm upon a
successful merge into the `master` branch, after tests pass successfully.
