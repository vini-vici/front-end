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

## Running Locally

Make sure that you have the AWS CDK CLI installed.
### Getting Required Items

You will need to download and run two separate packages in this order.

1. First, run through the steps to deploy the [shared-infra](https://github.com/vini-vici/shared-infra) package. This is fairly easy to do, so it shouldn't take long.
2. Second, run through the steps to deploy the [back-end](https://github.com/vini-vici/back-end). This package uses some information from the shared infrastructure package, so it cannot be build/deployed before it.

Once these have been done, you can get this package up and going.

First ensure that you have an AWS Account. From there run the following (assuming your AWS Account id is `123456789012`) 

```sh
# $Env:ACCOUNT_ID=123456789012 # for windows
export ACCOUNT_ID=123456789012
cd configuration
cdk bootstrap aws://123456789012/us-west-1
cdk list # Search for a stack named "Vicci-123456789012-alpha-us-west-1". 
cdk deploy Vicci-140851651058-alpha-us-west-1
```

### Running Locally

You should be able to run the entire thing with just 

```sh
npm run dev
```

## Running Unit Tests

Tests are run with Jest, and are setup in the [jest.config.js](./jest.config.js) file, with a setup file in [setup.ts](./src/test/setup.ts)

These tests use a library called `@testing-library/react`, which has a smilar interface for multiple libraries/frameworks such as Vue, React, and Svelte. You can find more documentation about how to use Testing Library [here](https://testing-library.com/docs/react-testing-library/intro/).

Unit tests are meant to test the components themselves; each individual component file should have corresponding unit tests that validate the essential behaviors of the component, and if possible test edge cases we would expect to behave in certain ways.

To run the unit tests use

```sh
npm run test # or "npm run test" - no quotes
```

## Running Integration Tests

Our integration tests are run with [TestCafe](https://testcafe.io/), which tests how the components function in the scope of our app. Here you should code the tests for each main portion of your website just as a user would interact with it.

These interactions should include some random clicks, back and forth, perhaps even random keypresses. *Should* being the keyword here -- all of that takes a lot of time so sometimes testing base functionality. Remember: _Some_ unit tests are better than _no_ unit tests.

Integration tests are meant to ensure that new changes do not unexpectedly break functionality of previous pages or components.

Any new feature should be accompanied by integration tests, as well as unit tests.

To run the integration tests against your local changes, run 

```sh
npm run e2e:local
```

### Modifying which tests are run (useful during development)

open `package.json` and edit the entry for `"e2e:local"` to include `-f \"Fixture name\"` or `-t \"Test name\"` to only have it run that one test. 
