# PhotoBrowser

Live demo: example.com

## Running locally

```bash
git clone git@github.com:AVeselovski/photo-browser.git
cd photo-browser
yarn
yarn start
```

Go to [localhost:3000](http://localhost:3000/)

## Tech choices & thought process

This is a React application (with `react-router-dom`). Considering the specs (simple SPA), this was the obvious choice, being my favorite JS library to work with.

Given the small size and nature of the application, I did not add `redux` - state management, nor for example `axios` for API calls. Were the app to scale, I would at least add `redux` and a side effect middleware, such as `redux-thunk`.

The easiest and fastest way to get started would've been using Create-React-App tool, but considering the nature of this task, I though a quick manual setup would be appropriate to demonstrate not being a complete stranger to webpack. The setup is basic and no doubt lacks optimization and other good up-to-date practices.

I was tempted to use `styled-components`, which I do enjoy, but decided to go with the old and proven SCSS setup to keep it simple. I decided not to use a CSS library, again due to how small the application is and instead styled it from ground up.

## Project structure

```
// Folder and file structure illustration

components/
    common/
        GeneralComponent.js
        ...
        form/
            // possible future input components
            ...
    some-route/
        // route/page specific components
        ...
    App.js
context/
    SomeContext.js
    ...
routes
    // Routes play the role of "container" components
    some-route
        index.js
        some.js
    another-route
        index.js
        another.js
store
    // Future redux store setup
styles
    // application styles (SCSS)
utils
    api.js
    ...
index.html
index.js
```

`routes` folder contains "container" components and is structured according to those route paths (kind of like NextJS does it). `components` folder has a `common` folder for general and reusable components. `components` also contains "_route-name_" folders for route specific components where/if necessary. I haven't really worked with React projects without a redux setup, so I was not sure about the appropriate scalable structure for context providers.

With application scaling I would probably keep routes as "container" components (now "connected"), and only "drill" props 1 (max 2) children down, depending on use-case. Hooks now provide a convenient way to access the store where it's needed, without wrapping a bunch of components in HOCs. I would keep local data (that doesn't need to be global) local with React context (e.g. `UiProvider` for mobile navigation).

## Design

I really like minimalistic UI of Vercel, so the UI design takes inspiration from iOS and vercel products (vercel.com / nextjs.org).

Minimum viewport width for working layout is `320px`. App developed using Chrome, and was tested and deemed 100% functional on Safari (desktop) and Firefox. Other browsers were not tested.

## Notes (minor issues)

At some point I encountered this CORS issue: https://github.com/typicode/jsonplaceholder/issues/135. This seems to happen once in a while with `jsonplaceholder.typicode` based on open and closed issues. When that happens, the "try it" example on their website fails as well with the same issue.

I added mock data and `mockData()` function to continue development, in case this issue persists / repeats.
