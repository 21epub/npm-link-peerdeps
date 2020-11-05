# @21epub/npm-link-peerdeps

> A npm-link helper for npm package develop with Main Project

[![NPM](https://img.shields.io/npm/v/@21epub/npm-link-peerdeps.svg)](https://www.npmjs.com/package/@21epub/npm-link-peerdeps) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com) ![Build Status](https://img.shields.io/travis/com/21epub/npm-link-peerdeps) ![Codecov](https://img.shields.io/codecov/c/github/21epub/npm-link-peerdeps)

## Intro

Start your npm library created by [create-parcel-react-library](https://www.npmjs.com/package/@21epub/create-parcel-react-library)

Link your npm package to Main Project to test in Project ENV.

Auto-run npm-link for both Library and Project.

Link peers to the Main Project

## Feature

- [x] Easy-to-use

## Usage

#### Use npx directly

To start npm-link your library :

```bash
npx @21epub/npm-link-peerdeps start # start npm-link for project dev

```

To stop npm-link and return back to your library local dev :

```bash
npx @21epub/npm-link-peerdeps stop # stop npm-link for project dev
```

#### Or install and run as global

```bash
npm install -g @21epub/npm-link-peerdeps
npm-link-peerdeps start
...
npm-link-peerdeps stop
```

## License

MIT © [21epub](https://github.com/21epub)
