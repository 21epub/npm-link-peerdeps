# @21epub/link-peerdeps

> A npm-link helper for npm package develop with Main Project 

[![NPM](https://img.shields.io/npm/v/@21epub/link-peerdeps.svg)](https://www.npmjs.com/package/@21epub/link-peerdeps) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com) ![Build Status](https://img.shields.io/travis/com/21epub/link-peerdeps) ![Codecov](https://img.shields.io/codecov/c/github/21epub/link-peerdeps)

## Intro

This is a component for react. 

## Feature

- [x] Easy-to-use
- [x] Typescript Support

## Install

```bash
npm install --save @21epub/link-peerdeps
```

## Usage

```tsx
import React, { Component } from 'react'

import MyComponent from '@21epub/link-peerdeps'
import '@21epub/link-peerdeps/dist/index.css'

class Example extends Component {
  render() {
    return <MyComponent />
  }
}
```

For Details: See Example


## Developing and running on localhost

First install dependencies and then install peerDeps for parcel dev:

```sh
npm install
npm run install-peers
```

To run Example in hot module reloading mode:

```sh
npm start
```

To create a parcel production build:

```sh
npm run build-prod
```

To create a bundle library module build:

```sh
npm run build
```

## Running

Open the file `dist/index.html` in your browser

## Testing

To run unit tests:

```sh
npm test
```

## License

MIT © [21epub](https://github.com/21epub)
