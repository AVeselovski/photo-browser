# PhotoBrowser

**UPDATE: This was a small "take home"-assignment by a software company as part of a recruitment process. The demo project 100% fulfilled provided specifications and this readme sought to answers the questions that accompanied the assignment.**

Live demo: [photo-browser](https://photo-browser-app.vercel.app)

## Running locally

```bash
git clone git@github.com:AVeselovski/photo-browser.git
cd photo-browser
yarn
yarn start
```

Go to [localhost:3000](http://localhost:3000/)

## Testing

```bash
yarn test
# to continuously test while developing
yarn test -- --watch-all
```

## Tech choices & thought process

This is a React application (with `react-router-dom`). Considering the specs (simple SPA), this was the obvious choice, being my favorite JS library to work with.

Given the small size and nature of the application, I did not add `redux` - state management, nor for example `axios` for API calls. Were the app to scale, I would at least add `redux` and a side effect middleware (such as `redux-thunk` for example).

The easiest and fastest way to get started would've been using Create-React-App tool, but considering the goal of this task, I though a quick manual setup would be appropriate here to demonstrate not being a complete stranger to webpack and general setup struggles here and there. The setup (both webpack and testing) is basic and no doubt lacks optimization and other good up-to-date practices, but it gets the job done.

I was tempted to use `styled-components`, which I do enjoy, but decided to go with the old and proven SCSS setup to keep it simple. I decided not to use a CSS library due to how small the application is, and instead styled it from ground up, because it was fun.

Did not do a test-driven development, tests were added after the "MVP" was ready. While the tests helped with ironing out some kinks here and there, they are quite basic and few. Testing is not my strong suit and here they were added more as an afterthought.

## Project structure

```bash
# Folder and file structure illustration

components/
    __test__/
    common/
        __test__/
        GeneralComponent.js
        ...
        form/ # Possible future input components
            __test__/
            ...
    some-route/ # route/page specific components
        __test__/
        ...
    App.js
context/
    SomeContext.js
    ...
routes/ # Routes play the role of "container" components
    some-route/
        index.js
        some.js
    another-route/
        index.js
        another.js
store/ # Future redux store setup (as with actions/ and reducers/)
styles/ # Application styles (SCSS)
utils/
    api.js
    ...
index.html
index.js
```

`routes` folder contains "container" components and is structured according to those route paths (kind of like NextJS does it). `components` folder has a `common` folder for general and reusable components. `components` also contains "_route-name_" folders for route specific components where/if necessary. I haven't really worked with "Real" React projects without a `redux` setup, so I was not sure about the appropriate scalable structure for context providers and such. I would've preferred redux for more serious stuff in any case, easier to test too.

## Scaling

With application scaling I would probably keep routes as "container" components (now "connected"), and only "drill" props 1 (max 2) children down, depending on use-case. Hooks now provide a convenient way to access data where it's needed, so I would avoid unnecessary prop drilling. I'd also probably keep "regional data" (that doesn't need to be global) with React context (e.g. `UiProvider` for mobile navigation). Data fetching would move to side-effect middleware, e.g functions such as `_getPhotos` would call action creators and the fetching would be in "thunks" in case of `redux-thunk` (although I wouldn't decide on any particular libraries at this point).

Eslint setup would be a good addition. I would also consider TypeScript, which I did earlier, but then just went without it.

## Design

I like minimalistic UI of Vercel, so the UI design takes heavy inspiration from vercel products (vercel.com / nextjs.org) and iOS to some degree.

Minimum viewport width for working layout is `320px`. App developed using Chrome, and in addition to Chrome was tested and deemed 100% functional on Safari (desktop), Firefox, Microsoft Edge, Chrome mobile and "Samsung Internet". Other browsers were not tested.
