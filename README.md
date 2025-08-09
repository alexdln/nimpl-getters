# @nimpl/getters

(Former [next-impl-getters](https://www.npmjs.com/package/next-impl-getters))

Implementation of server getters in React Server Components without switching to SSR in Next.js

Before using the library, read the [Possible Issues](https://nimpl.dev/docs/server-getters#possible-issues)

Visit https://nimpl.dev/docs/server-getters to view the full documentation.

Use `@nimpl/getters 2.x` for Next.js v15. For earlier versions of Next.js use `@nimpl/getters 1.x`.

## Installation

**Using npm:**

```bash
npm i @nimpl/getters
```

**Using yarn:**

```bash
yarn add @nimpl/getters
```

## Current Getters

- [get-pathname](https://nimpl.dev/docs/server-getters#get-pathname)
- [get-app-pathname](https://nimpl.dev/docs/server-getters#get-app-pathname)
- [get-params](https://nimpl.dev/docs/server-getters#get-params)
- [get-app-params](https://nimpl.dev/docs/server-getters#get-app-params)
- [get-page-config](https://nimpl.dev/docs/server-getters#get-page-config)
- [get-search-params](https://nimpl.dev/docs/server-getters#get-search-params) (_deprecated_)

> _`create-server-context` and `get-server-context` were moved to a separate package - [@nimpl/context](https://nimpl.dev/docs/context)_

## Stability

All getters are covered with tests. Tests are run on every release and every 6 hours on the latest **Canary** version of `Next.js`.

In this way, you can be sure not only of the stability of the code, but also that if there is a breaking change in `Next.js`, this will immediately become known. _Even before the release of a stable version of `Next.js`._

## Additional

Please consider giving a star if you like it, it will help promote the implementation in the eyes of the Next.js team. This also motivates the author to continue working on this and other solutions ❤️

Create issues for identified problems, desired getters, or various improvements.
