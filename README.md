## Vicci

Vicci is a rough project meant to demonstrate TypeScript, React, Jest, Testing Library (React), and TestCafe.

## Installation

Make sure that you have [Node](https://nodejs.org/en/) installed. If you would like to take some of the installation process out, you can install Nodejs with [Chocolatey](https://chocolatey.org/install)

**Chocolatey**
```sh
choco install nodejs -y
```

Check your install with 

```sh
node --version && npm --version
# Should output something like
# v16.2.0
# 6.14.10
```

I personally use [Pnpm](https://pnpm.io/installation) over NPM for reasons. If you don't care, you can use NPM and that would be fine, however whenever you run a command you would need to change `pnpm [command]` to `npm run [command]` if it is a package-defined script.

## Running Locally

You should be able to run the entire thing with just 

```sh
pnpm dev
```

## Running Unit Tests

Tests are run with Jest, and are setup in the [jest.config.js](./jest.config.js) file, with a setup file in [setup.ts](./src/test/setup.ts)

These tests use a library called `@testing-library/react`, which has a smilar interface for multiple libraries/frameworks such as Vue, React, and Svelte. You can find more documentation about how to use Testing Library [here](https://testing-library.com/docs/react-testing-library/intro/).

Unit tests are meant to test the components themselves; each individual component file should have corresponding unit tests that validate the essential behaviors of the component, and if possible test edge cases we would expect to behave in certain ways.

To run the unit tests use

```sh
pnpm test # or "npm run test" - no quotes
```

## Running Integration Tests

Our integration tests are run with [TestCafe](https://testcafe.io/), which tests how the components function in the scope of our app. Here you should code the tests for each main portion of your website just as a user would interact with it.

These interactions should include some random clicks, back and forth, perhaps even random keypresses. *Should* being the keyword here -- all of that takes a lot of time so sometimes testing base functionality. Remember: _Some_ unit tests are better than _no_ unit tests.

Integration tests are meant to ensure that new changes do not unexpectedly break functionality of previous pages or components.

Any new feature should be accompanied by integration tests, as well as unit tests.

To run the integration tests against your local changes, run 

```sh
pnpm e2e:local
```

### Modifying which tests are run (useful during development)

open `package.json` and edit the entry for `"e2e:local"` to include `-f \"Fixture name\"` or `-t \"Test name\"` to only have it run that one test. 
